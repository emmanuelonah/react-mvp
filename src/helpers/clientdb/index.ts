/**
 * @clientDb
 *
 * @clientDbSecurity
 *
 * @methods - clientDb methods:
 *
 * @initialize
 *
 * @create
 *
 * @read
 *
 * @update
 *
 * @delete
 *
 * @version - we use IndexDB version 4
 *
 * @note - this is not meant to replace you server DBs as the data are only stored on user's computer
 * for operations that do not require environmental persistency. Also, storage capacity are limited
 * to available 50% of the hard-disk/local-disk free storage which then follows the LRU policies which might
 * cause your origin to be evicted. So the reliability of your database presence is not guaranteed.
 * But there is a storage API ```StorageManager.persist()```that i will expose in this helper class
 * that will place our database in a permanent location which will be lastly freed incase of QuotaException
 *
 * @important this operation is asynchronous and the storage space on you hard-disk memory available to
 * this is 50% in some browsers and 60% on other browser of the hard-disk and this why this Storage SubClass
 * leverages over the others like LocalStorage which is synchronous and a fixed storage space of 5mb
 *
 * @reference -
 *  https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria
 *
 */

import 'colors';

import { __DEV__, throwError } from 'utils';
import { ClientDbError, ERROR_CODES, DEFAULT_ERROR_MESSAGES } from './services/clientdb-error';

interface CustomTarget extends EventTarget {
  result: IDBRequest;
}

interface CustomEvent extends Omit<IDBVersionChangeEvent, 'target'> {
  target: CustomTarget;
}

export class ClientDb {
  private _CLIENT_DB_REQUEST!: IDBOpenDBRequest;

  private constraint(callee: Function) {
    if (!this._CLIENT_DB_REQUEST.result) {
      throwError(
        'ClientDBReferenceError',
        'You must initialized a database using the ```ClientDB``` instance to process',
        callee
      );
    }
  }

  private onSuccess(arg: {
    ev: CustomEvent;
    loggerText: string;
    resolve: (value: IDBDatabase | PromiseLike<IDBDatabase>) => void;
  }) {
    if (__DEV__) {
      console.log(arg.loggerText);
      console.log(JSON.stringify(arg.ev));
    }

    arg.resolve(this._CLIENT_DB_REQUEST.result);
  }

  private onError(arg: { ev: CustomEvent; loggerText: string; reject: (reason?: any) => void; error: ClientDbError }) {
    if (__DEV__) {
      console.log(arg.loggerText);
      console.log(JSON.stringify(arg.ev));
    }

    arg.reject(arg.error);
  }

  public initialize(dbName: string): Promise<IDBDatabase> {
    this._CLIENT_DB_REQUEST = window.indexedDB.open(dbName, 4);

    return new Promise((resolve, reject) => {
      this._CLIENT_DB_REQUEST.onupgradeneeded = (ev) => {
        const db = (ev.target as CustomTarget).result;

        db.onsuccess = (ev) =>
          this.onSuccess({
            ev: ev as CustomEvent,
            resolve,
            loggerText: `SUCCESSFULLY UPGRADED ${dbName} DATABASE`,
          });

        db.onerror = (ev) =>
          this.onError({
            ev: ev as CustomEvent,
            reject,
            loggerText: `FAILED TO UPGRADE ${dbName} DATABASE`,
            error: new ClientDbError(
              DEFAULT_ERROR_MESSAGES.DATABASE_UPGRADE_ERROR,
              404,
              ERROR_CODES.DATABASE_UPGRADE_ERROR
            ),
          });
      };
      this._CLIENT_DB_REQUEST.onsuccess = (ev) =>
        this.onSuccess({
          ev: ev as CustomEvent,
          resolve,
          loggerText: `SUCCESSFULLY OPENED ${dbName} DATABASE`,
        });
      this._CLIENT_DB_REQUEST.onerror = (ev) =>
        this.onError({
          ev: ev as CustomEvent,
          reject,
          loggerText: `FAILED TO OPEN ${dbName} DATABASE`,
          error: new ClientDbError(
            DEFAULT_ERROR_MESSAGES.DATABASE_CONNECTION_ERROR,
            503,
            ERROR_CODES.DATABASE_CONNECTION_ERROR
          ),
        });
    });
  }

  public create<Response = any>(): Promise<ClientDbError | Response> {
    this.constraint(this.create);

    return new Promise((resolve, reject) => {
      console.log(resolve, reject);
    });
  }

  public read<Response = any>(): Promise<ClientDbError | Response> {
    this.constraint(this.read);

    return new Promise((resolve, reject) => {
      console.log(resolve, reject);
    });
  }

  public update<Response = any>(): Promise<ClientDbError | Response> {
    this.constraint(this.update);

    return new Promise((resolve, reject) => {
      console.log(resolve, reject);
    });
  }

  public delete<Response = any>(): Promise<ClientDbError | Response> {
    this.constraint(this.delete);

    return new Promise((resolve, reject) => {
      console.log(resolve, reject);
    });
  }

  public get dbInfo() {
    return this._CLIENT_DB_REQUEST.result;
  }
}
