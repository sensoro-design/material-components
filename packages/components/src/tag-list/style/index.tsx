import { useStyle as useAntStyle } from '@lins-material/provider';

import type { GenerateStyle, MaterialAliasToken } from '@lins-material/provider';

interface TagListToken extends MaterialAliasToken {
  antCls: string;
  componentCls: string;
}

const genTagListStyle: GenerateStyle<TagListToken> = (token) => {
  const { componentCls, antCls } = token;

  return {
    [componentCls]: {
      background: token.blue,
    },
    [`${componentCls}-popover${antCls}-popover`]: {
      maxWidth: 240,
    }
  }
}

export function useStyle(prefixCls: string) {
  return useAntStyle('TagList', (token) => {
    const tagListToken: TagListToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genTagListStyle(tagListToken)];
  })
}
