"use client"

import { useParams } from "next/navigation"
import { VideoPlayer } from "@/components/pages/student/video/video-player"
import { VideoInfo } from "@/components/pages/student/video/video-info"
import { Comments } from "@/components/pages/student/video/comments"
import { RelatedVideos } from "@/components/pages/student/video/related-videos"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { IVideo } from "@/types/models"
import { useEffect, useState } from "react"
import VideoService from "@/services/student/VideoService"

// Mock data
const mockComments = [
  {
    id: "1",
    author: "Nguyễn Văn A",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    content: "Video rất hữu ích, cảm ơn đã chia sẻ kinh nghiệm của mình!",
    likes: 24,
    timestamp: "2 ngày trước",
  },
  {
    id: "2",
    author: "Trần Thị B",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    content: "Mình vừa áp dụng các tips này và kết quả quá tuyệt vời!",
    likes: 15,
    timestamp: "1 ngày trước",
  },
  {
    id: "3",
    author: "Lê Văn C",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    content: "Có thể giải thích kỹ hơn về phần lighting không?",
    likes: 8,
    timestamp: "12 giờ trước",
  },
]

export default function WatchPage() {
  const params = useParams()
  const videoId = params.id as string
  const [video, setVideo] = useState<IVideo | null>(null)

  const relatedVideos: IVideo[] = []

  useEffect(() => {
    ;(async () => {
      const data = await VideoService.getDetailVideo(videoId)

      setVideo(data)
    })()
  }, [])

  if (!video) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Video không tìm thấy
          </h1>
          <Link href="/videos">
            <Button>Quay lại trang chủ</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left side - Video player and info */}
          <div className="lg:col-span-2">
            {/* Video player */}
            <VideoPlayer
              videoUrl={video.video_url}
              thumbnail={video.thumbnail_url}
            />

            {/* Video info */}
            <div className="mt-6">
              <VideoInfo
                title={video.title}
                description={video.description}
                views={100}
                uploadedAt={video.uploadedAt}
                channel={"test 123123"}
              />
            </div>

            {/* Comments */}
            <Comments comments={mockComments} />
          </div>

          {/* Right side - Related videos */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Video liên quan
            </h3>
            <RelatedVideos videos={relatedVideos} />
          </div>
        </div>
      </div>
    </main>
  )
}
