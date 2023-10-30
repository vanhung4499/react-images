import axios from "axios";
import { API_KEY, BASE_URL } from "./constants";

const handleResponse = (res) => {
    return res;
};

const handleError = (error) => {
    return error;
};

const axiosClient = axios.create({
    baseURL: BASE_URL,
});

axiosClient.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = API_KEY;
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return handleResponse(response);
    },
    async (error) => {
        console.log(error);
        return Promise.reject(handleError(error));
    }
);

export default axiosClient;
