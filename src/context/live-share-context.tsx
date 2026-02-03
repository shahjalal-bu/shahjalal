"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Room, Participant, LiveShareState, RoomMessage } from '@/types/live-share';
import { liveShareService } from '@/lib/live-share-service';

interface LiveShareContextType {
  state: LiveShareState;
  createRoom: (roomName: string, userName: string) => Room;
  joinRoom: (roomId: string, userName: string) => boolean;
  leaveRoom: () => void;
  updateCode: (code: string) => void;
  updateLanguage: (language: string) => void;
  copyRoomLink: () => Promise<boolean>;
  getRoomLink: () => string;
}

const LiveShareContext = createContext<LiveShareContextType | null>(null);

export function LiveShareProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LiveShareState>({
    currentRoom: null,
    isConnected: false,
    participants: [],
    code: '',
    language: 'javascript',
    userId: '',
    userName: '',
  });

  // Initialize user ID
  useEffect(() => {
    const userId = liveShareService.generateUserId();
    setState(prev => ({ ...prev, userId }));
  }, []);

  // Subscribe to room updates
  useEffect(() => {
    if (!state.currentRoom) return;

    const unsubscribe = liveShareService.subscribe(
      state.currentRoom.id,
      (message: RoomMessage) => {
        handleRoomMessage(message);
      }
    );

    return unsubscribe;
  }, [state.currentRoom?.id]);

  const handleRoomMessage = useCallback((message: RoomMessage) => {
    setState(prev => {
      if (!prev.currentRoom) return prev;

      const newState = { ...prev };

      switch (message.type) {
        case 'join':
          if (message.data && !newState.participants.find(p => p.id === message.data.id)) {
            newState.participants = [...newState.participants, message.data];
          }
          break;

        case 'leave':
          newState.participants = newState.participants.filter(p => p.id !== message.userId);
          break;

        case 'code-update':
          if (message.userId !== newState.userId && message.data) {
            newState.code = message.data.code;
            newState.language = message.data.language;
          }
          break;
      }

      return newState;
    });
  }, []);

  const createRoom = useCallback((roomName: string, userName: string): Room => {
    const room = liveShareService.createRoom(roomName, state.userId);
    const joinedRoom = liveShareService.joinRoom(room.id, state.userId, userName);

    if (joinedRoom) {
      setState(prev => ({
        ...prev,
        currentRoom: joinedRoom,
        isConnected: true,
        participants: joinedRoom.participants,
        code: joinedRoom.activeCode,
        language: joinedRoom.language,
        userName,
      }));
    }

    return room;
  }, [state.userId]);

  const joinRoom = useCallback((roomId: string, userName: string): boolean => {
    const room = liveShareService.joinRoom(roomId, state.userId, userName);

    if (room) {
      setState(prev => ({
        ...prev,
        currentRoom: room,
        isConnected: true,
        participants: room.participants,
        code: room.activeCode,
        language: room.language,
        userName,
      }));
      return true;
    }

    return false;
  }, [state.userId]);

  const leaveRoom = useCallback(() => {
    if (state.currentRoom) {
      liveShareService.leaveRoom(state.currentRoom.id, state.userId);
      setState(prev => ({
        ...prev,
        currentRoom: null,
        isConnected: false,
        participants: [],
        code: '',
        language: 'javascript',
      }));
    }
  }, [state.currentRoom, state.userId]);

  const updateCode = useCallback((code: string) => {
    if (!state.currentRoom) return;

    setState(prev => ({ ...prev, code }));

    liveShareService.updateCode({
      roomId: state.currentRoom.id,
      code,
      language: state.language,
      updatedBy: state.userId,
      timestamp: new Date(),
    });
  }, [state.currentRoom, state.language, state.userId]);

  const updateLanguage = useCallback((language: string) => {
    if (!state.currentRoom) return;

    setState(prev => ({ ...prev, language }));

    liveShareService.updateCode({
      roomId: state.currentRoom.id,
      code: state.code,
      language,
      updatedBy: state.userId,
      timestamp: new Date(),
    });
  }, [state.currentRoom, state.code, state.userId]);

  const copyRoomLink = useCallback(async (): Promise<boolean> => {
    if (!state.currentRoom) return false;
    return await liveShareService.copyShareableLink(state.currentRoom.id);
  }, [state.currentRoom]);

  const getRoomLink = useCallback((): string => {
    if (!state.currentRoom) return '';
    return liveShareService.getShareableLink(state.currentRoom.id);
  }, [state.currentRoom]);

  const value: LiveShareContextType = {
    state,
    createRoom,
    joinRoom,
    leaveRoom,
    updateCode,
    updateLanguage,
    copyRoomLink,
    getRoomLink,
  };

  return (
    <LiveShareContext.Provider value={value}>
      {children}
    </LiveShareContext.Provider>
  );
}

export function useLiveShare() {
  const context = useContext(LiveShareContext);
  if (!context) {
    throw new Error('useLiveShare must be used within LiveShareProvider');
  }
  return context;
}
