import React, { createContext,  } from 'react';

export const defaultPrefixCls = 's';
export const defaultIconPrefixCls = `${defaultPrefixCls}-icon`;

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls;
};

export interface ConfigContextProps {
  iconPrefixCls: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

export const ConfigContext = createContext<ConfigContextProps>({
  // We provide a default function for Context without provider
  getPrefixCls: defaultGetPrefixCls,
  iconPrefixCls: defaultIconPrefixCls,
});

export const { Consumer: ConfigConsumer } = ConfigContext;
