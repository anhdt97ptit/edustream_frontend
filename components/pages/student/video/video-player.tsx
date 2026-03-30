'use client';

import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail: string;
}

export function VideoPlayer({ videoUrl, thumbnail }: VideoPlayerProps) {
  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden group">
      <video
        className="w-full h-full"
        poster={thumbnail}
        controls
        src={videoUrl}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
