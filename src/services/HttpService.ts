/**
 * class http service facade
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { throwError } from 'utils';

type HttpServiceArg = {
  baseURL: string;
  /**
   * @getToken
   * Lets use a function here to avoid staled token
   */
  getToken?(): string;
  authRequest?: boolean;
};

export class HttpService {
  __httpService__: AxiosInstance;

  constructor({ baseURL, getToken, authRequest = true }: HttpServiceArg) {
    this.__httpService__ = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    });

    if (authRequest && getToken!=undefined) {
      HttpService.validateToken(getToken());

      HttpService.requestMiddleware(getToken);
    }
  }

  private static validateToken(token: string) {
    /**
     * Lets cover the situation of falsy string
     */
    if (!token) throwError('MissingTokenError', 'Invalid token.', HttpService.validateToken);
  }

  private static requestMiddleware(getToken: () => string) {
    axios.interceptors.request.use(async function appendAuthorizationToEveryRequest(config) {
      config.headers!.Authorization = `Bearer ${getToken()}`;

      return config;
    });
  }

  public async httpGetRequest<C = any, ResponseType = Record<string, any>>(
    url: string,
    config?: AxiosRequestConfig<C>
  ) {
    const response = await this.__httpService__.get<ResponseType>(url, config);

    return response;
  }

  public async httpPostRequest<C = any, D = Record<string, string>, ResponseType = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<C extends D ? any : any>
  ) {
    const response = await this.__httpService__.post<ResponseType>(url, data, config);

    return response;
  }

  public async httpPutRequest<C = any, D = Record<string, string>, ResponseType = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<C extends D ? any : any>
  ) {
    const response = await this.__httpService__.put<ResponseType>(url, data, config);

    return response;
  }

  public async httpPatchRequest<C = any, D = Record<string, string>, ResponseType = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<C extends D ? any : any>
  ) {
    const response = await this.__httpService__.patch<ResponseType>(url, data, config);

    return response;
  }

  public async httpDeleteRequest<C = any, ResponseType = any>(url: string, config?: AxiosRequestConfig<C>) {
    const response = await this.__httpService__.delete<ResponseType>(url, config);

    return response;
  }
}
