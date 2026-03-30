import http from "./http.config";

export class BaseService {
  apiGet(path: string, params?: any) {
    const config = { params };

    return http.get(path, config);
  }

  apiGetFile(path: string, params?: any) {
    const config = { params };

    return http.get(path, { ...config, responseType: "blob" });
  }

  async apiPut(path: string, payload?: any) {
    await this.apiGetCsrfToken();
    return http.put(path, payload);
  }

  async apiPost(path: string, payload?: any) {
    await this.apiGetCsrfToken();
    return http.post(path, payload);
  }

  async apiPostFile(path: string, payload?: any) {
    await this.apiGetCsrfToken();
    let preConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return http.post(path, payload, preConfig);
  }

  async apiDelete(path: string) {
    await this.apiGetCsrfToken();
    return http.delete(path);
  }

  apiGetCsrfToken() {
    // return http.get("/sanctum/csrf-cookie");
  }
}
