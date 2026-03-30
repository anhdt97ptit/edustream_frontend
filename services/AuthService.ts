import { BaseService } from "@/lib/configs/service";

const ENDPOINTS = {
  API_LOGIN: "/api/auth/login",
};

class AuthService extends BaseService {
  async login(payload?: object) {
    const result = await this.apiPost(ENDPOINTS.API_LOGIN, payload);

    return result.data;
  }

  async signOut() {
    return await this.apiPost("api/auth/logout");
  }

  async fetchDataProfile() {
    const result = await this.apiGet("api/auth/me");

    return result.data;
  }

  async refreshToken() {
    const result = await this.apiPost("api/refresh");

    return result.data;
  }

  async changePassword(payload?: object) {
    const result = await this.apiPost(`api/auth/change-password`, payload);

    return result.data;
  }
}

const authService = new AuthService();
export default authService;
