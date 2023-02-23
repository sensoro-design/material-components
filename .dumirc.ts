import path from 'path';
import { defineConfig } from 'dumi';

const isProd = process.env.NODE_ENV === 'production';

const prodConfig = isProd
  ? defineConfig({
    ssr: {},
  })
  : defineConfig({});

export default defineConfig({
  ssr: false,
  hash: true,
  themeConfig: {
    name: 'Material',
    socialLinks: {
      github: 'https://github.com/sensoro-design/material-components',
    },
    nav: [
      { title: '组件', link: '/components' }
    ],
  },
  alias: {
    '@lins-material/provider': path.join(__dirname, 'packages/provider/src'),
    '@lins-material/components': path.join(__dirname, 'packages/components/src'),
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [{ type: 'component', dir: 'packages/components/src' }],
    codeBlockMode: 'passive',
  },
  mfsu: false,
  crossorigin: {},
  ...prodConfig
})
