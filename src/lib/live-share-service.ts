import { Room, Participant, CodeUpdate, RoomMessage } from '@/types/live-share';

/**
 * Simple in-memory storage for rooms (simulates real-time without WebSocket server)
 * In production, replace with actual WebSocket/Socket.io server
 */
class LiveShareService {
    private rooms: Map<string, Room> = new Map();
    private listeners: Map<string, Set<(message: RoomMessage) => void>> = new Map();
    private broadcastChannel: BroadcastChannel | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            // Use BroadcastChannel for cross-tab communication
            this.broadcastChannel = new BroadcastChannel('live-code-share');
            this.broadcastChannel.onmessage = (event) => {
                this.handleBroadcastMessage(event.data);
            };
        }
    }

    /**
     * Generate a unique room ID
     */
    generateRoomId(): string {
        return `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Generate a unique user ID
     */
    generateUserId(): string {
        return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get random color for participant
     */
    getRandomColor(): string {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
            '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    /**
     * Create a new room
     */
    createRoom(name: string, createdBy: string): Room {
        const roomId = this.generateRoomId();
        const room: Room = {
            id: roomId,
            name,
            createdAt: new Date(),
            createdBy,
            participants: [],
            activeCode: '',
            language: 'javascript',
            isLocked: false,
        };

        this.rooms.set(roomId, room);
        this.saveToStorage();
        return room;
    }

    /**
     * Join an existing room
     */
    joinRoom(roomId: string, userId: string, userName: string): Room | null {
        const room = this.rooms.get(roomId) || this.loadRoomFromStorage(roomId);

        if (!room) return null;
        if (room.isLocked) return null;

        const participant: Participant = {
            id: userId,
            name: userName,
            color: this.getRandomColor(),
            joinedAt: new Date(),
            isActive: true,
        };

        // Remove if already exists
        room.participants = room.participants.filter(p => p.id !== userId);
        room.participants.push(participant);

        this.rooms.set(roomId, room);
        this.saveToStorage();

        // Broadcast join event
        this.broadcast({
            type: 'join',
            roomId,
            userId,
            data: participant,
            timestamp: new Date(),
        });

        return room;
    }

    /**
     * Leave a room
     */
    leaveRoom(roomId: string, userId: string): void {
        const room = this.rooms.get(roomId);
        if (!room) return;

        room.participants = room.participants.filter(p => p.id !== userId);
        this.rooms.set(roomId, room);
        this.saveToStorage();

        // Broadcast leave event
        this.broadcast({
            type: 'leave',
            roomId,
            userId,
            timestamp: new Date(),
        });
    }

    /**
     * Update code in room
     */
    updateCode(update: CodeUpdate): void {
        const room = this.rooms.get(update.roomId);
        if (!room) return;

        room.activeCode = update.code;
        room.language = update.language;
        this.rooms.set(update.roomId, room);
        this.saveToStorage();

        // Broadcast code update
        this.broadcast({
            type: 'code-update',
            roomId: update.roomId,
            userId: update.updatedBy,
            data: update,
            timestamp: new Date(),
        });
    }

    /**
     * Get room by ID
     */
    getRoom(roomId: string): Room | null {
        return this.rooms.get(roomId) || this.loadRoomFromStorage(roomId);
    }

    /**
     * Subscribe to room updates
     */
    subscribe(roomId: string, callback: (message: RoomMessage) => void): () => void {
        if (!this.listeners.has(roomId)) {
            this.listeners.set(roomId, new Set());
        }
        this.listeners.get(roomId)!.add(callback);

        // Return unsubscribe function
        return () => {
            const listeners = this.listeners.get(roomId);
            if (listeners) {
                listeners.delete(callback);
            }
        };
    }

    /**
     * Broadcast message to all listeners
     */
    private broadcast(message: RoomMessage): void {
        // Notify local listeners
        const listeners = this.listeners.get(message.roomId);
        if (listeners) {
            listeners.forEach(callback => callback(message));
        }

        // Broadcast to other tabs
        if (this.broadcastChannel) {
            this.broadcastChannel.postMessage(message);
        }
    }

    /**
     * Handle broadcast messages from other tabs
     */
    private handleBroadcastMessage(message: RoomMessage): void {
        const listeners = this.listeners.get(message.roomId);
        if (listeners) {
            listeners.forEach(callback => callback(message));
        }

        // Update local room state
        const room = this.rooms.get(message.roomId);
        if (room) {
            if (message.type === 'code-update' && message.data) {
                room.activeCode = message.data.code;
                room.language = message.data.language;
            } else if (message.type === 'join' && message.data) {
                const existingIndex = room.participants.findIndex(p => p.id === message.data.id);
                if (existingIndex >= 0) {
                    room.participants[existingIndex] = message.data;
                } else {
                    room.participants.push(message.data);
                }
            } else if (message.type === 'leave') {
                room.participants = room.participants.filter(p => p.id !== message.userId);
            }
            this.rooms.set(message.roomId, room);
        }
    }

    /**
     * Save rooms to localStorage
     */
    private saveToStorage(): void {
        if (typeof window === 'undefined') return;

        try {
            const roomsData = Array.from(this.rooms.entries()).map(([id, room]) => ({
                id,
                ...room,
                createdAt: room.createdAt.toISOString(),
                participants: room.participants.map(p => ({
                    ...p,
                    joinedAt: p.joinedAt.toISOString(),
                })),
            }));
            localStorage.setItem('live-share-rooms', JSON.stringify(roomsData));
        } catch (error) {
            console.error('Failed to save rooms:', error);
        }
    }

    /**
     * Load room from localStorage
     */
    private loadRoomFromStorage(roomId: string): Room | null {
        if (typeof window === 'undefined') return null;

        try {
            const data = localStorage.getItem('live-share-rooms');
            if (!data) return null;

            const rooms = JSON.parse(data);
            const roomData = rooms.find((r: any) => r.id === roomId);

            if (!roomData) return null;

            const room: Room = {
                ...roomData,
                createdAt: new Date(roomData.createdAt),
                participants: roomData.participants.map((p: any) => ({
                    ...p,
                    joinedAt: new Date(p.joinedAt),
                })),
            };

            this.rooms.set(roomId, room);
            return room;
        } catch (error) {
            console.error('Failed to load room:', error);
            return null;
        }
    }

    /**
     * Generate shareable link
     */
    getShareableLink(roomId: string): string {
        if (typeof window === 'undefined') return '';
        return `${window.location.origin}/live-share?room=${roomId}`;
    }

    /**
     * Copy link to clipboard
     */
    async copyShareableLink(roomId: string): Promise<boolean> {
        try {
            const link = this.getShareableLink(roomId);
            await navigator.clipboard.writeText(link);
            return true;
        } catch (error) {
            console.error('Failed to copy link:', error);
            return false;
        }
    }
}

// Export singleton instance
export const liveShareService = new LiveShareService();
