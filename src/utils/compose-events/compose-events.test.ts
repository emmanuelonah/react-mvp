import { composeEvents } from '..';

describe('composeEvents', () => {
  const mockedEvent = { name: 'testEvent', value: 'testValue', triggeredPerson: 'Emmanuel Onah' };

  it('should confirm that eventHandlers gets the rightful events', () => {
    const eventHandler1 = (event: typeof mockedEvent) => expect(event).toEqual(mockedEvent);
    const eventHandler2 = (event: typeof mockedEvent) => expect(event).toEqual(mockedEvent);
    const composedEventHandler = composeEvents(eventHandler1, eventHandler2);

    composedEventHandler(mockedEvent);
  });
});
