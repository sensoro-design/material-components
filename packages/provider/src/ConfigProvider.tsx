import React, { useContext, useRef, } from 'react';
import { useCacheToken } from '@ant-design/cssinjs';
import { ConfigProvider as AntConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';

import { MaterialProvider } from './ConfigContext';
import { materialTheme } from './utils';

import type { DeepPartial, MaterialAliasToken } from './types';

const ConfigProviderContainer: React.FC<{
  children: React.ReactNode;
  autoClearCache?: boolean;
  token?: DeepPartial<MaterialAliasToken>;
  hashed?: boolean;
  dark?: boolean;
  prefixCls?: string;
}> = (props) => {
  const {
    children,
    dark,
    autoClearCache = false,
    token: propsToken,
    prefixCls,
  } = props;
  const { locale, getPrefixCls, ...restConfig } = useContext(AntConfigProvider.ConfigContext);

  const tokenContext = materialTheme.useToken?.();
  const containerDomRef = useRef<HTMLDivElement>(null);
  const materialProvider = useContext(MaterialProvider);
  const materialComponentsCls = prefixCls
    ? `.${prefixCls}`
    : `.${getPrefixCls()}-pro`;
  const antCls = '.' + getPrefixCls();
  const salt = `${materialComponentsCls}`;

  return (
    <div
      ref={containerDomRef}
    >

    </div>
  )
}

export const MaterialConfigProvider: React.FC<{
  children: React.ReactNode;
  autoClearCache?: boolean;
  token?: DeepPartial<MaterialAliasToken>;
  needDeps?: boolean;
  dark?: boolean;
  hashed?: boolean;
  prefixCls?: string;
}> = (props) => {
  const { needDeps, dark, token } = props;
  const materialProvider = useContext(MaterialProvider);

  const { locale, theme, ...rest } = useContext(AntConfigProvider.ConfigContext);

  // 是不是不需要渲染 provide
  const isNullProvide =
    needDeps &&
    materialProvider.hashId !== undefined &&
    Object.keys(props).sort().join('-') === 'children-needDeps';

  if (isNullProvide) return <>{props.children}</>;

  const mergeAlgorithm = () => {
    const isDark = dark ?? materialProvider.dark;

    if (isDark && !Array.isArray(theme?.algorithm)) {
      return [materialTheme.darkAlgorithm, theme?.algorithm].filter(Boolean);
    }

    if (isDark && Array.isArray(theme?.algorithm)) {
      return [materialTheme.darkAlgorithm, ...(theme?.algorithm || [])].filter(Boolean);
    }

    return theme?.algorithm;
  }

  // 自动注入 antd 的配置
  const configProvider = {
    ...rest,
    locale: locale || zh_CN,
    theme: {
      ...theme,
      algorithm: mergeAlgorithm(),
    },
  } as typeof theme;

  return (
    <AntConfigProvider {...configProvider}>
      {/* <ConfigProviderContainer {...props} token={token} /> */}
    </AntConfigProvider>
  );
}
