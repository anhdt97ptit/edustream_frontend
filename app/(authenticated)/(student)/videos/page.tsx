"use client"

import { useEffect, useState } from "react"
import { Upload } from "lucide-react"
import { VideoItem } from "@/components/pages/student/video/video-item"
import Link from "next/link"
import { IVideo } from "@/types/models"
import videoService from "@/services/student/VideoService"

export default function StudentVideoPage() {
  const [videos, setVideos] = useState<IVideo[]>([])
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const apiVideos = await videoService.getAllVideos()
        const mapped = apiVideos.map((v: IVideo) => ({
          ...v,
          uploadedAt: "Vừa xong",
        }))
        if (mounted) setVideos(mapped)
      } catch (e) {
        console.error("Failed to fetch videos:", e)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Quản Lý Video
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Tổng cộng {videos.length} video
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {videos.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/30">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Không có video
            </h2>
            <p className="mb-6 max-w-sm text-center text-muted-foreground">
              Bắt đầu bằng cách upload video đầu tiên của bạn
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <Link
                key={video.id}
                href={`/videos/${video.id}`}
                className="group"
              >
                <VideoItem key={video.id} video={video} />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
