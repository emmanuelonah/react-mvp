import contextStore from './context/root.context';

export function useStore() {
  return {
    ...contextStore.useContextStore,
  };
}
