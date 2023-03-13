export interface StyleMapToken {
  /**
   * @nameZH 线宽
   * @nameEN Line Width
   * @desc 描边类组件的默认线宽，如 Button、Input、Select 等输入类控件。
   * @descEN The default line width of the outline class components, such as Button, Input, Select, etc.
   * @default 1
   */
  lineWidthBold: number;

  /**
   * @name Small 圆角
   * @desc Small 号圆角，用于组件中的一些小圆角，如 Segmented 、Arrow 等一些内部圆角的组件样式中。
   * @default 2
   */
  borderRadiusSmall: number;
  /**
   * @name Large 圆角
   * @desc Large 号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角
   * @default 4
   */
  borderRadiusLarge: number;
  /**
   * @nameZH LG号圆角
   * @nameEN LG Border Radius
   * @desc LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。
   * @descEN LG size border radius, used in some large border radius components, such as Card, Modal and other components.
   * @default 20
   */
  borderRadiusRound: number;
}
