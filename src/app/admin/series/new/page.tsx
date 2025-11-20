'use client';

import { createSeriesAction } from '../../actions';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRef } from 'react';

export default function NewSeriesPage() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-[#14315c] border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Create New Series</CardTitle>
        </CardHeader>
        <CardContent>
          <form 
            ref={formRef}
            action={async (formData) => {
              const result = await createSeriesAction(formData);
              if (result?.success) {
                alert('Series created successfully!');
                formRef.current?.reset();
              } else {
                alert('Failed to create series');
              }
            }} 
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-200">Title</Label>
              <Input id="title" name="title" required className="bg-black/50 border-slate-600 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-slate-200">Slug</Label>
              <Input id="slug" name="slug" required className="bg-black/50 border-slate-600 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-200">Description</Label>
              <Textarea id="description" name="description" required className="bg-black/50 border-slate-600 text-white min-h-[100px]" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="published" name="published" defaultChecked />
              <Label htmlFor="published" className="text-slate-200">Published</Label>
            </div>

            <Button type="submit" className="w-full bg-amber-400 text-black hover:bg-amber-500">
              Create Series
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
