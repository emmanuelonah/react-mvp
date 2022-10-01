/* eslint-disable no-unused-vars */
export function composeFunctions(...fns: ((...args: any[]) => any)[]) {
  return function applyComposedFunction(...args: any[]) {
    return fns.forEach((fn: (...args: any[]) => any) => fn(...args));
  };
}
