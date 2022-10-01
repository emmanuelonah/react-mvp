declare module 'RootTypes' {
  import { StateType } from 'typesafe-actions';

  export type RootState = StateType<typeof import('./root.reducer').default>;
}
