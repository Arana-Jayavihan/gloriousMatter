import axios from "axios";
import { API } from "./API";

const axiosInstance = axios.create({
    baseURL: API
})

export default axiosInstance