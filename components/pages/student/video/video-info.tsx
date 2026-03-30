'use client';

import { ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface VideoInfoProps {
  title: string;
  description: string;
  views: number;
  uploadedAt: string;
  channel: string;
}

export function VideoInfo({
  title,
  description,
  views,
  uploadedAt,
  channel,
}: VideoInfoProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  return (
    <div className="border-b border-border pb-4">
      <h1 className="text-2xl font-bold mb-3 text-foreground">{title}</h1>

      {/* Channel and actions */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-foreground">{channel}</p>
          <p className="text-sm text-muted-foreground">
            {views.toLocaleString()} lượt xem • {uploadedAt}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={isLiked ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setIsLiked(!isLiked);
              if (isDisliked) setIsDisliked(false);
            }}
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            Thích
          </Button>
          <Button
            variant={isDisliked ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setIsDisliked(!isDisliked);
              if (isLiked) setIsLiked(false);
            }}
          >
            <ThumbsDown className="w-4 h-4 mr-1" />
            Không thích
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-1" />
            Chia sẻ
          </Button>
        </div>
      </div>

      {/* Description */}
      <div className="bg-muted p-3 rounded-lg">
        <p className="text-sm text-foreground whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </div>
  );
}
