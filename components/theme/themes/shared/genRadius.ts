import type { MapToken } from '../../interface';

type Radius = Pick<MapToken, 'borderRadiusSmall' | 'borderRadiusLarge' | 'borderRadiusRound' | 'borderRadius'>;

export const genRadius = (radiusBase: number): Radius => {
  let radiusSmall = radiusBase;
  let radiusLarge = radiusBase + 2;
  let radiusRound = radiusBase + 18;

  return {
    borderRadius: radiusBase > 16 ? 16 : radiusBase,
    borderRadiusSmall: radiusSmall,
    borderRadiusLarge: radiusLarge,
    borderRadiusRound: radiusRound,
  };
}
