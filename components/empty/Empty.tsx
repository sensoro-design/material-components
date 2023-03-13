import React, { useContext } from 'react';
import { classNames } from '@pansy/shared';
import NoDataPurely from '@sensoro-design/icons/NoDataPurely';
import { ConfigContext } from '../config-provider';
import { useLocale } from '../locale/useLocale';
import { useStyle } from './style';

const defaultEmptyIcon = <NoDataPurely />;

export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * 设置显示图标
   */
  icon?: React.ReactNode;
  /**
   * 设置显示图片，优先级高于 icon
   */
  image?: React.ReactNode;
  /**
   * 自定义描述内容
   */
  description?: React.ReactNode;
  /**
   * 图片样式
   */
  imageStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface EmptyLocale {
  description: string;
}

export const Empty: React.FC<EmptyProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    image,
    icon = defaultEmptyIcon,
    imageStyle,
    className,
    children,
    description,
    ...restProps
  } = props;
  const { getPrefixCls, direction, } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('empty', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [locale] = useLocale('Empty');

  let iconNode: React.ReactNode = icon;
  let imageNode: React.ReactNode = null;
  const des = typeof description !== 'undefined' ? description : locale?.description;
  const alt = typeof des === 'string' ? des : 'empty';

  if (typeof image === 'string' && image) {
    iconNode = null
    imageNode = <img alt={alt} src={image} />;
  }

  return wrapSSR(
    <div
      className={classNames(
        hashId,
        prefixCls,
        {
          // [`${prefixCls}-normal`]: image === simpleEmptyImg,
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        className,
      )}
      {...restProps}
    >
      {iconNode && (
        <div className={`${prefixCls}-icon`}>
          {iconNode}
        </div>
      )}
      {!iconNode && (
        <div className={`${prefixCls}-image`} style={imageStyle}>
          {imageNode}
        </div>
      )}
      {des && <div className={`${prefixCls}-description`}>{des}</div>}
      {children && <div className={`${prefixCls}-footer`}>{children}</div>}
    </div>
  );
}
