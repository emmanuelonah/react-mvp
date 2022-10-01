import * as React from 'react';

import { If, Loader } from 'components';
import { __DEV__ } from 'utils';

type LoadingErrorDataRendererPropTypes<DataType> = {
  isLoading: boolean;
  error: string | null;
  data: DataType;
  hasData: boolean;
  endpoint: string;
  children(data: DataType): React.ReactNode;
};

export function LoadingErrorDataRenderer<DataType>({
  isLoading,
  error,
  data,
  hasData,
  endpoint,
  children,
}: LoadingErrorDataRendererPropTypes<DataType>) {
  return (
    <If
      condition={isLoading}
      do={<Loader isLoading={isLoading} />}
      else={
        <If
          condition={error != null}
          do={<p>{error || `${__DEV__ && `An uncached error has occurred in ${endpoint} ajax operation`}`}</p>}
          else={<If condition={!hasData} do={<p>No data</p>} else={children(data)} />}
        />
      }
    />
  );
}
