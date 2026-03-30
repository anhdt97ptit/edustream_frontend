// StorageService.ts
// Service for handling storage-related API calls

import { BaseService } from '@/lib/configs/service';

export interface GetUploadUrlParams {
  file_name: string;
  content_type: string;
}

export interface GetUploadUrlResponse {
  url: string;
  // Add other fields returned by the API if needed
}

class StorageService extends BaseService {
  async getUploadUrl(params: GetUploadUrlParams): Promise<GetUploadUrlResponse> {
    const response = await this.apiPost('admin/storage/upload-url', params);

    return response.data;
  }

  // Add other storage-related methods if needed
}

const storageService = new StorageService();

export default storageService;
