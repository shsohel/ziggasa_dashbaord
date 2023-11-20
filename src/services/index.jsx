import axios from "axios";

export const { VITE_BASE_URL, VITE_API_VERSION } = import.meta.env;

const cancelationToken = axios.CancelToken.source();
export const baseAxios = axios.create({
  baseURL: `${VITE_BASE_URL}/api/${VITE_API_VERSION}`,
  cancelToken: cancelationToken.token,
  withCredentials: true,
});
