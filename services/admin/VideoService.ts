// VideoService.ts
// Service for handling video-related API calls

import { BaseService } from '@/lib/configs/service';
import { IVideo } from '@/types/models';

export interface CreateVideoParams {
  title: string;
  description: string;
  video_key: string;
  thumbnail_key: string;
  duration: number;
}

export interface CreateVideoResponse {
  // Define response fields as needed
  id: string;
  title: string;
  description: string;
  video_key: string;
  thumbnail_key: string;
  duration: number;
  // ...other fields from API response
}

class AdminVideoService extends BaseService {

  async getAllVideos(): Promise<IVideo[]> {
    const response = await this.apiGet('/admin/videos');

    return response.data.data;
  }

  async createVideo(params: CreateVideoParams): Promise<CreateVideoResponse> {
    const response = await this.apiPost('/admin/videos', params);
    return response.data;
  }

  // Add other video-related methods if needed
}

const adminVideoService = new AdminVideoService();

export default adminVideoService;
