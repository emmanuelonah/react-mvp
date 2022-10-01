/* eslint-disable no-unused-vars */
import React from 'react';

type CustomEvent = any | React.SyntheticEvent | Event;

export function composeEvents(ourEvent: (event: CustomEvent) => void, theirEvent?: (event: CustomEvent) => void) {
  return function enclosedEventHandler(event: CustomEvent) {
    if (!event.defaultPrevented) ourEvent(event);

    theirEvent?.(event);
  };
}
