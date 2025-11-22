'use client';

import { useState, useRef } from 'react';
import { updatePostAction } from '../../../actions';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BlogSeries, BlogPost } from '@/db/queries';
import MarkdownEditor from '@/components/editor/markdown-editor';
import BlogPreview from '@/components/blog/blog-preview';
import { uploadImage } from '@/lib/imagekit';
import { Eye, EyeOff, ImagePlus, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EditPostFormProps {
  post: BlogPost;
  series: BlogSeries[];
}

export default function EditPostForm({ post, series }: EditPostFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  
  const [showPreview, setShowPreview] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state - initialize with post data
  const [formData, setFormData] = useState({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    readTime: post.readTime,
    tags: post.tags.join(', '),
    coverImage: post.coverImage || '',
    published: post.published,
    seriesId: post.seriesId?.toString() || '',
    seriesOrder: post.seriesOrder?.toString() || '',
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      const result = await uploadImage(file);
      handleInputChange('coverImage', result.url);
    } catch (error) {
      console.error('Error uploading cover image:', error);
      alert('Failed to upload cover image. Please try again.');
    } finally {
      setUploadingCover(false);
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    handleInputChange('title', title);
  };

  const parsedTags = formData.tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  const handleSubmit = async (formDataObj: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await updatePostAction(post.id, formDataObj);
      if (result?.success) {
        alert('Post updated successfully!');
        router.push('/admin');
        router.refresh();
      } else {
        alert('Failed to update post: ' + (result?.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Toggle */}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowPreview(!showPreview)}
          className="gap-2"
        >
          {showPreview ? (
            <>
              <EyeOff className="h-4 w-4" />
              Hide Preview
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Show Preview
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className={showPreview ? '' : 'lg:col-span-2'}>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <form 
                ref={formRef}
                action={handleSubmit} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-foreground">Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      required 
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="bg-background border-border text-foreground" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-foreground">Slug</Label>
                    <Input 
                      id="slug" 
                      name="slug" 
                      required 
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      className="bg-background border-border text-foreground" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-foreground">Excerpt</Label>
                  <Textarea 
                    id="excerpt" 
                    name="excerpt" 
                    required 
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    className="bg-background border-border text-foreground h-20" 
                  />
                </div>

                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="coverImage" className="text-foreground">Cover Image</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="coverImage" 
                      name="coverImage" 
                      value={formData.coverImage}
                      onChange={(e) => handleInputChange('coverImage', e.target.value)}
                      placeholder="Image URL or upload below"
                      className="bg-background border-border text-foreground flex-1" 
                    />
                    <input
                      ref={coverImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => coverImageInputRef.current?.click()}
                      disabled={uploadingCover}
                      className="gap-2"
                    >
                      {uploadingCover ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <ImagePlus className="h-4 w-4" />
                          Upload
                        </>
                      )}
                    </Button>
                  </div>
                  {formData.coverImage && (
                    <div className="mt-2 relative w-full h-32 rounded-md overflow-hidden">
                      <img
                        src={formData.coverImage}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Markdown Editor */}
                <MarkdownEditor
                  value={formData.content}
                  onChange={(value) => handleInputChange('content', value)}
                />
                <input type="hidden" name="content" value={formData.content} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="author" className="text-foreground">Author</Label>
                    <Input 
                      id="author" 
                      name="author" 
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      required 
                      className="bg-background border-border text-foreground" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="readTime" className="text-foreground">Read Time</Label>
                    <Input 
                      id="readTime" 
                      name="readTime" 
                      value={formData.readTime}
                      onChange={(e) => handleInputChange('readTime', e.target.value)}
                      placeholder="e.g. 5 min read" 
                      required 
                      className="bg-background border-border text-foreground" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-foreground">Tags (comma separated)</Label>
                  <Input 
                    id="tags" 
                    name="tags" 
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="Next.js, React, Tutorial" 
                    required 
                    className="bg-background border-border text-foreground" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="seriesId" className="text-foreground">Series (Optional)</Label>
                    <Select 
                      value={formData.seriesId || 'none'}
                      onValueChange={(value) => handleInputChange('seriesId', value === 'none' ? '' : value)}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue placeholder="Select a series" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border text-foreground">
                        <SelectItem value="none">None</SelectItem>
                        {series.map((s) => (
                          <SelectItem key={s.id} value={s.id.toString()}>
                            {s.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="seriesId" value={formData.seriesId || 'none'} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seriesOrder" className="text-foreground">Series Order</Label>
                    <Input 
                      id="seriesOrder" 
                      name="seriesOrder" 
                      type="number" 
                      value={formData.seriesOrder}
                      onChange={(e) => handleInputChange('seriesOrder', e.target.value)}
                      placeholder="1" 
                      className="bg-background border-border text-foreground" 
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="published" 
                    name="published" 
                    checked={formData.published}
                    onCheckedChange={(checked) => handleInputChange('published', checked as boolean)}
                  />
                  <Label htmlFor="published" className="text-foreground">Published</Label>
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Updating...
                      </>
                    ) : (
                      'Update Post'
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => router.push('/admin')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="lg:sticky lg:top-6 lg:h-fit">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Live Preview</h2>
            <BlogPreview
              title={formData.title}
              excerpt={formData.excerpt}
              content={formData.content}
              author={formData.author}
              readTime={formData.readTime}
              tags={parsedTags}
              coverImage={formData.coverImage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
