/**
 * @CSP
 *
 * @BrowserCoverage https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#browser_compatibility
 *
 * @CSPVersion CSP 1.0, CSP Level 2, CSP Level 3
 *
 * @Reference https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
 *
 */

import { KeyOf, ValueOf } from 'GlobalTypes';

const FETCH_DIRECTIVES = {
  defaultSrc: 'default-src',
  childSrc: 'child-src',
  connectSrc: 'connect-src',
  fontSrc: 'font-src',
  frameSrc: 'frame-src',
  imgSrc: 'img-src',
  manifestSrc: 'manifest-src',
  mediaSrc: 'media-src',
  objectSrc: 'object-src',
  prefetchSrc: 'prefetch-src',
  scriptSrc: 'script-src',
  scriptSrcElem: 'script-src-elem',
  scriptSrcAttr: 'script-src-attr',
  styleSrc: 'style-src',
  styleSrcElem: 'style-src-elem',
  styleSrcAttr: 'style-src-attr',
  workerSrc: 'worker-src',
};

/**
 * @Directives
 *
 */
const DOCUMENT_DIRECTIVES = {
  baseUri: 'base-uri',
};

const NAVIGATION_DIRECTIVES = {
  navigateTo: 'navigate-to',
  formAction: 'form-action',
};

const REPORTING_DIRECTIVES = {
  reportUri: 'report-uri',
  reportTo: 'report-to',
};

const OTHER_DIRECTIVES = {
  requireSriFor: 'require-sri-for',
  requireTrustedTypesFor: 'require-trusted-types-for',
  trustedTypes: 'trusted-types',
  upgradeInsecureRequests: 'upgrade-insecure-requests',
  blockAllMixedContent: 'block-all-mixed-content',
  pluginTypes: 'plugin-types',
  referrer: 'referrer',
};

const DIRECTIVES = Object.freeze({
  ...FETCH_DIRECTIVES,
  ...DOCUMENT_DIRECTIVES,
  ...NAVIGATION_DIRECTIVES,
  ...REPORTING_DIRECTIVES,
  ...OTHER_DIRECTIVES,
});

/**
 * @Values
 *
 * @OmittedValues nonce & hash-algorithm
 *
 */
const VALUES = Object.freeze({
  none: 'none',
  self: "'self';",
  unsafeEval: 'unsafe-eval',
  wasmUnsafeEval: 'wasm-unsafe-eval',
  unsafeHashes: 'unsafe-hashes',
  unsafeInline: 'unsafe-inline',
  strictDynamic: 'strict-dynamic',
  reportSample: 'report-sample',
});

export type CSPAttributes = Partial<Record<KeyOf<typeof DIRECTIVES>, ValueOf<typeof VALUES> | string>>;

class CSP {
  private _attributes: CSPAttributes;

  constructor(attrs: CSPAttributes) {
    this._attributes = attrs;
  }

  public set attributes(attrs: CSPAttributes) {
    this._attributes = attrs;
  }

  public get attributes() {
    return this._attributes;
  }

  private normalize() {
    const normalizedAttributes = Object.keys(this.attributes).reduce(
      (prevObj: Record<ValueOf<typeof DIRECTIVES>, ValueOf<typeof VALUES> | string>, currKey) => {
        prevObj[DIRECTIVES[currKey as KeyOf<typeof DIRECTIVES>]] = (
          this.attributes as unknown as Record<KeyOf<typeof DIRECTIVES>, ValueOf<typeof VALUES> | string>
        )[currKey as KeyOf<typeof DIRECTIVES>];

        return prevObj;
      },
      {}
    );

    return normalizedAttributes;
  }

  public apply() {
    const normalizedAttributes = this.normalize();

    console.log('APPLYING', normalizedAttributes);

    Object.entries(normalizedAttributes).forEach(([directive, value]) => {
      const metaElement = document.createElement('meta');

      metaElement.setAttribute('http-equiv', 'Content-Security-Policy');
      metaElement.setAttribute('content', `${directive} ${value}`);
      document.head.appendChild(metaElement);
    });
  }
}

export { CSP, DIRECTIVES, VALUES };
