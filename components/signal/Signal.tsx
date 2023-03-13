import React, { useRef, memo, } from 'react';
import { classNames } from '@pansy/shared'
import { path as d3Path } from 'd3-path';

export interface SignalProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: number;
  colors?: string[];
}

const defaultColors = ['#DBDEE2', '#2B6DE5', '#F72231'];

const InternalSignal: React.FC<SignalProps> = (props) => {
  const { prefixCls, className, style, value = 0, } = props;

  const barWidth = useRef(70);
  const startHeight = useRef(70);
  const stepHeight = useRef((1024 - 114 * 2 - startHeight.current) / 4);
  const intervalWidth = useRef((1024 - 114 * 2 - barWidth.current * 5) / 4);

  const defaultColor = props.colors?.[0] || defaultColors[0];
  const primaryColor = props.colors?.[1] || defaultColors[1];
  const errorColor = props.colors?.[2] || defaultColors[2];

  const paths: React.ReactNode[] = [];

  const getBarPathStr = (val: number) => {
    const barPath = d3Path();
    // 获取信号柱的高度
    const barHeight = startHeight.current + stepHeight.current * (val - 1);

    // 左上
    const point1 = [
      114 + (intervalWidth.current + barWidth.current) * (val - 1),
      114 + stepHeight.current * (5 - val)
    ];
    // 右上
    const point2 = [point1[0] + barWidth.current, point1[1]];
    // 右下
    const point3 = [point2[0], point1[1] + barHeight];
    // 左下
    const point4 = [point1[0], point3[1]];

    barPath.moveTo(point1[0], point1[1]);
    barPath.lineTo(point2[0], point2[1]);
    barPath.lineTo(point3[0], point3[1]);
    barPath.lineTo(point4[0], point4[1]);
    barPath.closePath();

    return barPath.toString();
  };

  if (value === 0) {
    paths.push(
      <path
        key={0}
        fill={errorColor}
        d="M365.056 154.112l-39.936-39.424c-3.072-3.072-8.192-3.072-11.264 0L240.128 189.952 165.888 114.688c-3.072-3.072-8.192-3.072-11.264 0l-39.936 39.424c-3.072 3.072-3.072 8.192 0 11.264L189.44 241.152 114.688 316.928c-3.072 3.072-3.072 8.192 0 11.264l39.936 39.424c3.072 3.072 8.192 3.072 11.264 0l73.728-74.752 73.728 74.752c3.072 3.072 8.192 3.072 11.264 0l39.936-39.424c3.072-3.072 3.072-8.192 0-11.264L290.304 241.152l74.752-75.776c3.072-3.072 3.072-8.192 0-11.264z"
      />
    );
  }

  paths.push(
    <path
      key={1}
      fill={(value as number) >= 1 ? primaryColor : defaultColor}
      d={getBarPathStr(1)}
    />
  );

  paths.push(
    <path
      key={2}
      fill={(value as number) >= 2 ? primaryColor : defaultColor}
      d={getBarPathStr(2)}
    />
  );
  paths.push(
    <path
      key={3}
      fill={(value as number) >= 3 ? primaryColor : defaultColor}
      d={getBarPathStr(3)}
    />
  );
  paths.push(
    <path
      key={4}
      fill={(value as number) >= 4 ? primaryColor : defaultColor}
      d={getBarPathStr(4)}
    />
  );
  paths.push(
    <path
      key={5}
      fill={(value as number) >= 5 ? primaryColor : defaultColor}
      d={getBarPathStr(5)}
    />
  );

  return (
    <span
      className={classNames(className, 'anticon', {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <svg viewBox="0 0 1024 1024" width="1em" height="1em">
        {paths}
      </svg>
    </span>
  );
}

export const Signal = memo(InternalSignal)
