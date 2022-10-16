import { runInAction } from 'mobx';
import request, { AxiosError } from 'axios';

import { httpGetRequest } from 'services';
import { postsState } from './posts.observable';
import { PostsResolvedResponse, PostsRejectedResponse } from 'PostsTypes';

const GENERIC_ERROR_MSG = "Sorry, we couldn't connect to the service kindly try again in few minutes";

export async function asyncGetPosts() {
  postsState.isLoading = true;
  try {
    const response = await httpGetRequest<PostsResolvedResponse>({ urlSuffix: 'posts' });

    runInAction(function updateState() {
      postsState.isLoading = false;
      postsState.error = null;
      postsState.data = response.data;
    });
  } catch (err) {
    const error = err as Error | AxiosError;
    const errorMsg =
      (request.isAxiosError(error) && (error.response?.data as PostsRejectedResponse)?.message) || GENERIC_ERROR_MSG;

    runInAction(function updateState() {
      postsState.isLoading = false;
      postsState.error = errorMsg;
    });
  }
}
