import { defaultConfig } from 'redbud';

export default defaultConfig({
  esm: {
    output: 'es',
  },
  cjs: {
    output: 'lib',
  },
  platform: 'browser'
});
