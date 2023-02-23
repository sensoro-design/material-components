import { createTheme } from '@ant-design/cssinjs';
import { theme } from 'antd';

import { hashCode } from './utils/hashCode';

import type { GlobalToken } from 'antd/es/theme/interface';
import type { MaterialAliasToken } from './types';

export const defaultToken: MaterialAliasToken = {
  blue: '#1677ff',
  purple: '#722ED1',
  cyan: '#13C2C2',
  _tokenKey: '19w80ff',
  _hashId: 'css-dev-only-do-not-override-i2zu9q',
} as MaterialAliasToken;

export const emptyTheme = createTheme((token) => token);

export const token = {
  theme: emptyTheme,
  token: {
    ...defaultToken,
    ...(theme?.defaultAlgorithm?.(theme?.defaultSeed)),
  },
  hashId: `lm-${hashCode(JSON.stringify(defaultToken))}`,
}

export const useToken = () => token;

export const darkAlgorithm = () =>
  ({
    ...defaultToken,
    ...(theme?.defaultAlgorithm?.(theme?.defaultSeed) as any),
  } as GlobalToken);

export const defaultAlgorithm = () =>
  ({
    ...defaultToken,
    ...(theme?.defaultAlgorithm?.(theme?.defaultSeed) as any),
  } as GlobalToken);

export const compactAlgorithm = () =>
  ({
    ...defaultToken,
    ...(theme?.defaultAlgorithm?.(theme?.defaultSeed) as any),
  } as GlobalToken);
