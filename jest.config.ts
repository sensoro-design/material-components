import { createConfig } from '@umijs/test';

const jestConfig = createConfig({
  target: 'browser'
});

export default {
  ...jestConfig
}
