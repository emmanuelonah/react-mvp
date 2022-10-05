import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { createContext } from '..';

const contextValue = { env: 'test', testTool: 'jest', framework: 'react' };

const [Provider, useContext] = createContext<typeof contextValue>('TestContext');

describe('createContext', () => {
  it('should confirm that createContent returns a context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider value={contextValue}>{children}</Provider>
    );

    const { result } = renderHook(() => useContext(), { wrapper });

    expect(result.current).toEqual(contextValue);
  });
});
