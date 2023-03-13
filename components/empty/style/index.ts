import { genComponentStyleHook, mergeToken } from '../../theme/internal';

import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle, } from '../../theme/internal';

export interface ComponentToken {}

interface EmptyToken extends FullToken<'Empty'> {
  emptyImgCls: string;
  emptyImgHeight: number;
  emptyImgHeightSM: number;
  emptyImgHeightMD: number;
}

const genSharedEmptyStyle: GenerateStyle<EmptyToken> = (token): CSSObject => {
  console.log(token);
  const { componentCls, fontSize, lineHeight, marginXS, margin, opacityImage,  } = token;

  return {
    [componentCls]: {
      marginInline: marginXS,
      fontSize,
      lineHeight,
      textAlign: 'center',

      [`${componentCls}-image`]: {
        height: token.emptyImgHeight,
        marginBottom: marginXS,
        opacity: opacityImage,

        img: {
          height: '100%',
        },

        svg: {
          height: '100%',
          margin: 'auto',
        },
      },

      [`${componentCls}-icon`]: {
        fontSize: 88,
        marginBottom: marginXS,
        lineHeight: 1,
      },

      [`${componentCls}-description`]: {
        color: token.colorTextTertiary,
      },

      [`${componentCls}-footer`]: {
        marginTop: margin,
      },
    }
  }
}

// ============================== Export ==============================
export const useStyle = genComponentStyleHook('Empty', (token) => {
  const { componentCls, controlHeightLG } = token;

  const emptyToken: EmptyToken = mergeToken<EmptyToken>(token, {
    emptyImgCls: `${componentCls}-img`,
    emptyImgHeight: controlHeightLG * 2.5,
    emptyImgHeightMD: controlHeightLG,
    emptyImgHeightSM: controlHeightLG * 0.875,
  });

  return [genSharedEmptyStyle(emptyToken)];
})
