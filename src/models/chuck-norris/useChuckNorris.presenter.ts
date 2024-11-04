import { AxiosError } from 'axios';
import { useRef, useEffect, useState, useCallback } from 'react';

import { ChuckNorrisJokeResponse } from 'ChuckNorrisTypes';

import { ChuckNorrisModel } from './index.model';

const GENERIC_ERROR_MSG = "Sorry, we couldn't connect to the service kindly try again in few minutes";

export function useChuckNorrisPresenter() {
  const { current: chuckNorrisModel } = useRef(new ChuckNorrisModel());
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ChuckNorrisJokeResponse | null>(null);

  const asyncGetChuckNorrisJoke = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await chuckNorrisModel.getChuckNorrisJoke();

      setData(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      setError(axiosError.response?.data?.message || GENERIC_ERROR_MSG);
    } finally {
      setIsLoading(false);
    }
  }, [chuckNorrisModel]);

  useEffect(() => {
    asyncGetChuckNorrisJoke();
  }, [asyncGetChuckNorrisJoke]);

  return { isLoading, error, data };
}
