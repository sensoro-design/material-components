import { getAlphaColor } from './getAlphaColor';
import { seedToken } from '../themes/seed';

import type { AliasToken, MapToken, OverrideToken, SeedToken } from '../interface';

/** Raw merge of `@ant-design/cssinjs` token. Which need additional process */
type RawMergedToken = MapToken & OverrideToken & { override: Partial<AliasToken> };

/**
 * Seed (designer) > Derivative (designer) > Alias (developer).
 *
 * Merge seed & derivative & override token and generate alias token for developer.
 */
export function formatToken(derivativeToken: RawMergedToken): AliasToken {
  const { override, ...restToken } = derivativeToken;
  const overrideTokens = { ...override };

  Object.keys(seedToken).forEach((token) => {
    delete overrideTokens[token as keyof SeedToken];
  });

  const mergedToken = {
    ...restToken,
    ...overrideTokens,
  };

  // Generate alias token
  const aliasToken: AliasToken = {
    ...mergedToken,

    paddingXXS: mergedToken.sizeXXS,
    paddingXS: mergedToken.sizeXS,
    paddingSM: mergedToken.sizeSM,
    padding: mergedToken.size,
    paddingMD: mergedToken.sizeMD,
    paddingLG: mergedToken.sizeLG,
    paddingXL: mergedToken.sizeXL,

    marginXXS: mergedToken.sizeXXS,
    marginXS: mergedToken.sizeXS,
    marginSM: mergedToken.sizeSM,
    margin: mergedToken.size,
    marginMD: mergedToken.sizeMD,
    marginLG: mergedToken.sizeLG,
    marginXL: mergedToken.sizeXL,
    marginXXL: mergedToken.sizeXXL,
  }

  return aliasToken;
}
