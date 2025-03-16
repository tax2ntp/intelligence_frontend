import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface ErrorResponse {
    error?: string;
    message?: string;
    [key: string]: unknown;
}

const handleErrorResponse = (error: AxiosError<ErrorResponse>) => {
	if (error.response && error.response.status !== 404 && error.response.status !== 401) {
		//
	}
	if (import.meta.env.REACT_APP_ENV === "development") console.error("**intercepter request**", error);
};

export const Axios = axios.create({
	baseURL: import.meta.env.REACT_APP_API_URL,
	timeout: 35000
});

Axios.interceptors.request.use(
	async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		} else {
			config.headers["Authorization"] = "No-Token";
		}

		config.params = { ...config.params};
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);


Axios.interceptors.response.use(
	response => response,
	async (error: AxiosError<ErrorResponse>): Promise<never> => {
		await handleErrorResponse(error);
		return Promise.reject(error);
	}
);

export default Axios