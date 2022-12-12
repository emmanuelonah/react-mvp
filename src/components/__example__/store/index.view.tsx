import React, { useState } from 'react';

import { createContext } from 'utils';
import { Store as StoreModel, Currency, Organization, Donation } from './models/store.model';

type StoreContextType = {
  currency: Currency;
  organization: Organization;
  donation: Donation | null;
  setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
  setOrganization: React.Dispatch<React.SetStateAction<Organization>>;
  setDonation: React.Dispatch<React.SetStateAction<Donation | null>>;
};

const [StoreProvider, useStore] = createContext<StoreContextType>('StoreContext');

type StorePropTypes = {
  children: React.ReactNode;
};

function Store(props: StorePropTypes) {
  const { current: store } = React.useRef(new StoreModel());
  const [currency, setCurrency] = useState(() => store.currency);
  const [organization, setOrganization] = useState(() => store.organization);
  const [donation, setDonation] = useState<Donation | null>(null);

  const values = React.useMemo(
    () => ({
      currency,
      organization,
      donation,
      setCurrency,
      setOrganization,
      setDonation,
    }),
    [currency, donation, organization]
  );

  return <StoreProvider value={values}>{props.children}</StoreProvider>;
}

export { Store, useStore };
