import { Dollar } from 'assets';

export interface Currency {
  name: string;
  symbol: typeof Dollar;
}

export interface Organization {
  name: string;
  email: string;
  phone: string;
  address: string;
  bank: {
    name: string;
    iban: string;
    bic: string;
  };
}

export interface Donation {
  sender: {
    name: string;
    email: string;
    phone: string;
  };
  project?: string;
  message: string;
  amount: string | number;
}

export class Store {
  private _currency: Currency = {
    name: 'dollar',
    symbol: Dollar,
  };

  private _organization: Organization = {
    name: 'ReactMVP',
    email: 'info@reactmvp.com',
    phone: '(49) 111111111',
    address: 'sample 46, 1111, Berlin Germany',
    bank: {
      name: 'ReactMVP',
      iban: 'FAKE1111111111111',
      bic: 'FAKE1283',
    },
  };

  public set currency(curr: Currency) {
    this._currency = curr;
  }

  public get currency() {
    return this._currency;
  }

  public set organization(org: Organization) {
    this._organization = org;
  }

  public get organization() {
    return this._organization;
  }
}
