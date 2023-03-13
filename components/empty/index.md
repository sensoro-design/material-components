---
category: Components
title: Empty
subtitle: 空状态
group:
  title: 数据展示
---

空状态时的展示占位图。

## 何时使用

- 当目前没有数据时，用于显式的用户提示。
- 初始化场景时的引导创建流程。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/customize-icon.tsx">自定义图标</code>
<code src="./demo/customize.tsx">自定义</code>

## API
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| description | 自定义描述内容 | ReactNode | - |  |
| icon | 设置显示图标 | ReactNode | `<NoDataPurely />` |  |
| image | 设置显示图片，为 string 时表示自定义图片地址。 | ReactNode | - |  |
| imageStyle | 图片样式 | CSSProperties | - |  |
