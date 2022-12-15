/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/**
 * @CSP
 *
 * @BrowserCoverage
 *
 * @Reference
 *
 */

interface CSPAttributes {}

export class CSP {
  private _attributes: {};

  constructor(attrs: {}) {
    this._attributes = attrs;
  }

  public set attributes(attrs: {}) {}

  public get attributes() {
    return this._attributes;
  }

  public normalize() {}

  public apply() {}
}
