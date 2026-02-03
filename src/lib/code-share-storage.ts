import { CodeSnippet } from '@/types/code-share';

const STORAGE_KEY = 'live-code-share-snippets';

export class CodeShareStorageService {
    /**
     * Save snippets to localStorage
     */
    static saveSnippets(snippets: CodeSnippet[]): void {
        if (typeof window === 'undefined') return;

        try {
            const serialized = JSON.stringify(snippets);
            localStorage.setItem(STORAGE_KEY, serialized);
        } catch (error) {
            console.error('Failed to save code snippets:', error);
        }
    }

    /**
     * Load snippets from localStorage
     */
    static loadSnippets(): CodeSnippet[] {
        if (typeof window === 'undefined') return [];

        try {
            const serialized = localStorage.getItem(STORAGE_KEY);
            if (!serialized) return [];

            const snippets = JSON.parse(serialized);
            // Convert date strings back to Date objects
            return snippets.map((snippet: any) => ({
                ...snippet,
                createdAt: new Date(snippet.createdAt),
                updatedAt: new Date(snippet.updatedAt),
            }));
        } catch (error) {
            console.error('Failed to load code snippets:', error);
            return [];
        }
    }

    /**
     * Clear all snippets from localStorage
     */
    static clearSnippets(): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Failed to clear code snippets:', error);
        }
    }

    /**
     * Export snippets as JSON file
     */
    static exportSnippets(snippets: CodeSnippet[]): void {
        const dataStr = JSON.stringify(snippets, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `code-snippets-${new Date().toISOString()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Import snippets from JSON file
     */
    static async importSnippets(file: File): Promise<CodeSnippet[]> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const content = e.target?.result as string;
                    const snippets = JSON.parse(content);

                    // Validate and convert dates
                    const validatedSnippets = snippets.map((snippet: any) => ({
                        ...snippet,
                        createdAt: new Date(snippet.createdAt),
                        updatedAt: new Date(snippet.updatedAt),
                    }));

                    resolve(validatedSnippets);
                } catch (error) {
                    reject(new Error('Invalid JSON file'));
                }
            };

            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }
}
