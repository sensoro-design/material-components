import { theme as antTheme } from 'antd';
import * as batToken from '../token';

const genTheme = (): typeof antTheme => {
  if (typeof antTheme === 'undefined' || !antTheme) return batToken as any;
  return antTheme;
};

export const materialTheme = genTheme();
