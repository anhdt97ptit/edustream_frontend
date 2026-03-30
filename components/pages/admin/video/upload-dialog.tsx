'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import { IVideo } from '@/types/models';

export interface UploadVideoData {
  file: File
  title: string
  description: string
  duration: number
}

interface UploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpload: (videoData: UploadVideoData) => void
}

export function UploadDialog({ open, onOpenChange, onUpload }: UploadDialogProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles?.length) {
      const droppedFile = droppedFiles[0];
      if (droppedFile.type.startsWith('video/')) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file || !title) return;

    setIsLoading(true);
    try {
      await onUpload({
        file,
        title,
        description,
        duration: 100,
      });

      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Video Mới</DialogTitle>
          <DialogDescription>
            Kéo thả video hoặc click để chọn file. Tối đa 500MB.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Drag and Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border bg-muted/30 hover:border-primary/50"
            }`}
          >
            <input
              type="file"
              accept="video/*"
              onChange={handleFileInput}
              className="absolute inset-0 cursor-pointer opacity-0"
            />

            {file ? (
              <div className="space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <p className="font-semibold text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFile(null)
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="mr-1 h-4 w-4" />
                  Xoá file
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <p className="font-semibold text-foreground">
                  Kéo thả video vào đây
                </p>
                <p className="text-sm text-muted-foreground">
                  hoặc click để chọn file
                </p>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Tiêu đề Video *
            </label>
            <Input
              placeholder="Nhập tiêu đề video..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-border bg-input"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Mô Tả</label>
            <textarea
              placeholder="Nhập mô tả video..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!file || !title || isLoading}
              className="flex-1"
            >
              {isLoading ? "Đang upload..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
