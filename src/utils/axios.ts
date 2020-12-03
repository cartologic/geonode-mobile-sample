import axios from "axios";
import appConfig from "../config";

/**
 * Axios instance to be used for all website API calls
 */
const defaultAxios = axios.create({
  baseURL: appConfig.serverBaseURL,
});

export default defaultAxios;
