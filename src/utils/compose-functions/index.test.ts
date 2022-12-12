import { composeFunctions } from '.';

describe('composeFunctions', () => {
  const argument = {
    env: '__TEST__',
    testTool: 'jest',
    uiFramework: 'react',
    engineer: 'Emmanuel Onah',
  };

  it('should confirm that each functions gets executed with the appropriate arguments', () => {
    const fnc1 = (argRef: typeof argument) => expect(argRef).toEqual(argument);
    const fnc2 = (argRef: typeof argument) => expect(argRef).toEqual(argument);
    const fnc3 = (argRef: typeof argument) => expect(argRef).toEqual(argument);
    const fnc4 = (argRef: typeof argument) => expect(argRef).toEqual(argument);

    const applyComposedFunction = composeFunctions(fnc1, fnc2, fnc3, fnc4);
    applyComposedFunction(argument);
  });
});
