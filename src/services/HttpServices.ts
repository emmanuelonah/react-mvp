import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { throwError } from 'utils';

type HttpServiceArg = {
  baseURL: string;
  getToken?(): string;
  authRequest?: boolean;
};

export class HttpService {
  __httpService__: AxiosInstance;

  constructor({ baseURL, getToken, authRequest = true }: HttpServiceArg) {
    this.__httpService__ = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } });

    if (authRequest && getToken != undefined) this.requestMiddleware(getToken);
  }

  private static validateToken(token: string) {
    if (!token) throwError('MissingTokenError', 'Invalid token.', HttpService.validateToken);
  }

  private requestMiddleware(getToken: () => string) {
    this.__httpService__.interceptors.request.use(
      async function appendAuthorizationToEveryRequest(config) {
        HttpService.validateToken(getToken());

        config.headers!.Authorization = `Bearer ${getToken()}`;

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  public async httpGetRequest<ResponseType = Record<string, any>, C = any>(
    url: string,
    config?: AxiosRequestConfig<C>
  ) {
    const response = await this.__httpService__.get<ResponseType>(url, config);

    return response;
  }

  public async httpPostRequest<D = Record<string, string>, ResponseType = any, C = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<C extends D ? any : any>
  ) {
    const response = await this.__httpService__.post<ResponseType>(url, data, config);

    return response;
  }

  public async httpPutRequest<D = Record<string, string>, ResponseType = any, C = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<C extends D ? any : any>
  ) {
    const response = await this.__httpService__.put<ResponseType>(url, data, config);

    return response;
  }

  public async httpPatchRequest<D = Record<string, string>, ResponseType = any, C = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<C extends D ? any : any>
  ) {
    const response = await this.__httpService__.patch<ResponseType>(url, data, config);

    return response;
  }

  public async httpDeleteRequest<ResponseType = any, C = any>(url: string, config?: AxiosRequestConfig<C>) {
    const response = await this.__httpService__.delete<ResponseType>(url, config);

    return response;
  }
}
