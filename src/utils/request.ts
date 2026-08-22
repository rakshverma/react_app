import { instance } from "./axios";

export const request = (
  method: string,
  url: string,
  payload: any = null,
  headers: any = null
) => {
  const requestData: any = { method, url };
  const token = localStorage.getItem("token");
  if (payload) requestData.data = payload;
  requestData.headers = {
    Accept: "*/*",
  };
  if (headers) requestData.headers = { ...requestData.headers, ...headers };
  if (token)
    requestData.headers = {
      ...requestData.headers,
      Authorization: "Bearer " + token,
    };
  return instance(requestData);
};
