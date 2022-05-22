import axios from "axios";
import { apiUrl } from "./config";
import { buildAuthHeader, getRequest } from "./helpers";

axios.defaults.baseURL = apiUrl;

export const getContactsCall = async () => {
    const headers = buildAuthHeader();
    const requestUrl = 'messages/contacts';
    return getRequest({ requestUrl, headers });
}
