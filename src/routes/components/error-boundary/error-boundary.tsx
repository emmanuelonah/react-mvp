import * as React from 'react';

import { __DEV__ } from 'utils';

interface PropTypes {
  children?: React.ReactNode;
}

interface StateTypes {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.state = {
      hasError: false,
    } as StateTypes;
  }

  public static getDerivedStateFromError(): StateTypes {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (__DEV__) {
      console.group('COMPONENT RENDERING ERROR 🚨');
      console.error({ error, errorInfo });
      console.groupEnd();
    }
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}
