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
  const { componentCls } = token;

  return {
    [componentCls]: {
      background: 'red',
    }
  }
}

// ============================== Export ==============================
export const useStyle = genComponentStyleHook('Empty', (token) => {
  const emptyToken: EmptyToken = mergeToken<EmptyToken>(token, {});

  return [genSharedEmptyStyle(emptyToken)];
})
