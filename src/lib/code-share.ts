/**
 * Live Code Share Service - Main Export File
 * 
 * This file provides convenient exports for all code share functionality.
 * Import from here for cleaner code organization.
 */

// Context and Provider
export { CodeShareProvider, useCodeShare } from './context/code-share-context';

// Custom Hook
export { useCodeSnippets } from './hooks/use-code-snippets';

// UI Components
export {
    CodeSnippetViewer,
    CodeSnippetFloatingButton,
    CodeSnippetBadge,
} from './components/code-snippet-widgets';

export { CodeShareDemo } from './components/code-share-demo';

// Types
export type { CodeSnippet, CodeShareState, CodeShareAction } from './types/code-share';

// Storage Service
export { CodeShareStorageService } from './lib/code-share-storage';
