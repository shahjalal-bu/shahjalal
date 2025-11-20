# ImageKit Configuration

## Environment Variables

Add these to your `.env.local` file:

```env
IMAGEKIT_PRIVATE_KEY=private_7LXKleYEHaanvW6BhRQ8JIQQec0=
IMAGEKIT_PUBLIC_KEY=public_JsJ9ojii+YGhCA+eBSHNaye0Aec=
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/logicstation
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_JsJ9ojii+YGhCA+eBSHNaye0Aec=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/logicstation
```

## Features

### 1. Rich Markdown Editor
- **Toolbar with formatting options**: Bold, Italic, Code, Quotes, Lists, Links
- **Multi-image upload**: Upload multiple images at once to ImageKit
- **Code blocks**: Easy insertion of syntax-highlighted code blocks
- **Real-time editing**: See changes as you type

### 2. Live Preview
- **Toggle preview**: Show/hide live preview of your blog post
- **Markdown rendering**: Full support for markdown syntax
- **Syntax highlighting**: Code blocks with syntax highlighting
- **Responsive design**: Preview adapts to different screen sizes

### 3. Image Management
- **Cover image upload**: Upload and preview cover images
- **Multiple images in content**: Upload multiple images anywhere in your content
- **Automatic ImageKit integration**: Images stored on CDN for optimal performance
- **Progress indicators**: See upload progress for each image

## Usage

### Creating a New Blog Post

1. Navigate to `/admin/posts/new`
2. Fill in the blog details (title, excerpt, etc.)
3. Use the markdown editor toolbar to format your content
4. Click "Upload Images" to add images to your content
5. Toggle "Show Preview" to see how your blog will look
6. Click "Create Post" when done

### Uploading Images

**Cover Image:**
- Enter URL manually or click "Upload" button next to the cover image field
- Preview appears below the input

**Content Images:**
- Click "Upload Images" in the markdown editor toolbar
- Select one or multiple images
- Images are automatically inserted as markdown at cursor position
- Each image shows upload progress

### Markdown Shortcuts

- **Bold**: `**text**`
- **Italic**: `*text*`
- **Code**: `` `code` ``
- **Link**: `[text](url)`
- **Image**: `![alt](url)` (automatically added when uploading)
- **Code Block**: 
  ```
  ```language
  code here
  ```
  ```

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   └── posts/
│   │       └── new/
│   │           ├── page.tsx           # Main page
│   │           └── form.tsx           # Enhanced form with preview
│   └── api/
│       └── imagekit-auth/
│           └── route.ts               # ImageKit auth endpoint
├── components/
│   ├── blog/
│   │   └── blog-preview.tsx          # Live preview component
│   └── editor/
│       └── markdown-editor.tsx        # Rich markdown editor
└── lib/
    └── imagekit.ts                    # ImageKit configuration
```

## API Endpoints

### POST /api/imagekit-auth
Returns authentication parameters for ImageKit uploads.

**Response:**
```json
{
  "signature": "...",
  "expire": 1234567890,
  "token": "..."
}
```

## Security Notes

- Private key is only used server-side in the auth endpoint
- Public key is exposed to the client (safe)
- Each upload request requires fresh authentication tokens
- Images are uploaded to `/blog-images` folder in ImageKit

## Troubleshooting

### Images not uploading
1. Check that environment variables are set correctly
2. Verify ImageKit credentials are valid
3. Check browser console for error messages

### Preview not showing images
1. Ensure image URLs are correctly formatted as markdown
2. Check that ImageKit URL endpoint is correct
3. Verify images are publicly accessible

### Styling issues
1. Ensure all UI components are properly imported
2. Check that Tailwind CSS classes are compiling
3. Verify theme provider is wrapping the application
