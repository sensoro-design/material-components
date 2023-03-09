import { join } from 'path';

const ROOT = join(__dirname, '../../');

export const PATHS = {
  ROOT,
  COMPONENTS: join(ROOT, 'components'),
} as const;
