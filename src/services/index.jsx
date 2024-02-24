import axios from "axios";

export const { VITE_BASE_URL, VITE_API_VERSION, VITE_UPLOAD_PATH } = import.meta
  .env;

export const uploadUrl = `${VITE_BASE_URL}/uploads`;
const cancelationToken = axios.CancelToken.source();
export const baseAxios = axios.create({
  baseURL: `${VITE_BASE_URL}/api/${VITE_API_VERSION}`,
  // cancelToken: cancelationToken.token,
  withCredentials: true,
});
