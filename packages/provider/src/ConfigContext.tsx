import { createContext } from 'react';
import { emptyTheme, defaultToken } from './token';

import type { Theme } from '@ant-design/cssinjs';
import type { MaterialAliasToken } from './types';

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `lm-${suffixCls}` : 'lm';
};

/**
 * 自带的token 配置
 */
export type ConfigContextPropsType = {
  token?: MaterialAliasToken;
  hashId?: string;
  hashed?: boolean;
  dark?: boolean;
  theme?: Theme<any, any>;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  containerDomRef?: React.RefObject<HTMLDivElement>;
};

const ConfigContext = createContext<ConfigContextPropsType>({
  theme: emptyTheme,
  hashed: true,
  dark: false,
  token: defaultToken,
  getPrefixCls: defaultGetPrefixCls,
});

export const MaterialProvider = ConfigContext;
export const { Consumer: ConfigConsumer } = ConfigContext;
