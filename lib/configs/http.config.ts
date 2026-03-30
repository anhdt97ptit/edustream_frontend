import axios from "axios";
import { HTTP_CODE } from "@/utils/constants/http";
import axiosRequestConfig from "./axios.config";

// Utils

/**
 *  Documents Interceptors: https://axios-http.com/docs/interceptors
 **/

const http = axios.create(axiosRequestConfig);

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error?.response?.status === HTTP_CODE.UNAUTHORIZED) {
      // TODO: logout
    } else {
      return Promise.reject(error);
    }
  },
);

export default http;
