import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {removeEndingSlash, removeStartingSlash} from '@/utils';
import {apiConfig} from '@/config/api-config';
import {AuthService} from '@/services';

type RequestConfig = AxiosRequestConfig & {
  url: string;
  useBearerToken?: boolean;
  bearerToken?: string | null;
  multipart?: boolean;
};

function getInstance(options: RequestConfig): AxiosInstance {
  const hasMultipart = options?.multipart;

  const instance = axios.create({
    baseURL: `${removeEndingSlash(apiConfig.baseUrl)}/`,
    timeout: 9000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    async (config: any) => {
      try {
        if (config && config?.headers) {
          const token =
            options?.bearerToken ?? (await new AuthService().getToken());

          if (
            (typeof options.useBearerToken === 'undefined' ||
              options.useBearerToken) &&
            token
          ) {
            config.headers.Authorization = `Bearer ${token}`;
          }

          if (hasMultipart) {
            config.headers['Content-Type'] = 'multipart/form-data';
          }

          config.headers = {
            ...config.headers,
            ...options?.headers,
          };
        }
      } catch (e) {}

      return config;
    },
    error => Promise.reject(error),
  );

  return instance;
}

const apiClient = {
  get(options: RequestConfig) {
    const instance: AxiosInstance = getInstance(options);

    return instance
      .get(removeStartingSlash(options.url))
      .then(res => res)
      .catch(reason => Promise.reject(reason));
  },

  post(options: RequestConfig) {
    const instance: AxiosInstance = getInstance(options);

    return instance
      .post(removeStartingSlash(options.url), options.data)
      .then(res => res)
      .catch(reason => Promise.reject(reason));
  },

  put(options: RequestConfig) {
    const instance: AxiosInstance = getInstance(options);

    return instance
      .put(removeStartingSlash(options.url), options.data)
      .then(res => res)
      .catch(reason => Promise.reject(reason));
  },

  patch(options: RequestConfig) {
    const instance: AxiosInstance = getInstance(options);

    return instance
      .patch(removeStartingSlash(options.url), options.data)
      .then(res => res)
      .catch(reason => Promise.reject(reason));
  },

  delete(options: RequestConfig) {
    const instance: AxiosInstance = getInstance(options);

    return instance
      .delete(removeStartingSlash(options.url))
      .then(res => res)
      .catch(reason => Promise.reject(reason));
  },
};

export {apiClient};
