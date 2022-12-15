import React, { useState, useCallback, useMemo } from 'react';

import { createContext } from 'utils';
import { Store as StoreModel, Currency, Organization, Donation } from './models/store.model';

type StoreContextType = {
  currency: Currency;
  organization: Organization;
  donation: Donation | null;
  updateCurrency: (curr: Currency) => void;
  updateOrganization: (org: Organization) => void;
  updateDonation: React.Dispatch<React.SetStateAction<Donation | null>>;
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

  const updateCurrency = useCallback(
    (curr: Currency) => {
      store.currency = curr;
      setCurrency(curr);
    },
    [store]
  );

  const updateOrganization = useCallback(
    (org: Organization) => {
      store.organization = org;
      setOrganization(organization);
    },
    [organization, store]
  );

  const values = useMemo(
    () => ({
      currency,
      organization,
      donation,
      updateCurrency,
      updateOrganization,
      updateDonation: setDonation,
    }),
    [currency, donation, organization, updateCurrency, updateOrganization]
  );

  return <StoreProvider value={values}>{props.children}</StoreProvider>;
}

export { Store, useStore };
