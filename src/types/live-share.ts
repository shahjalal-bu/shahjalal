export interface Room {
    id: string;
    name: string;
    createdAt: Date;
    createdBy: string;
    participants: Participant[];
    activeCode: string;
    language: string;
    isLocked: boolean;
}

export interface Participant {
    id: string;
    name: string;
    color: string;
    joinedAt: Date;
    isActive: boolean;
    cursorPosition?: number;
}

export interface CodeUpdate {
    roomId: string;
    code: string;
    language: string;
    updatedBy: string;
    timestamp: Date;
    cursorPosition?: number;
}

export interface RoomMessage {
    type: 'join' | 'leave' | 'code-update' | 'cursor-move' | 'language-change';
    roomId: string;
    userId: string;
    data?: any;
    timestamp: Date;
}

export interface LiveShareState {
    currentRoom: Room | null;
    isConnected: boolean;
    participants: Participant[];
    code: string;
    language: string;
    userId: string;
    userName: string;
}
