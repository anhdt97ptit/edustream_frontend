'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IVideo } from "@/types/models"

interface EditDialogProps {
  video: IVideo | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (video: IVideo) => void
}

export function EditDialog({ video, open, onOpenChange, onSave }: EditDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
    }
  }, [video]);

  const handleSubmit = async () => {
    if (!video || !title) return;

    setIsLoading(true);
    try {
      await onSave({
        ...video,
        title,
        description,
      });
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Sửa Video</DialogTitle>
          <DialogDescription>
            Cập nhật tiêu đề và mô tả video của bạn.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Thumbnail Preview */}
          <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted">
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Tiêu đề Video *
            </label>
            <Input
              placeholder="Nhập tiêu đề video..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-input border-border"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Mô Tả
            </label>
            <textarea
              placeholder="Nhập mô tả video..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-2 rounded-md bg-muted border border-border">
              <p className="text-muted-foreground">Thời Lượng</p>
              <p className="font-semibold text-foreground">{video.duration}</p>
            </div>
            <div className="p-2 rounded-md bg-muted border border-border">
              <p className="text-muted-foreground">Upload Lúc</p>
              <p className="font-semibold text-foreground">{video.uploadedAt}</p>
            </div>
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
              disabled={!title || isLoading}
              className="flex-1"
            >
              {isLoading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
