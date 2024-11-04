import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { throwError } from 'utils';

type HttpServiceArg = {
  baseURL: string;
  getToken?(): string;
};

export class HttpService {
  private __httpService__: AxiosInstance;

  constructor({ baseURL, getToken }: HttpServiceArg) {
    this.__httpService__ = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } });
    if (getToken) this.requestMiddleware(getToken);
  }

  private static validateToken(token: string) {
    if (!token) throwError('MissingTokenError', 'Invalid token.', HttpService.validateToken);
  }

  private requestMiddleware = (getToken: () => string) => {
    this.__httpService__.interceptors.request.use(
      async (config) => {
        HttpService.validateToken(getToken());
        config.headers!.Authorization = `Bearer ${getToken()}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
  };

  private async request<ResponseType = any, D = any, C = any>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: D,
    config?: AxiosRequestConfig<C>
  ) {
    const response = await this.__httpService__[method]<ResponseType>(url, data, config);
    return response;
  }

  public httpGetRequest<ResponseType = any, C = any>(url: string, config?: AxiosRequestConfig<C>) {
    return this.request<ResponseType, undefined, C>('get', url, undefined, config);
  }

  public httpPostRequest<D = any, ResponseType = any, C = any>(url: string, data: D, config?: AxiosRequestConfig<C>) {
    return this.request<ResponseType, D, C>('post', url, data, config);
  }

  public httpPutRequest<D = any, ResponseType = any, C = any>(url: string, data: D, config?: AxiosRequestConfig<C>) {
    return this.request<ResponseType, D, C>('put', url, data, config);
  }

  public httpPatchRequest<D = any, ResponseType = any, C = any>(url: string, data: D, config?: AxiosRequestConfig<C>) {
    return this.request<ResponseType, D, C>('patch', url, data, config);
  }

  public httpDeleteRequest<ResponseType = any, C = any>(url: string, config?: AxiosRequestConfig<C>) {
    return this.request<ResponseType, undefined, C>('delete', url, undefined, config);
  }
}
