import { useState } from 'react';

const isBrowser = typeof window !== 'undefined';

interface CookieOptions {
  days?: number;
  path?: string;
  domain?: string;
  SameSite?: 'None' | 'Lax' | 'Strict';
  Secure?: boolean;
  HttpOnly?: boolean;
}

function stringifyOptions(options: any) {
  return Object.keys(options).reduce((acc, key) => {
    if (key === 'days') {
      return acc;
    }

    if (options[key] === false) {
      return acc;
    }

    if (options[key] === true) {
      return `${acc}; ${key}`;
    }

    return `${acc}; ${key}=${options[key]}`;
  }, '');
}

const setCookie = (name: string, value: string, options?: CookieOptions) => {
  if (!isBrowser) return;

  const optionsWithDefaults = {
    days: 7,
    path: '/',
    ...options,
  };

  const expires = new Date(Date.now() + optionsWithDefaults.days * 864e5).toUTCString();

  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}${stringifyOptions(optionsWithDefaults)}`;
};

const getCookie = (name: string, initialValue = '') => {
  if (!isBrowser) return initialValue;

  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((c) => c.split('=')[0] === name);

  if (cookie) {
    return decodeURIComponent(cookie.split('=')[1]);
  }

  return initialValue;
};

// eslint-disable-next-line func-names
export default function (key: string, initialValue?: string) {
  const [item, setItem] = useState(() => getCookie(key, initialValue));

  const updateItem = (value: string, options: CookieOptions) => {
    setItem(value);
    setCookie(key, value, options);
  };

  return [item, updateItem] as const;
}

export { setCookie, getCookie, stringifyOptions };
