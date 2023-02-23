import React, { useContext } from 'react';
import { Tag, Space, Popover } from 'antd';
import { classNames } from '@pansy/shared';
import { MaterialConfigContext } from '@lins-material/provider';
import { useStyle } from './style';

import type { TagProps } from 'antd/es/tag';
import type { PopoverProps } from 'antd/es/popover';

export interface TagListProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  list?: ItemData[];
  max?: number;
  getPopupContainer?: PopoverProps['getPopupContainer'];
}

export interface ItemData {
  text: React.ReactNode;
  icon?: TagProps['icon'];
  color?: TagProps['color'];
}

export const TagList: React.FC<TagListProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    list = [],
    max,
    getPopupContainer,
  } = props;

  const { getPrefixCls } = useContext(MaterialConfigContext);
  const prefixCls = getPrefixCls('tag-list', customizePrefixCls);

  const { wrapSSR, hashId, } = useStyle(prefixCls);

  const tagListCls = classNames(prefixCls, className, hashId);

  let showList: ItemData[] = max === undefined || list.length <= max
    ? list
    : list.slice(0, max - 1);
  const popList = list?.map((tag) => ({ ...tag, style: { margin: 0 } }));
  const isHidden = max !== undefined && list.length > max;

  const renderTag = (item: ItemData, index: number) => {
    const { text, ...rest } = item;
    return (
      <Tag key={index} {...rest}>
        {text}
      </Tag>
    );
  };

  const renderContent = () => {
    return (
      <Space size={[8, 4]} wrap>
        {popList.map(renderTag)}
      </Space>
    );
  };

  return wrapSSR(
    <div className={tagListCls} style={style}>
      {showList.map(renderTag)}
      {isHidden && (
        <Popover
          overlayClassName={`${prefixCls}-popover`}
          placement="top"
          content={renderContent}
          trigger="hover"
          getPopupContainer={getPopupContainer}
          open
        >
          <Tag>...</Tag>
        </Popover>
      )}
    </div>
  )
}
