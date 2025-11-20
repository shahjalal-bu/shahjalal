'use client';

import { useState, useCallback, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { uploadImage } from '@/lib/imagekit';
import { ImagePlus, Loader2, Link as LinkIcon, Bold, Italic, Code, List, ListOrdered, Quote } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  label = "Content (Markdown)", 
  placeholder = "Write your blog post content here...",
  className = ""
}: MarkdownEditorProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertText = useCallback((before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newText = value.substring(0, start) + before + textToInsert + after + value.substring(end);
    onChange(newText);

    // Set cursor position after insertion
    setTimeout(() => {
      const newPosition = start + before.length + textToInsert.length;
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  }, [value, onChange]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(`Uploading ${i + 1} of ${files.length}...`);
        
        const result = await uploadImage(file);
        uploadedImages.push(`![${file.name}](${result.url})`);
      }

      // Insert all uploaded images
      const imageMarkdown = uploadedImages.join('\n\n');
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const newText = value.substring(0, start) + '\n\n' + imageMarkdown + '\n\n' + value.substring(start);
      onChange(newText);

      setUploadProgress('Upload complete!');
      setTimeout(() => setUploadProgress(''), 2000);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertText('**', '**', 'bold text'), title: 'Bold' },
    { icon: Italic, action: () => insertText('*', '*', 'italic text'), title: 'Italic' },
    { icon: Code, action: () => insertText('`', '`', 'code'), title: 'Inline Code' },
    { icon: Quote, action: () => insertText('\n> ', '', 'quote'), title: 'Quote' },
    { icon: List, action: () => insertText('\n- ', '', 'list item'), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertText('\n1. ', '', 'list item'), title: 'Numbered List' },
    { 
      icon: LinkIcon, 
      action: () => insertText('[', '](url)', 'link text'), 
      title: 'Link' 
    },
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label htmlFor="markdown-editor" className="text-foreground">{label}</Label>}
      
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-muted/50 rounded-t-md border border-b-0 border-border">
        <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
          {toolbarButtons.map((btn, idx) => (
            <Button
              key={idx}
              type="button"
              variant="ghost"
              size="sm"
              onClick={btn.action}
              title={btn.title}
              className="h-8 w-8 p-0"
            >
              <btn.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          title="Upload Images"
          className="h-8 px-3"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              <span className="text-xs">{uploadProgress}</span>
            </>
          ) : (
            <>
              <ImagePlus className="h-4 w-4 mr-1" />
              <span className="text-xs">Upload Images</span>
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('\n```javascript\n', '\n```\n', 'code here')}
          title="Code Block"
          className="h-8 px-3 ml-auto"
        >
          <Code className="h-4 w-4 mr-1" />
          <span className="text-xs">Code Block</span>
        </Button>
      </div>

      {/* Editor */}
      <Textarea
        ref={textareaRef}
        id="markdown-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[400px] font-mono text-sm rounded-t-none"
      />

      {/* Helper text */}
      <p className="text-xs text-muted-foreground">
        Supports Markdown formatting. You can upload multiple images at once.
      </p>
    </div>
  );
}
