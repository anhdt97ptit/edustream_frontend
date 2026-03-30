// VideoService.ts
// Service for handling video-related API calls

import { BaseService } from '@/lib/configs/service';
import { IVideo } from '@/types/models';


class StudentVideoService extends BaseService {

  async getAllVideos(): Promise<IVideo[]> {
    const response = await this.apiGet('/student/videos');

    return response.data.data;
  }

  async getDetailVideo(id: string): Promise<IVideo> {
    const response = await this.apiGet(`/student/videos/${id}`);

    return response.data.data;
  }
}

const studentVideoService = new StudentVideoService()

export default studentVideoService
