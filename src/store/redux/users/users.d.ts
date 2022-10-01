declare module 'UsersTypes' {
  import { ActionType } from 'typesafe-actions';

  export type UsersActions = ActionType<typeof import('./users.actions').default>;

  export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: { lat: string; lng: string };
    };
    phone: string;
    website: string;
    company: { name: string; catchPhrase: string; bs: string };
  }

  export type UsersResolvedResponse = User[];

  export interface UsersRejectedResponse {
    message: string;
  }
}
