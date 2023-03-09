import type { CSSObject } from '@ant-design/cssinjs';

export const genCommonStyle = (token: any, componentPrefixCls: string): CSSObject => {
  const { fontFamily, fontSize } = token;

  const rootPrefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;

  return {
    [rootPrefixSelector]: {
      fontFamily,
      fontSize,
      boxSizing: 'border-box',

      '&::before, &::after': {
        boxSizing: 'border-box',
      },

      [rootPrefixSelector]: {
        boxSizing: 'border-box',

        '&::before, &::after': {
          boxSizing: 'border-box',
        },
      },
    },
  };
}
