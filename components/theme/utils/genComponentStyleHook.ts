import { useContext } from 'react';
import { useStyleRegister } from '@ant-design/cssinjs';
import { ConfigContext } from '../../config-provider/ConfigContext';
import { genCommonStyle, } from '../../style';
import { useToken, mergeToken, statisticToken } from '../internal';

import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { ComponentTokenMap, GlobalToken, } from '../interface';
import type { UseComponentStyleResult } from '../internal';

export type OverrideTokenWithoutDerivative = ComponentTokenMap;
export type OverrideComponent = keyof OverrideTokenWithoutDerivative;

export type GlobalTokenWithComponent<ComponentName extends OverrideComponent> = GlobalToken &
  ComponentTokenMap[ComponentName];

export type TokenWithCommonCls<T> = T & {
  /** Wrap component class with `.` prefix */
  componentCls: string;
  /** Origin prefix which do not have `.` prefix */
  prefixCls: string;
  /** Wrap icon class with `.` prefix */
  iconCls: string;
  /** Wrap ant prefixCls class with `.` prefix */
  senCls: string;
};

export interface StyleInfo<ComponentName extends OverrideComponent> {
  hashId: string;
  prefixCls: string;
  rootPrefixCls: string;
  iconPrefixCls: string;
  overrideComponentToken: ComponentTokenMap[ComponentName];
}

export type FullToken<ComponentName extends OverrideComponent> = TokenWithCommonCls<
  GlobalTokenWithComponent<ComponentName>
>;

export function genComponentStyleHook<ComponentName extends OverrideComponent>(
  component: ComponentName,
  styleFn: (token: FullToken<ComponentName>, info: StyleInfo<ComponentName>) => CSSInterpolation,
  getDefaultToken?:
    | OverrideTokenWithoutDerivative[ComponentName]
    | ((token: GlobalToken) => OverrideTokenWithoutDerivative[ComponentName]),
) {
  return (prefixCls: string) => {
    const [theme, token, hashId] = useToken();
    const { getPrefixCls, iconPrefixCls } = useContext(ConfigContext);
    const rootPrefixCls = getPrefixCls();

    return [
      useStyleRegister(
        { theme, token, hashId, path: [component, prefixCls, iconPrefixCls] },
        () => {
          const { token: proxyToken, flush } = statisticToken(token);

          const defaultComponentToken = typeof getDefaultToken === 'function'
            ? getDefaultToken(proxyToken)
            : getDefaultToken;
          const mergedComponentToken = { ...defaultComponentToken, ...token[component] };

          const componentCls = `.${prefixCls}`;
          const mergedToken = mergeToken<
            TokenWithCommonCls<GlobalTokenWithComponent<OverrideComponent>>
          >(
            proxyToken,
            {
              componentCls,
              prefixCls,
              iconCls: `.${iconPrefixCls}`,
              senCls: `.${rootPrefixCls}`,
            },
            mergedComponentToken,
          );

          const styleInterpolation = styleFn(mergedToken as unknown as FullToken<ComponentName>, {
            hashId,
            prefixCls,
            rootPrefixCls,
            iconPrefixCls,
            overrideComponentToken: token[component],
          });
          flush(component, mergedComponentToken);

          return [styleInterpolation];
        }
      ),
      hashId,
    ]
  }
}
