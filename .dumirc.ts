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
    '@lins-material/provider/es': path.join(__dirname, 'packages/provider/src'),
    '@lins-material/provider/lib': path.join(__dirname, 'packages/provider/src'),
    '@lins-material/provider': path.join(__dirname, 'packages/provider/src'),
    '@lins-material/components/es': path.join(__dirname, 'packages/components/src'),
    '@lins-material/components/lib': path.join(__dirname, 'packages/components/src'),
    '@lins-material/components': path.join(__dirname, 'packages/components/src'),
  },
  favicons: [logo],
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      { type: 'component', dir: 'ant-design' },
      { type: 'component', dir: 'packages/components/src' }
    ],
    codeBlockMode: 'passive',
  },
  mfsu: false,
  crossorigin: {},
  ...prodConfig
})
