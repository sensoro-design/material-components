import React, { useContext, forwardRef, } from 'react';
import { classNames } from '@pansy/shared';
import { ConfigContext } from '../config-provider';
import { useStyle } from './style';

import type { ButtonType, ButtonHTMLType } from './buttonHelpers';

export interface BaseButtonProps {
  prefixCls?: string;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean | { delay?: number };
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

type CompoundedComponent = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLElement>
> & {
  // Group: typeof Group;
  // /** @internal */
  // __ANT_BUTTON: boolean;
};


const InternalButton: React.ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    loading = false,
    htmlType = 'button',
    children,
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classes = classNames(
    prefixCls,
    hashId,
  )

  return wrapSSR(
    <button
      type={htmlType}
      className={classes}
    >
      {children}
    </button>
  );
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  InternalButton,
) as CompoundedComponent;
