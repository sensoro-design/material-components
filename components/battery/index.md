---
category: Components
title: Battery
subtitle: 电池
demo:
  cols: 2
group:
  title: 数据展示
  order: 1
---

用于展示电池通电状态或电池电量。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本示例</code>
<code src="./demo/color.tsx">自定义颜色</code>
<code src="./demo/charge.tsx">通电状态</code>

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| className | 额外的样式类                   | string                | --     | --  | --   |
| style     | 额外的样式(控制组件大小和颜色) | CSSProperties         | --     | --   | --   |
| value     | 电量值 (-1 表示充电状态)       | number(0 - 100) \| -1 | --     | --   | --   |
| color     | 组件的颜色                     | string                | --     | --   | --   |
