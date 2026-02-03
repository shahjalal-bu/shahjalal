"use client"

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { CodeSnippet, CodeShareState, CodeShareAction } from '@/types/code-share';
import { CodeShareStorageService } from '@/lib/code-share-storage';

// Initial state
const initialState: CodeShareState = {
  snippets: [],
  activeSnippetId: null,
};

// Reducer function
function codeShareReducer(state: CodeShareState, action: CodeShareAction): CodeShareState {
  switch (action.type) {
    case 'ADD_SNIPPET': {
      const newSnippet: CodeSnippet = {
        ...action.payload,
        id: `snippet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        snippets: [...state.snippets, newSnippet],
        activeSnippetId: newSnippet.id,
      };
    }
    
    case 'UPDATE_SNIPPET': {
      return {
        ...state,
        snippets: state.snippets.map(snippet =>
          snippet.id === action.payload.id
            ? { ...snippet, ...action.payload.updates, updatedAt: new Date() }
            : snippet
        ),
      };
    }
    
    case 'DELETE_SNIPPET': {
      const newSnippets = state.snippets.filter(snippet => snippet.id !== action.payload);
      return {
        ...state,
        snippets: newSnippets,
        activeSnippetId: state.activeSnippetId === action.payload 
          ? (newSnippets[0]?.id || null) 
          : state.activeSnippetId,
      };
    }
    
    case 'SET_ACTIVE_SNIPPET': {
      return {
        ...state,
        activeSnippetId: action.payload,
      };
    }
    
    case 'LOAD_SNIPPETS': {
      return {
        ...state,
        snippets: action.payload,
      };
    }
    
    case 'CLEAR_ALL': {
      return initialState;
    }
    
    default:
      return state;
  }
}

// Context type
interface CodeShareContextType {
  state: CodeShareState;
  addSnippet: (snippet: Omit<CodeSnippet, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSnippet: (id: string, updates: Partial<CodeSnippet>) => void;
  deleteSnippet: (id: string) => void;
  setActiveSnippet: (id: string | null) => void;
  clearAll: () => void;
  exportSnippets: () => void;
  importSnippets: (file: File) => Promise<void>;
  getSnippetById: (id: string) => CodeSnippet | undefined;
  getActiveSnippet: () => CodeSnippet | undefined;
}

// Create context
const CodeShareContext = createContext<CodeShareContextType | null>(null);

// Provider component
export function CodeShareProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(codeShareReducer, initialState);

  // Load snippets from localStorage on mount
  useEffect(() => {
    const loadedSnippets = CodeShareStorageService.loadSnippets();
    if (loadedSnippets.length > 0) {
      dispatch({ type: 'LOAD_SNIPPETS', payload: loadedSnippets });
    }
  }, []);

  // Save snippets to localStorage whenever they change
  useEffect(() => {
    if (state.snippets.length > 0) {
      CodeShareStorageService.saveSnippets(state.snippets);
    }
  }, [state.snippets]);

  // Context methods
  const addSnippet = useCallback((snippet: Omit<CodeSnippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'ADD_SNIPPET', payload: snippet });
  }, []);

  const updateSnippet = useCallback((id: string, updates: Partial<CodeSnippet>) => {
    dispatch({ type: 'UPDATE_SNIPPET', payload: { id, updates } });
  }, []);

  const deleteSnippet = useCallback((id: string) => {
    dispatch({ type: 'DELETE_SNIPPET', payload: id });
  }, []);

  const setActiveSnippet = useCallback((id: string | null) => {
    dispatch({ type: 'SET_ACTIVE_SNIPPET', payload: id });
  }, []);

  const clearAll = useCallback(() => {
    CodeShareStorageService.clearSnippets();
    dispatch({ type: 'CLEAR_ALL' });
  }, []);

  const exportSnippets = useCallback(() => {
    CodeShareStorageService.exportSnippets(state.snippets);
  }, [state.snippets]);

  const importSnippets = useCallback(async (file: File) => {
    try {
      const snippets = await CodeShareStorageService.importSnippets(file);
      dispatch({ type: 'LOAD_SNIPPETS', payload: snippets });
    } catch (error) {
      console.error('Failed to import snippets:', error);
      throw error;
    }
  }, []);

  const getSnippetById = useCallback((id: string) => {
    return state.snippets.find(snippet => snippet.id === id);
  }, [state.snippets]);

  const getActiveSnippet = useCallback(() => {
    if (!state.activeSnippetId) return undefined;
    return state.snippets.find(snippet => snippet.id === state.activeSnippetId);
  }, [state.snippets, state.activeSnippetId]);

  const value: CodeShareContextType = {
    state,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    setActiveSnippet,
    clearAll,
    exportSnippets,
    importSnippets,
    getSnippetById,
    getActiveSnippet,
  };

  return (
    <CodeShareContext.Provider value={value}>
      {children}
    </CodeShareContext.Provider>
  );
}

// Custom hook to use the context
export function useCodeShare() {
  const context = useContext(CodeShareContext);
  if (!context) {
    throw new Error('useCodeShare must be used within a CodeShareProvider');
  }
  return context;
}
