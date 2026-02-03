"use client"

import { useCodeShare } from '@/context/code-share-context';
import { useState, useCallback } from 'react';

/**
 * Custom hook for managing code snippets with additional utilities
 */
export function useCodeSnippets() {
    const {
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
    } = useCodeShare();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Create a new code snippet
     */
    const createSnippet = useCallback(
        async (
            title: string,
            code: string,
            language: string,
            description?: string,
            tags?: string[]
        ) => {
            try {
                setIsLoading(true);
                setError(null);
                addSnippet({ title, code, language, description, tags });
            } catch (err) {
                setError('Failed to create snippet');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        },
        [addSnippet]
    );

    /**
     * Duplicate an existing snippet
     */
    const duplicateSnippet = useCallback(
        (id: string) => {
            const snippet = getSnippetById(id);
            if (snippet) {
                addSnippet({
                    title: `${snippet.title} (Copy)`,
                    code: snippet.code,
                    language: snippet.language,
                    description: snippet.description,
                    tags: snippet.tags,
                });
            }
        },
        [addSnippet, getSnippetById]
    );

    /**
     * Search snippets by title, description, or tags
     */
    const searchSnippets = useCallback(
        (query: string) => {
            const lowerQuery = query.toLowerCase();
            return state.snippets.filter(
                (snippet) =>
                    snippet.title.toLowerCase().includes(lowerQuery) ||
                    snippet.description?.toLowerCase().includes(lowerQuery) ||
                    snippet.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
                    snippet.code.toLowerCase().includes(lowerQuery)
            );
        },
        [state.snippets]
    );

    /**
     * Filter snippets by language
     */
    const filterByLanguage = useCallback(
        (language: string) => {
            return state.snippets.filter(
                (snippet) => snippet.language.toLowerCase() === language.toLowerCase()
            );
        },
        [state.snippets]
    );

    /**
     * Filter snippets by tag
     */
    const filterByTag = useCallback(
        (tag: string) => {
            return state.snippets.filter((snippet) =>
                snippet.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
            );
        },
        [state.snippets]
    );

    /**
     * Get all unique languages
     */
    const getLanguages = useCallback(() => {
        const languages = new Set(state.snippets.map((s) => s.language));
        return Array.from(languages).sort();
    }, [state.snippets]);

    /**
     * Get all unique tags
     */
    const getTags = useCallback(() => {
        const tags = new Set(state.snippets.flatMap((s) => s.tags || []));
        return Array.from(tags).sort();
    }, [state.snippets]);

    /**
     * Copy snippet code to clipboard
     */
    const copyToClipboard = useCallback(async (id: string) => {
        const snippet = getSnippetById(id);
        if (snippet) {
            try {
                await navigator.clipboard.writeText(snippet.code);
                return true;
            } catch (err) {
                console.error('Failed to copy to clipboard:', err);
                return false;
            }
        }
        return false;
    }, [getSnippetById]);

    /**
     * Share snippet via Web Share API (if available)
     */
    const shareSnippet = useCallback(
        async (id: string) => {
            const snippet = getSnippetById(id);
            if (!snippet) return false;

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: snippet.title,
                        text: snippet.description || snippet.title,
                        url: window.location.href,
                    });
                    return true;
                } catch (err) {
                    console.error('Failed to share:', err);
                    return false;
                }
            }
            return false;
        },
        [getSnippetById]
    );

    return {
        // State
        snippets: state.snippets,
        activeSnippetId: state.activeSnippetId,
        activeSnippet: getActiveSnippet(),
        isLoading,
        error,

        // Basic operations
        createSnippet,
        updateSnippet,
        deleteSnippet,
        duplicateSnippet,
        setActiveSnippet,
        clearAll,

        // Import/Export
        exportSnippets,
        importSnippets,

        // Search and filter
        searchSnippets,
        filterByLanguage,
        filterByTag,
        getLanguages,
        getTags,

        // Utilities
        getSnippetById,
        copyToClipboard,
        shareSnippet,
    };
}
