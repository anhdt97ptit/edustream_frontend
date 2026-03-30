import axios, { CreateAxiosDefaults } from "axios";

const cancelTokenSource = axios.CancelToken.source();
const axiosRequestConfig: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  responseType: "json",
  timeout: 120000,
  headers: {
    // "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  cancelToken: cancelTokenSource.token,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
};

export default axiosRequestConfig;
