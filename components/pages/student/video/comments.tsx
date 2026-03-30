'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: string;
}

interface CommentsProps {
  comments: Comment[];
}

export function Comments({ comments }: CommentsProps) {
  const [commentText, setCommentText] = useState('');
  const [allComments, setAllComments] = useState<Comment[]>(comments);

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: 'Bạn',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        content: commentText,
        likes: 0,
        timestamp: 'Vừa xong',
      };
      setAllComments([newComment, ...allComments]);
      setCommentText('');
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        {allComments.length} bình luận
      </h3>

      {/* Comment input */}
      <div className="flex gap-3 mb-6">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" />
          <AvatarFallback>BN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Input
            placeholder="Viết bình luận..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCommentText('')}
            >
              Hủy
            </Button>
            <Button
              size="sm"
              onClick={handleAddComment}
              disabled={!commentText.trim()}
            >
              Bình luận
            </Button>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {allComments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.avatar} />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-muted p-3 rounded-lg">
                <p className="font-semibold text-sm text-foreground">
                  {comment.author}
                </p>
                <p className="text-sm text-foreground mt-1">{comment.content}</p>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <button className="hover:text-foreground flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" />
                  {comment.likes}
                </button>
                <button className="hover:text-foreground">Trả lời</button>
                <span>{comment.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
