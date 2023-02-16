import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { GlobalToken } from 'antd/es/theme/interface';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type MaterialTokenType = {
};

export type GenerateStyle<
  ComponentToken extends object = GlobalToken,
  ReturnType = CSSInterpolation,
> = (token: ComponentToken) => ReturnType;

export type MaterialAliasToken =
  GlobalToken &
  MaterialTokenType &
{
  themeId: number;
  /**
   * 物料的 className
   * @type {string}
   * @example .lm
   */
  lmCls: string;
  /**
   * antd 的 className
   * @type {string}
   * @example .ant
   */
  antCls: string;
};
