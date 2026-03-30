"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Loader2 } from "lucide-react"
import { VideoItem } from "@/components/pages/admin/video/video-item"
import videoService from "@/services/admin/VideoService"
import { UploadDialog, UploadVideoData } from "@/components/pages/admin/video/upload-dialog"
import { EditDialog } from "@/components/pages/admin/video/edit-dialog"
import { IVideo } from "@/types/models"
import { extractThumbnail } from "@/utils/handle"
import StorageService from "@/services/admin/StorageService"
import VideoService from "@/services/admin/VideoService"

export default function Home() {
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
        console.log("Failed to fetch videos:", e)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])
  const [uploadOpen, setUploadOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpload = useCallback(async (videoData: UploadVideoData) => {
    setIsLoading(true)
    try {
      // 1. Extract thumbnail from video file

      const { file, title, description, duration } = videoData;
      // 2. Generate thumbnail
      const thumbnailBlob = await extractThumbnail(file)
      const videoExt = file.name.split('.').pop() || 'mp4';
      const thumbnailName = `${file.name.replace(/\.[^/.]+$/, '')}_thumb.jpg`;

      // 3. Get upload URLs
      const [videoUrlRes, thumbUrlRes] = await Promise.all([
        await StorageService.getUploadUrl({
          file_name: `videos/${file.name}`,
          content_type: file.type,
        }),
        await StorageService.getUploadUrl({
          file_name: `thumbnails/${thumbnailName}`,
          content_type: "image/jpeg",
        }),
      ])

      // 4. Upload video and thumbnail
      await Promise.all([
        fetch(videoUrlRes.url, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type },
        }),
        fetch(thumbUrlRes.url, {
          method: 'PUT',
          body: thumbnailBlob,
          headers: { 'Content-Type': 'image/jpeg' },
        })
      ]);

      // 5. Call createVideo
      const video_key = file.name;
      const thumbnail_key = thumbnailName;
      const created = await VideoService.createVideo({
        title,
        description,
        video_key,
        thumbnail_key,
        duration,
      });
      // Optionally, refresh video list
      const apiVideos = await videoService.getAllVideos();
      setVideos(apiVideos);
    } catch (err) {
      alert('Upload failed: ' + err);
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleEdit = useCallback((video: IVideo) => {
    setSelectedVideo(video)
    setEditOpen(true)
  }, [])

  const handleSave = useCallback((updatedVideo: IVideo) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === updatedVideo.id ? updatedVideo : v))
    )
  }, [])

  const handleDelete = useCallback((id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id))
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
            <Button
              onClick={() => setUploadOpen(true)}
              size="lg"
              className="gap-2"
            >
              <Upload className="h-5 w-5" />
              Upload Video
            </Button>
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
            <Button onClick={() => setUploadOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Video Đầu Tiên
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoItem
                key={video.id}
                video={video}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Dialogs */}
      <UploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUpload={handleUpload}
      />
      <EditDialog
        video={selectedVideo}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={handleSave}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="font-medium text-foreground">Đang xử lý...</p>
          </div>
        </div>
      )}
    </div>
  )
}
