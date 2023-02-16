import React, { useContext } from 'react';
import { classNames } from '@pansy/shared';
import { MaterialProvider } from '@lins-material/provider';
import { useStyle } from './style';

export interface TagListProps {
  prefixCls?: string;
  className?: string;
}

export const TagList: React.FC<TagListProps> = (props) => {
  const {
    className,
    prefixCls: customizePrefixCls,
  } = props;

  const { getPrefixCls } = useContext(MaterialProvider);
  const prefixCls = getPrefixCls('tag-list', customizePrefixCls);

  const { wrapSSR, hashId, } = useStyle(prefixCls);

  const tagListCls = classNames(`${prefixCls}`, className, hashId);

  return wrapSSR(
    <div className={tagListCls}>
      123
      <span className={`ant-btn`}>
        33443
      </span>
    </div>
  )
}
