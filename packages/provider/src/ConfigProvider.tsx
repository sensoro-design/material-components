import React, { useContext, useRef, useMemo, } from 'react';
import { useCacheToken } from '@ant-design/cssinjs';
import { ConfigProvider as AntConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';

import { MaterialConfigContext, MaterialConfigProvider } from './ConfigContext';
import { materialTheme } from './utils';
import { merge } from './utils/merge';

import type { DeepPartial, MaterialAliasToken } from './types';

const ConfigProviderContainer: React.FC<{
  children: React.ReactNode;
  token?: DeepPartial<MaterialAliasToken>;
  hashed?: boolean;
  dark?: boolean;
  prefixCls?: string;
}> = (props) => {
  const {
    children,
    dark,
    token: propsToken,
    prefixCls,
  } = props;
  const { locale, getPrefixCls, ...restConfig } = useContext(AntConfigProvider.ConfigContext);

  const tokenContext = materialTheme.useToken?.();
  const containerDomRef = useRef<HTMLDivElement>(null);
  const materialProvider = useContext(MaterialConfigContext);
  const materialComponentsCls = prefixCls
    ? `.${prefixCls}`
    : `.${getPrefixCls()}-pro`;
  const antCls = '.' + getPrefixCls();
  const salt = `${materialComponentsCls}`;

  const materialProvideValue = useMemo(() => {
    return {
      ...materialProvider,
      dark: dark ?? materialProvider.dark,
      token: merge(materialProvider.token, tokenContext.token, {
        materialComponentsCls,
        antCls,
        themeId: tokenContext.theme.id,
      }) as MaterialAliasToken,
    };
  }, [
    antCls,
  ])

  const finalToken = {
    ...(materialProvideValue.token || {}),
    materialComponentsCls,
  };

  const [token, nativeHashId] = useCacheToken<MaterialAliasToken>(
    tokenContext.theme,
    [tokenContext.token, finalToken ?? {}],
    {
      salt,
    },
  );

  const hashId = useMemo(() => {
    if (props.hashed === false) {
      return '';
    }
    if (materialProvider.hashed === false) return '';
    if (typeof process !== 'undefined' && process.env.NODE_ENV?.toLowerCase() !== 'test')
      return nativeHashId;
    return '';
  }, [nativeHashId, materialProvider.hashed, props.hashed]);

  const configProviderDom = useMemo(
    () => {
      const themeConfig = {
        ...restConfig.theme,
        hashId: hashId,
        hashed:
          typeof process !== 'undefined' &&
          process.env.NODE_ENV?.toLowerCase() !== 'test' &&
          props.hashed !== false &&
          materialProvider.hashed !== false,
      };

      const provide = (
        <AntConfigProvider {...restConfig} theme={{ ...themeConfig }}>
          <MaterialConfigProvider
            value={{
              ...materialProvideValue,
              token,
              containerDomRef,
              theme: tokenContext.theme,
              hashed: props.hashed,
              hashId,
            }}
          >
            <>
              {children}
            </>
          </MaterialConfigProvider>
        </AntConfigProvider>
      )

      return (
        <div
          ref={containerDomRef}
          className={`${prefixCls || getPrefixCls?.('pro') || 'ant-pro'}${
            hashId ? ' ' + hashId : ''
          }`}
        >
          {provide}
        </div>
      )
    },
    [
      children,
      getPrefixCls,
      hashId,
      token,
    ]
  )

  return configProviderDom;
}

export const MaterialProvider: React.FC<{
  children: React.ReactNode;
  autoClearCache?: boolean;
  token?: DeepPartial<MaterialAliasToken>;
  needDeps?: boolean;
  dark?: boolean;
  hashed?: boolean;
  prefixCls?: string;
}> = (props) => {
  const { needDeps, dark, token } = props;
  const materialProvider = useContext(MaterialConfigContext);

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
      <ConfigProviderContainer {...props} token={token} />
    </AntConfigProvider>
  );
}
