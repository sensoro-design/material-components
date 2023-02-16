import { useContext } from 'react';
import { useStyleRegister } from '@ant-design/cssinjs';
import { ConfigProvider as AntConfigProvider } from 'antd';
import { MaterialProvider } from '../ConfigContext';

import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { MaterialAliasToken } from '../types';

export function useStyle(
  componentName: string,
  styleFn: (token: MaterialAliasToken) => CSSInterpolation,
) {
  const {
    token = {} as MaterialAliasToken,
    hashId = '',
    theme
  } = useContext(MaterialProvider);
  const { getPrefixCls } = useContext(AntConfigProvider.ConfigContext);

  token.antCls = `.${getPrefixCls()}`;

  return {
    wrapSSR: useStyleRegister(
      {
        theme: theme!,
        token,
        hashId,
        path: [componentName],
      },
      () => styleFn(token as MaterialAliasToken),
    ),
    hashId,
  };
}
