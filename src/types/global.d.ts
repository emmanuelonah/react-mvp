declare module 'GlobalTypes' {
  export type ValueOf<T> = T[keyof T];

  export type KeyOf<T> = [keyof T];
}
