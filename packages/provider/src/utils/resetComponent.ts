import type { CSSObject } from '@ant-design/cssinjs';
import type { MaterialAliasToken } from '../types';

export const resetComponent = (token: MaterialAliasToken): CSSObject => ({
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  color: token.colorText,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  listStyle: 'none',
});
