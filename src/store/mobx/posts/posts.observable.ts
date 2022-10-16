import { observable } from 'mobx';

import { PostsResolvedResponse } from 'PostsTypes';

type PostsState = {
  isLoading: boolean;
  error: string | null;
  data: PostsResolvedResponse | null;
};

export const postsState: PostsState = observable({
  isLoading: false,
  error: null,
  data: null,
});
