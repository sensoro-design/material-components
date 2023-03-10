import React, { useContext, createContext, useMemo, } from 'react';
import { classNames, isArray, } from '@pansy/shared';
import { toArray } from '@pansy/shared/react';
import { ConfigContext } from '../config-provider';
import { Item } from './Item';
import { Compact } from './Compact';
import { useFlexGapSupport } from '../_utils/hooks/useFlexGapSupport';
import type { SizeType } from '../config-provider/SizeContext';
import { useStyle } from './style';

export type SpaceSize = SizeType | number;
export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * 间距大小
   * @default 'small'
   */
  size?: SpaceSize | [SpaceSize, SpaceSize];
  /**
   * 间距方向
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  // No `stretch` since many components do not support that.
  /**
   * 对齐方式
   */
  align?: 'start' | 'end' | 'center' | 'baseline';
  /**
   * 设置拆分
   */
  split?: React.ReactNode;
  /**
   * 是否自动换行，仅在 horizontal 时有效
   * @default false
   */
  wrap?: boolean;
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

function getNumberSize(size: SpaceSize) {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}

export const SpaceContext = createContext({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0,
  supportFlexGap: false,
});

const InternalSpace: React.FC<SpaceProps> = (props) => {
  const { getPrefixCls, space, direction: contextDirection } = useContext(ConfigContext);

  const {
    prefixCls: customizePrefixCls,
    className,
    direction = 'horizontal',
    size = space?.size || 'small',
    align,
    split,
    style,
    children,
    wrap = false,
    ...otherProps
  } = props;

  const prefixCls = getPrefixCls('space', customizePrefixCls);
  const supportFlexGap = useFlexGapSupport();
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;
  const [horizontalSize, verticalSize] = useMemo(() => {
    return (isArray(size) ? size : [size, size] as [SpaceSize, SpaceSize])
      .map(item => getNumberSize(item));
  }, [size]);

  const classes = classNames(
    prefixCls,
    hashId,
    `${prefixCls}-${direction}`,
    {
      [`${prefixCls}-rtl`]: contextDirection === 'rtl',
      [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
    },
    className,
  );
  const itemClassName = `${prefixCls}-item`;
  const marginDirection = contextDirection === 'rtl' ? 'marginLeft' : 'marginRight';

  const childNodes = toArray(children, { keepEmpty: true });

  // Calculate latest one
  let latestIndex = 0;
  const nodes = childNodes.map((child, i) => {
    if (child !== null && child !== undefined) {
      latestIndex = i;
    }

    const key = (child && child.key) || `${itemClassName}-${i}`;

    return (
      <Item
        className={itemClassName}
        key={key}
        direction={direction}
        index={i}
        marginDirection={marginDirection}
        split={split}
        wrap={wrap}
      >
        {child}
      </Item>
    );
  });

  const spaceContext = useMemo(
    () => ({ horizontalSize, verticalSize, latestIndex, supportFlexGap }),
    [horizontalSize, verticalSize, latestIndex, supportFlexGap],
  );

  // =========================== Render ===========================
  if (childNodes.length === 0) {
    return null;
  }

  const gapStyle: React.CSSProperties = {};

  if (wrap) {
    gapStyle.flexWrap = 'wrap';

    // Patch for gap not support
    if (!supportFlexGap) {
      gapStyle.marginBottom = -verticalSize;
    }
  }

  if (supportFlexGap) {
    gapStyle.columnGap = horizontalSize;
    gapStyle.rowGap = verticalSize;
  }


  return wrapSSR(
    <div
      className={classes}
      style={{
        ...gapStyle,
        ...style,
      }}
      {...otherProps}
    >
      <SpaceContext.Provider value={spaceContext}>
        {nodes}
      </SpaceContext.Provider>
    </div>
  )
}

type CompoundedComponent = React.FC<SpaceProps> & {
  Compact: typeof Compact;
};

const Space = InternalSpace as CompoundedComponent;

Space.Compact = Compact;

export { Space };
