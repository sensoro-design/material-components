import React, { useContext } from 'react';
import { ConfigContext } from '../config-provider';

import type { SizeType } from '../config-provider/SizeContext';

export interface SpaceCompactProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  size?: SizeType;
  direction?: 'horizontal' | 'vertical';
  block?: boolean;
  rootClassName?: string;
}

export const Compact: React.FC<SpaceCompactProps> = (props) => {
  const { getPrefixCls, direction: directionConfig } = useContext(ConfigContext);
  const {
    size = 'middle',
    direction,
    block,
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    ...restProps
  } = props;
  const prefixCls = getPrefixCls('space-compact', customizePrefixCls);

  return null;
}
