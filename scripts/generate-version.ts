import { join } from 'path';
import { fsExtra } from '@umijs/utils';

import { PATHS } from './.internal/constants';

const { version } = require(join(PATHS.COMPONENTS, '../package.json'));

fsExtra.writeFileSync(
  join(PATHS.COMPONENTS, 'version', 'version.ts'),
  `export const version = '${version}';`,
  'utf8',
);
