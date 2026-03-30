'use client';

import { Trash2, Edit, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { IVideo } from '@/types/models';

interface VideoItemProps {
  video: IVideo;
  onEdit: (video: IVideo) => void;
  onDelete: (id: string) => void;
}

export function VideoItem({ video, onEdit, onDelete }: VideoItemProps) {
  return (
    <div className="group relative rounded-lg border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/20">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={video.thumbnail_url}
          alt={video.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {/* Action Dropdown */}
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(video)}>
                <Edit className="w-4 h-4 mr-2" />
                Sửa
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (confirm(`Xoá video "${video.title}"?`)) {
                    onDelete(video.id);
                  }
                }}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xoá
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-card-foreground truncate mb-1">
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{video.duration}</span>
          <span>{video.uploadedAt}</span>
        </div>
      </div>
    </div>
  );
}
