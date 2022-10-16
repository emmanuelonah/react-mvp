declare module 'PostsTypes' {
  import { ActionType } from 'typesafe-actions';

  export type UsersActions = ActionType<typeof import('./users.actions').default>;

  export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  export type PostsResolvedResponse = Post[];

  export interface PostsRejectedResponse {
    message: string;
  }
}
