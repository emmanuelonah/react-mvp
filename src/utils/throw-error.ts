export function throwError(name: string, message: string, constructor: Function, options?: Record<string, any>) {
  const _error = new Error() as Error & Record<string, any>;
  _error.name = name.concat(' 🚨');
  _error.message = message;
  Error.captureStackTrace(_error, constructor);

  if (options) {
    Object.keys(options).forEach((key) => {
      if (options.hasOwnProperty(key)) {
        _error[key] = options[key];
      }
    });
  }

  throw _error;
}
