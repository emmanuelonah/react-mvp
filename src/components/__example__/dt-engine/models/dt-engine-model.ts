import * as React from 'react';

type DesignTokens = Record<string, Record<string, string>>;

type Format = 'css' | 'xml' | 'yaml' | 'json';

export const DT_ENGINE = Object.freeze({
  _designTokens: {},

  set designTokens(dT: DesignTokens) {
    this._designTokens = dT;
  },

  get designTokens() {
    return this._designTokens;
  },

  /**
   * @CssUtils
   *
   */
  transformToCss() {},
  renderCss(css: React.CSSProperties) {
    console.log('GBA', css);
  },

  /**
   * @format
   *
   */
  format(to: Format) {
    switch (to) {
      case 'css': {
        const value = {};

        return value as React.CSSProperties;
      }
      default:
        return this._designTokens;
    }
  },
  /**
   * @apply
   *
   */
  render(fileType: Format) {
    switch (fileType) {
      case 'css':
        this.renderCss(this.format(fileType));
        break;

      default:
        break;
    }
  },
});
