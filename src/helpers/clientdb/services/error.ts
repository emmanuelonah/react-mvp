/* eslint-disable max-len */
import { ValueOf } from 'GlobalTypes';

const ERROR_CODES = Object.freeze({
  DATABASE_INITIALIZATION_ERROR: 'DATABASE_INITIALIZATION_ERROR',
  DATABASE_CONNECTION_ERROR: 'DATABASE_CONNECTION',
  DATABASE_UPGRADE_ERROR: 'DATABASE_UPGRADE_ERROR',
  RESOURCE_CREATION_ERROR: 'RESOURCE_CREATION_ERROR',
  RESOURCE_READ_ERROR: 'RESOURCE_READ_ERROR',
  RESOURCE_UPDATE_ERROR: 'RESOURCE_UPDATE_ERROR',
  RESOURCE_DELETE_ERROR: 'RESOURCE_DELETE_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  RANGE_ERROR: 'RANGE_ERROR',
});

/**
 * @note - because this is a developer facade error, we don't need to apply emotions to the message
 *
 */
const DEFAULT_ERROR_MESSAGES = Object.freeze({
  DATABASE_INITIALIZATION_ERROR: 'You must initialize the database to proceed with other operations.',
  DATABASE_CONNECTION_ERROR:
    'There was an error connecting to the Database kindly terminate your program and rerun, Also remember to read the "error stack trace".',
  DATABASE_UPGRADE_ERROR:
    'There was an error upgrading the Database kindly terminate your program and rerun. Also remember to read the "error stack trace".',
  RESOURCE_CREATION_ERROR:
    'There was an error creating a resources in the Database kindly terminate your program and rerun. Also remember to read the "error stack trace".',
  RESOURCE_READ_ERROR:
    'There was an error reading a resource in the Database kindly terminate your program and rerun. Also remember to read the "error stack trace".',
  RESOURCE_UPDATE_ERROR:
    'There was an error updating a resource in the Database kindly terminate your program and rerun. Also remember to read the "error stack trace".',
  RESOURCE_DELETE_ERROR:
    'There was an error deleting a resource in the Database kindly terminate your program and rerun. Also remember to read the "error stack trace".',
  TIMEOUT_ERROR: 'There was a timeout error in other words, the time for this operation is exceeded.',
  RANGE_ERROR: 'There was a range error in other words, the memory availability for this expression is exceeded.',
});

class ClientDbException extends Error {
  code: ValueOf<typeof ERROR_CODES>;

  statusCode: number;

  constructor(message: string, statusCode: number, code: ValueOf<typeof ERROR_CODES>) {
    super(message);

    this.statusCode = statusCode;

    this.code = code;
  }
}

export { ClientDbException, ERROR_CODES, DEFAULT_ERROR_MESSAGES };
