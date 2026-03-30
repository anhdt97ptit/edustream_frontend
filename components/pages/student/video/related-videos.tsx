'use client';

import Link from 'next/link';
import Image from 'next/image';

import { IVideo } from "@/types/models"

interface RelatedVideosProps {
  videos: IVideo[];
}

export function RelatedVideos({ videos }: RelatedVideosProps) {
  return (
    <div className="space-y-3">
      {videos.map((video) => (
        <Link
          key={video.id}
          href={`/watch/${video.id}`}
          className="flex gap-3 hover:bg-muted p-2 rounded-lg transition-colors group"
        >
          <div className="relative w-40 aspect-video flex-shrink-0 rounded overflow-hidden bg-muted">
            <Image
              src={video.thumbnail_url}
              alt={video.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary">
              {video.title}
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              {video.uploadedAt}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {video.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
