'use client';

import Image from 'next/image';
import { IVideo } from "@/types/models"

interface VideoItemProps {
  video: IVideo
}

export function VideoItem({ video }: VideoItemProps) {
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
