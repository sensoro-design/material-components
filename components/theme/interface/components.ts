import type { ComponentToken as ButtonComponentToken } from '../../button/style';
import type { ComponentToken as SpaceComponentToken } from '../../space/style';
import type { ComponentToken as EmptyComponentToken } from '../../empty/style';
import type { ComponentToken as PlateComponentToken } from '../../plate/style';

export interface ComponentTokenMap {
  Affix?: {};
  Button?: ButtonComponentToken;
  Empty?: EmptyComponentToken;
  Space?: SpaceComponentToken;
  Plate?: PlateComponentToken;
}
