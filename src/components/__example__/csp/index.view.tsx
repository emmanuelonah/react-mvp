import * as React from 'react';

import { CSPAttributes, DIRECTIVES, VALUES } from './models/csp.model';
import { useCsp } from './hooks/useCsp.presenter';

type CspPropTypes = {
  attributes: CSPAttributes;
  children: React.ReactNode;
};

function Csp(props: CspPropTypes) {
  useCsp(props.attributes);

  return <>{props.children}</>;
}

export default {
  Component: Csp,
  DIRECTIVES,
  VALUES,
};
