import type { GenerateStyle } from '../../theme/internal';
import type { SpaceToken } from '.';

export const genSpaceCompactStyle: GenerateStyle<SpaceToken> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'inline-flex',

      '&-block': {
        display: 'flex',
        width: '100%',
      },

      '&-vertical': {
        flexDirection: 'column',
      },
    },
  };
};
