import { genRadius } from './genRadius';

import type { CommonMapToken, SeedToken } from '../../interface';

export function genCommonMapToken(token: SeedToken): CommonMapToken {
  const { motionUnit, motionBase, borderRadius, lineWidth } = token;

  return {
    // motion
    motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
    motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,

    // line
    lineWidthBold: lineWidth + 1,

    // radius
    ...genRadius(borderRadius),
  };
}
