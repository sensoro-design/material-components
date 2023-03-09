import path from 'path';
import { defineConfig } from 'dumi';

const isProd = process.env.NODE_ENV === 'production';
const logo = 'https://cdn.jsdelivr.net/gh/wangxingkang/pictures@latest/imgs/sensoro-design.svg';

const prodConfig = isProd
  ? defineConfig({
    ssr: {},
  })
  : defineConfig({});

export default defineConfig({
  hash: true,
  themeConfig: {
    logo,
    name: 'Material',
    socialLinks: {
      github: 'https://github.com/sensoro-design/material-components',
    },
    nav: [
      { title: '组件', link: '/components' },
    ],
  },
  alias: {
    'sensoro-design/es': path.join(__dirname, 'components'),
    'sensoro-design/lib': path.join(__dirname, 'components'),
    'sensoro-design': path.join(__dirname, 'components/index.ts')
  },
  favicons: [logo],
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      { type: 'component', dir: 'components' }
    ],
    codeBlockMode: 'passive',
  },
  mfsu: false,
  crossorigin: {},
  ...prodConfig
})
