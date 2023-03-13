import type { MapToken } from './maps';

export interface AliasToken extends MapToken {
  // Padding
  /**
   * @desc 内间距尺寸
   * @descEN Padding size
   */
  paddingXXS: number;
  /**
   * @desc 内间距尺寸
   * @descEN Padding size
   */
  paddingXS: number;
  /**
   * @desc 内间距尺寸
   * @descEN Padding size
   */
  paddingSM: number;
  /**
   * @desc 内间距尺寸
   * @descEN Padding size
   */
  padding: number;
  /**
   * @desc 内间距尺寸
   * @descEN Padding size
   */
  paddingMD: number;
  /**
   * @desc 内间距尺寸
   * @descEN Padding size
   */
  paddingLG: number;
  /**
   * @desc 内间距尺寸
   * @descEN Padding size
   */
  paddingXL: number;

  // Margin
  /**
   * @desc 外间距
   * @descEN Margin size.
   */
  marginXXS: number;
  /**
   * @desc 外间距
   * @descEN Margin size.
   */
  marginXS: number;
  /**
   * @desc 外间距
   * @descEN Margin size.
   */
  marginSM: number;
  /**
   * @desc 外间距
   * @descEN Margin size.
   */
  margin: number;
  /**
   * @desc 外间距
   * @descEN Margin size.
   */
  marginMD: number;
  /**
   * @desc 外间距
   * @descEN Margin size.
   */
  marginLG: number;
  /**
   * @desc 外间距
   * @descEN Margin size.
   */
  marginXL: number;
  /**
   * @desc 外间距
   * @descEN Margin size.
   */
  marginXXL: number;
}
