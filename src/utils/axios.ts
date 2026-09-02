import axios from "axios";

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");
const withTrailingSlash = (url: string) => `${trimTrailingSlash(url)}/`;

const baseURL = withTrailingSlash(process.env.REACT_APP_API_BASE_URL || "http://localhost:3001");

export const uploadUrl = withTrailingSlash(process.env.REACT_APP_UPLOAD_URL || `${baseURL}uploads`);

export const instance: any = axios.create({
  baseURL,
  timeout: 120000,
});

instance.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const config = error.config;
    if (
      config &&
      !config._retried &&
      (!error.response || error.code === "ECONNABORTED" || error.code === "ERR_NETWORK")
    ) {
      config._retried = true;
      return instance(config);
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios.create({
  baseURL,
  timeout: 120000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
