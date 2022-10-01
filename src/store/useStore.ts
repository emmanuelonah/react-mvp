import { useDispatch, useSelector } from 'react-redux';

import contextStore from './context/root.context';

export function useStore() {
  return {
    ...contextStore.useContextStore,
    useDispatch,
    useSelector,
  };
}
