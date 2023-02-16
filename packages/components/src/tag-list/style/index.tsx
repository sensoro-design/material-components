import { useStyle as useAntStyle } from '@lins-material/provider';

import type { GenerateStyle, MaterialAliasToken } from '@lins-material/provider';

interface TagListActionsToken extends MaterialAliasToken {
  antCls: string;
  componentCls: string;
}

export function useStyle(prefixCls?: string) {
  const genActionsStyle: GenerateStyle<TagListActionsToken> = (token) => {
    const { componentCls, antCls } = token;

    return {
      [`${componentCls}`]: {
        color: 'red',

        [`& > ${antCls}-btn`]: {
          color: 'green',
        }
      }
    }
  }

  return useAntStyle('TagList', (token) => {
    const tagListActionsToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genActionsStyle(tagListActionsToken)];
  })
}
