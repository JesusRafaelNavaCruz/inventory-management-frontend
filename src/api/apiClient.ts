import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/";

let isRefreshing = false;
let failedRequest: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToke");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig | undefined;

        if (
            error.response?.status === 401 && 
            originalRequest?.url !== '/auth/refresh' && 
            originalRequest?.url !== '/auth/login'
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedRequest.push({ resolve, reject });
                }).then(() => {
                    if (!originalRequest) {
                        return Promise.reject(new Error("Original request is undefined"));
                    }
                    
                    if (!originalRequest.headers) {
                        originalRequest.headers = new AxiosHeaders();
                    }
                    
                    originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                    return apiClient(originalRequest as InternalAxiosRequestConfig);
                }).catch((err) => {
                    return Promise.reject(err);
                });
            }
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await apiClient.post('/auth/refresh', {
                    refreshToken
                });

                const { accessToken, refreshToken: newRefreshToken } = response.data;
                
                localStorage.setItem('accessToken', accessToken); // Corregí el typo 'accessToke' → 'accessToken'

                if (newRefreshToken) {
                    localStorage.setItem('refreshToken', newRefreshToken);
                }

                if (!originalRequest) {
                    return Promise.reject(new Error("Original request is undefined"));
                }

                if (!originalRequest.headers) {
                    originalRequest.headers = new AxiosHeaders();
                }

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                failedRequest.forEach((pending) => {
                    pending.resolve(apiClient(originalRequest));
                });

                return apiClient(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
                failedRequest = [];               
            }
        }

        return Promise.reject(error);
    } 
);
