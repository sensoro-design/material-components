import React, { useContext } from 'react';
import { classNames } from '@pansy/shared';
import { ConfigContext } from '../config-provider';
import { useStyle } from './style';

export interface PlateProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  borderColor?: string;
  text?: string;
}

export const Plate: React.FC<PlateProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    color = '#5591F2',
    borderColor = '#000',
    style,
    text
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('plate', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <div
      className={classNames(prefixCls, hashId, className)}
      style={{
        background: color,
        ...style
      }}
    >
      <div className={`${prefixCls}-border`} style={{ border: `1px solid ${borderColor}` }} />
      <div
        className={classNames(`${prefixCls}-dot`, `${prefixCls}-l-t`)}
        style={{ background: borderColor }}
      />
      <div
        className={classNames(`${prefixCls}-dot`, `${prefixCls}-r-t`)}
        style={{ background: borderColor }}
      />
      <div
        className={classNames(`${prefixCls}-dot`, `${prefixCls}-l-b`)}
        style={{ background: borderColor }}
      />
      <div
        className={classNames(`${prefixCls}-dot`, `${prefixCls}-r-b`)}
        style={{ background: borderColor }}
      />
      {text}
    </div>
  )
}
