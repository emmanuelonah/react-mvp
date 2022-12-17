const __TEST__ = process.env.NODE_ENV === 'test';
const __DEV__ = process.env.NODE_ENV === 'development';
const __PROD__ = process.env.NODE_ENV === 'production';
const __HTTPS__ = globalThis.location.protocol === 'https:';
const __HTTP__ = globalThis.location.protocol !== 'https:';

export { __TEST__, __DEV__, __PROD__, __HTTPS__, __HTTP__ };
