import 'colors';

import { __DEV__, throwError } from 'utils';

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
 * @count
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

export class ClientDb {
  private CLIENT_DB!: IDBOpenDBRequest;

  private constraint(callee: Function) {
    if (!this.CLIENT_DB.result) {
      throwError(
        'ClientDBReferenceError',
        'You must create a database using the ```ClientDB``` instance to process',
        callee
      );
    }
  }

  /**
   * @initialize
   *
   */
  public initialize(dbName: string): Promise<IDBDatabase> {
    ///
    this.CLIENT_DB = window.indexedDB.open(dbName, 4);

    ///
    this.CLIENT_DB.onsuccess = (ev) => {
      if (__DEV__) {
        console.log(`SUCCESSFULLY OPENED ${dbName.blue} DATABASE`.green);
        console.log(JSON.stringify(ev));
      }
    };

    ///
    this.CLIENT_DB.onerror = (ev) => {
      if (__DEV__) {
        console.log(`FAILED TO OPEN ${dbName.white} DATABASE`.red);
        console.log(JSON.stringify(ev));
      }
    };

    ///
    return new Promise((resolve, reject) => {
      if (this.CLIENT_DB.onsuccess) resolve(this.CLIENT_DB.result);
      else reject(this.CLIENT_DB.result);
    });
  }

  /**
   * @create
   *
   */
  public create<Response = any>(): Promise<Error | Response> {
    this.constraint(this.create);

    return new Promise((resolve, reject) => {
      console.log(resolve, reject);
    });
  }

  /**
   * @read
   *
   * @queries
   *
   */
  public read<Response = any>(): Promise<Error | Response> {
    this.constraint(this.read);

    return new Promise((resolve, reject) => {
      console.log(resolve, reject);
    });
  }

  /**
   * @update
   *
   */
  public update<Response = any>(): Promise<Error | Response> {
    this.constraint(this.update);

    return new Promise((resolve, reject) => {
      console.log(resolve, reject);
    });
  }

  /**
   * @delete
   *
   */
  public delete<Response = any>(): Promise<Error | Response> {
    this.constraint(this.delete);

    return new Promise((resolve, reject) => {
      console.log(resolve, reject);
    });
  }

  /**
   * @count
   *
   * @queries - for different database queries or columns queries
   *
   */
  public count<Response = any>(): Promise<Error | Response> {
    this.constraint(this.count);

    return new Promise((resolve, reject) => {
      console.log(resolve, reject);
    });
  }

  public get dbInfo() {
    return this.CLIENT_DB.result;
  }
}
