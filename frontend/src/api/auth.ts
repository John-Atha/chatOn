import axios from "axios";
import { apiUrl } from "./config";
import { buildAuthHeader, getRequest } from "./helpers";

axios.defaults.baseURL = apiUrl;

export const checkLoggedCall = async () => {
  const headers = buildAuthHeader();
  const requestUrl = "users/logged";
  return getRequest({ requestUrl, headers });
};

export const loginCall = async (body: any) => {
  const requestUrl = "users/login";
  return axios.post(requestUrl, body);
}

export const signUpCall = async (body: any) => {
  const requestUrl = "users/signup";
  return axios.post(requestUrl, body);
}