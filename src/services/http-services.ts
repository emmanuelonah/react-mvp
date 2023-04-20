import axios, { AxiosResponse, AxiosRequestHeaders, AxiosRequestConfig } from 'axios';

import { getCookie } from 'hooks';
import { __DEV__, throwError } from 'utils';

const SESSION_COOKIES_KEY = 'token';

const __reactMvpClient__ = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://jsonplaceholder.typicode.com/',
});

function composeHeaders(noCredentials = true) {
  if (noCredentials) {
    return (requestHeaders?: AxiosRequestHeaders) => ({
      'Content-Type': 'application/json',
      ...(requestHeaders ?? {}),
    });
  }

  const token = getCookie(SESSION_COOKIES_KEY, 'noToken');

  if (!token && __DEV__) {
    throwError('HttpHeadersCompositionError', 'a token is missing, check the cookies store', composeHeaders);
  }

  return (requestHeaders?: AxiosRequestHeaders) => ({
    'Content-Type': 'application/json',
    ...(requestHeaders ?? {}),
    Authorization: `Bearer ${token}`,
  });
}

type BaseRequestType<DataType> = {
  urlSuffix: string;
  requestHeaders?: AxiosRequestHeaders;
  otherConfigs?: AxiosRequestConfig<DataType>;
};

/// HTTP GET
type HttpGetRequestType<DataType> = BaseRequestType<DataType>;
async function httpGetRequest<ResponseDataType>(
  params: HttpGetRequestType<ResponseDataType>
): Promise<AxiosResponse<ResponseDataType, 'GET'>> {
  const composedHeaders = composeHeaders();

  return await __reactMvpClient__({
    method: 'GET',
    url: params.urlSuffix,
    headers: composedHeaders(params.requestHeaders),
    ...(params.otherConfigs ?? {}),
  });
}

/// HTTP POST
interface httpPostRequestType<DataType> extends BaseRequestType<DataType> {
  data: DataType;
}
async function httpPostRequest<ResponseDataType>(
  params: httpPostRequestType<ResponseDataType>
): Promise<AxiosResponse<ResponseDataType, 'POST'>> {
  const composedHeaders = composeHeaders();

  return await __reactMvpClient__({
    method: 'POST',
    url: params.urlSuffix,
    headers: composedHeaders(params.requestHeaders),
    data: params.data,
    ...(params.otherConfigs ?? {}),
  });
}

/// HTTP PUT
interface httpPutRequestType<DataType> extends BaseRequestType<DataType> {
  data: DataType;
}
async function httpPutRequest<ResponseDataType>(
  params: httpPutRequestType<ResponseDataType>
): Promise<AxiosResponse<ResponseDataType, 'PUT'>> {
  const composedHeaders = composeHeaders();

  return await __reactMvpClient__({
    method: 'PUT',
    url: params.urlSuffix,
    headers: composedHeaders(params.requestHeaders),
    data: params.data,
    ...(params.otherConfigs ?? {}),
  });
}

/// HTTP PATCH
interface HttpPatchRequestType<DataType> extends BaseRequestType<DataType> {
  data?: DataType;
}
async function httpPatchRequest<DataType, ResponseDataType>(
  params: HttpPatchRequestType<DataType>
): Promise<AxiosResponse<ResponseDataType>> {
  const composedHeaders = composeHeaders();

  return await __reactMvpClient__({
    method: 'PATCH',
    url: params.urlSuffix,
    data: params.data,
    headers: composedHeaders(params.requestHeaders),
    ...(params.otherConfigs ?? {}),
  });
}

/// HTTP DELETE
async function httpDeleteRequest<ResponseDataType>(params: {
  urlSuffix: string;
  otherConfigs?: AxiosRequestConfig<ResponseDataType>;
}): Promise<AxiosResponse<ResponseDataType, 'DELETE'>> {
  const composedHeaders = composeHeaders();

  return await __reactMvpClient__({
    method: 'DELETE',
    url: params.urlSuffix,
    headers: composedHeaders(),
    ...(params.otherConfigs ?? {}),
  });
}

export { httpGetRequest, httpPatchRequest, httpDeleteRequest, httpPutRequest, httpPostRequest };
