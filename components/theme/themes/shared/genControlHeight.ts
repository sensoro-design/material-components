import type { HeightMapToken, SeedToken } from '../../interface';

export const genControlHeight = (token: SeedToken): HeightMapToken => {
  const { controlHeight } = token;

  return {
    controlHeightSM: controlHeight * 0.75,
    controlHeightXS: controlHeight * 0.5,
    controlHeightLG: controlHeight * 1.25,
  };
};
