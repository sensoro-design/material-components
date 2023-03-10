import { genComponentStyleHook, mergeToken } from '../../theme/internal';

import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

export interface ButtonToken extends FullToken<'Button'> {
  buttonPaddingHorizontal: number;
}

// ============================== Export ==============================
export const useStyle = genComponentStyleHook('Button', () => {
  return [

  ];
});
