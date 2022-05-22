import axios from "axios";
import { apiUrl } from "./config";
import { buildAuthHeader, getRequest } from "./helpers";

axios.defaults.baseURL = apiUrl;

export const checkLoggedCall = async () => {
  const headers = buildAuthHeader();
  const requestUrl = "users/logged";
  return getRequest({ requestUrl, headers });
};
