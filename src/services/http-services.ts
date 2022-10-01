import axios, { AxiosResponse, type AxiosRequestHeaders } from 'axios';

import { getCookie } from 'hooks';
import { __DEV__, throwError } from 'utils';

const SESSION_COOKIES_KEY = 'token';

const __reactMvcClient__ = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://jsonplaceholder.typicode.com/',
});

function composeHeaders(noCredentials = true) {
  if (noCredentials) {
    return (theirHeaders?: AxiosRequestHeaders) => ({
      'Content-Type': 'application/json',
      ...theirHeaders,
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

type BaseRequestType = {
  urlSuffix: string;
  requestHeaders?: AxiosRequestHeaders;
};

/// HTTP GET
type HttpGetRequestType = BaseRequestType;
async function httpGetRequest<ResponseDataType>(
  params: HttpGetRequestType
): Promise<AxiosResponse<ResponseDataType, 'GET'>> {
  const composedHeaders = composeHeaders();

  return await __reactMvcClient__({
    method: 'GET',
    url: params.urlSuffix,
    headers: composedHeaders(params.requestHeaders),
  });
}

/// HTTP POST
interface httpPostRequestType extends BaseRequestType {
  data: Record<string, any>;
}
async function httpPostRequest<ResponseDataType>(
  params: httpPostRequestType
): Promise<AxiosResponse<ResponseDataType, 'POST'>> {
  const composedHeaders = composeHeaders();

  return await __reactMvcClient__({
    method: 'POST',
    url: params.urlSuffix,
    headers: composedHeaders(params.requestHeaders),
    data: params.data,
  });
}

/// HTTP PUT
async function httpPutRequest<ResponseDataType>(
  params: httpPostRequestType
): Promise<AxiosResponse<ResponseDataType, 'PUT'>> {
  const composedHeaders = composeHeaders();

  return await __reactMvcClient__({
    method: 'PUT',
    url: params.urlSuffix,
    headers: composedHeaders(params.requestHeaders),
    data: params.data,
  });
}

/// HTTP PATCH
interface HttpPatchRequestType<DataType> extends BaseRequestType {
  method: 'PATCH';
  data?: DataType;
}
async function httpPatchRequest<MethodType, DataType, ResponseDataType>(
  params: HttpPatchRequestType<DataType>
): Promise<AxiosResponse<ResponseDataType, MethodType>> {
  const composedHeaders = composeHeaders();

  return await __reactMvcClient__({
    method: params.method,
    url: params.urlSuffix,
    data: params.data,
    headers: composedHeaders(params.requestHeaders),
  });
}

/// HTTP DELETE
async function httpDeleteRequest<ResponseDataType>(
  urlSuffix: string
): Promise<AxiosResponse<ResponseDataType, 'DELETE'>> {
  const composedHeaders = composeHeaders();

  return await __reactMvcClient__({
    method: 'DELETE',
    url: urlSuffix,
    headers: composedHeaders(),
  });
}

export { httpGetRequest, httpPatchRequest, httpDeleteRequest, httpPutRequest, httpPostRequest };
