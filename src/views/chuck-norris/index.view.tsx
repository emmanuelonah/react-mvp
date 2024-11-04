import { AsyncRenderer } from 'components';
import { useChuckNorrisPresenter } from 'models';
import { ChuckNorrisJokeResponse } from 'ChuckNorrisTypes';

export default function ChuckNorris() {
  const { isLoading, error, data } = useChuckNorrisPresenter();
  return (
    <AsyncRenderer<ChuckNorrisJokeResponse>
      endpoint="jokes/random"
      isLoading={isLoading}
      error={error}
      data={data!}
      hasData={!!data}
    >
      {(joke) => (
        <div>
          <img src={joke?.icon_url} alt="Chuck Norris" />
          <p>{joke?.value}</p>
        </div>
      )}
    </AsyncRenderer>
  );
}
