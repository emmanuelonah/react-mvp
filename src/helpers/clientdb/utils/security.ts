import { __HTTPS__ } from 'utils';

const SECURED_ENV = {
  encrypt() {},
  decrypt() {},
};

const UNSECURED_ENV = {
  encrypt() {},
  decrypt() {},
};

function encrypt() {
  if (__HTTPS__) SECURED_ENV.encrypt();
  else UNSECURED_ENV.encrypt();
}

function decrypt() {
  if (__HTTPS__) SECURED_ENV.decrypt();
  else UNSECURED_ENV.decrypt();
}

export { SECURED_ENV, UNSECURED_ENV, encrypt, decrypt };
