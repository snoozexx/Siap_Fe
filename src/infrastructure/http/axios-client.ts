import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_BE || "https://5637ktc7-3001.asse.devtunnels.ms",
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const axiosClient = async <TData, TError = unknown, TVariables = unknown>(
  config: AxiosRequestConfig<TVariables>
): Promise<TData> => {
  const response = await axiosInstance.request<TData>(config);
  return response.data; 
};

export default axiosClient;