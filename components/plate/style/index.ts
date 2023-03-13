import { genComponentStyleHook, mergeToken } from '../../theme/internal';

import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle, } from '../../theme/internal';

export interface ComponentToken {}

interface PlateToken extends FullToken<'Plate'> {

}

const genSharedPlateStyle: GenerateStyle<PlateToken> = (token): CSSObject => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      borderRadius: 2,
      fontSize: 14,
      display: 'inline-block',
      color: '#fff',
      textAlign: 'center',
      height: 'max-content',
      padding: '0 8px',

      [`${componentCls}-border`]: {
        position: 'absolute',
        borderRadius: 2,
        top: 1,
        left: 1,
        bottom: 1,
        right: 1,
      },

      [`${componentCls}-dot`]: {
        position: 'absolute',
        width: 2,
        height: 2,
        borderRadius: '50%',
      },

      [`${componentCls}-l-t`]: {
        left: 4,
        top: 4,
      },

      [`${componentCls}-r-t`]: {
        right: 4,
        top: 4,
      },

      [`${componentCls}-l-b`]: {
        left: 4,
        bottom: 4,
      },

      [`${componentCls}-r-b`]: {
        right: 4,
        bottom: 4,
      },
    }
  }
}

// ============================== Export ==============================
export const useStyle = genComponentStyleHook('Plate', (token) => {
  const plateToken: PlateToken = mergeToken<PlateToken>(token, {});

  return [genSharedPlateStyle(plateToken)];
})
