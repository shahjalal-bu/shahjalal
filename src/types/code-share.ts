export interface CodeSnippet {
    id: string;
    title: string;
    code: string;
    language: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    tags?: string[];
}

export interface CodeShareState {
    snippets: CodeSnippet[];
    activeSnippetId: string | null;
}

export type CodeShareAction =
    | { type: 'ADD_SNIPPET'; payload: Omit<CodeSnippet, 'id' | 'createdAt' | 'updatedAt'> }
    | { type: 'UPDATE_SNIPPET'; payload: { id: string; updates: Partial<CodeSnippet> } }
    | { type: 'DELETE_SNIPPET'; payload: string }
    | { type: 'SET_ACTIVE_SNIPPET'; payload: string | null }
    | { type: 'LOAD_SNIPPETS'; payload: CodeSnippet[] }
    | { type: 'CLEAR_ALL' };
