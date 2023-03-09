import React, { useContext } from 'react';
import { classNames } from '@pansy/shared';
import { ConfigContext } from '../config-provider';
import { useStyle } from './style';

export interface EmptyProps {
  prefixCls?: string;
}

export const Empty: React.FC<EmptyProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('empty', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <div
      className={classNames(
        hashId,
        prefixCls,
      )}
    >
      123
    </div>
  );
}
