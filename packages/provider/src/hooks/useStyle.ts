import { useContext } from 'react';
import { useStyleRegister } from '@ant-design/cssinjs';
import { ConfigProvider as AntConfigProvider } from 'antd';
import { MaterialConfigContext } from '../ConfigContext';

import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { MaterialAliasToken } from '../types';

/**
 * 封装 antd 的 useStyle，支持 antd@4
 * @param componentName {string} 组件名称
 * @param styleFn {GenerateStyle} 生成样式的函数
 * @returns UseStyleResult
 */
export function useStyle(
  componentName: string,
  styleFn: (token: MaterialAliasToken) => CSSInterpolation,
) {
  const {
    token = {} as MaterialAliasToken,
    hashId = '',
    theme,
    getPrefixCls
  } = useContext(MaterialConfigContext);
  const { getPrefixCls: getAntPrefixCls } = useContext(AntConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();

  token.antCls = `.${getAntPrefixCls()}`;

  return {
    wrapSSR: useStyleRegister(
      {
        theme: theme!,
        token,
        hashId,
        path: [componentName, rootPrefixCls],
      },
      () => styleFn(token as MaterialAliasToken),
    ),
    hashId,
  };
}
