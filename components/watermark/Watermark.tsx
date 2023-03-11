import React, { useEffect, useRef } from 'react';
import MutateObserver from '@rc-component/mutate-observer';
import { getPixelRatio, rotateWatermark, getStyleStr, reRendering, } from './utils';

export interface WatermarkProps {
  className?: string;
  style?: React.CSSProperties;
  /**
   * 设置水印元素的 z-index
   * @default 9
   */
  zIndex?: number;
  /**
   * 水印绘制时，旋转的角度
   */
  rotate?: number;
  /**
   * 水印的宽度
   */
  width?: number;
  /**
   * 水印的高度
   */
  height?: number;
  /**
   * 图片源，建议导出 2 倍或 3 倍图，优先级高 (支持 base64 格式)
   */
  image?: string;
  /**
   * 水印文字内容
   */
  content?: string | string[];
  /**
   * 水印之间的间距
   */
  gap?: [number, number];
  /**
   * 水印距离容器左上角的偏移量
   */
  offset?: [number, number];
  /**
   * 字体配置
   */
  font?: {
    color?: string;
    fontSize?: number | string;
    fontWeight?: 'normal' | 'light' | 'weight' | number;
    fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
    fontFamily?: string;
  };
  children?: React.ReactNode;
}

const BaseSize = 2;
const FontGap = 3;

export const Watermark: React.FC<WatermarkProps> = (props) => {
  const {
    zIndex = 9,
    rotate = -22,
    width,
    height,
    image,
    content,
    font = {},
    style,
    className,
    gap = [100, 100],
    offset,
    children,
  } = props;

  const {
    color = 'rgba(0,0,0,.15)',
    fontSize = 16,
    fontWeight = 'normal',
    fontStyle = 'normal',
    fontFamily = 'sans-serif',
  } = font;

  const [gapX, gapY,] = gap;
  const gapXCenter = gapX / 2;
  const gapYCenter = gapY / 2;
  const offsetLeft = offset?.[0] ?? gapXCenter;
  const offsetTop = offset?.[1] ?? gapYCenter;

  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>();
  const stopObservation = useRef(false);

  const getMarkStyle = () => {
    const markStyle: React.CSSProperties = {
      zIndex,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      backgroundRepeat: 'repeat',
    };

    /** Calculate the style of the offset */
    let positionLeft = offsetLeft - gapXCenter;
    let positionTop = offsetTop - gapYCenter;
    if (positionLeft > 0) {
      markStyle.left = `${positionLeft}px`;
      markStyle.width = `calc(100% - ${positionLeft}px)`;
      positionLeft = 0;
    }

    if (positionTop > 0) {
      markStyle.top = `${positionTop}px`;
      markStyle.height = `calc(100% - ${positionTop}px)`;
      positionTop = 0;
    }

    markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;

    return markStyle;
  }

  const getMarkSize = (ctx: CanvasRenderingContext2D) => {
    let defaultWidth = 120;
    let defaultHeight = 64;

    if (!image && ctx.measureText) {
      ctx.font = `${Number(fontSize)}px ${fontFamily}`;
      const contents = Array.isArray(content) ? content : [content];
      const widths = contents.map((item) => ctx.measureText(item!).width);
      defaultWidth = Math.ceil(Math.max(...widths));
      defaultHeight = Number(fontSize) * contents.length + (contents.length - 1) * FontGap;
    }

    return [width ?? defaultWidth, height ?? defaultHeight] as const;
  }

  const appendWatermark = (base64Url: string, markWidth: number) => {
    if (containerRef.current && watermarkRef.current) {
      stopObservation.current = true;

      watermarkRef.current.setAttribute(
        'style',
        getStyleStr({
          ...getMarkStyle(),
          backgroundImage: `url('${base64Url}')`,
          backgroundSize: `${(gapX + markWidth) * BaseSize}px`,
        }),
      );
      containerRef.current?.append(watermarkRef.current);

      // Delayed execution
      setTimeout(() => {
        stopObservation.current = false;
      });
    }
  }

  const fillTexts = (
    ctx: CanvasRenderingContext2D,
    drawX: number,
    drawY: number,
    drawWidth: number,
    drawHeight: number,
  ) => {
    const ratio = getPixelRatio();
    const mergedFontSize = Number(fontSize) * ratio;
    ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${drawHeight}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.translate(drawWidth / 2, 0);
    const contents = Array.isArray(content) ? content : [content];
    contents?.forEach((item, index) => {
      ctx.fillText(item ?? '', drawX, drawY + index * (mergedFontSize + FontGap * ratio));
    });
  };

  const drawText = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    drawX: number,
    drawY: number,
    drawWidth: number,
    drawHeight: number,
    alternateRotateX: number,
    alternateRotateY: number,
    alternateDrawX: number,
    alternateDrawY: number,
    markWidth: number,
  ) => {
    fillTexts(ctx, drawX, drawY, drawWidth, drawHeight);
    /** Fill the interleaved text after rotation */
    ctx.restore();
    rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate);
    fillTexts(ctx, alternateDrawX, alternateDrawY, drawWidth, drawHeight);
    appendWatermark(canvas.toDataURL(), markWidth);
  }

  const renderWatermark = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (!watermarkRef.current) {
        watermarkRef.current = document.createElement('div');
      }

      const ratio = getPixelRatio();
      const [markWidth, markHeight] = getMarkSize(ctx);

      const canvasWidth = (gapX + markWidth) * ratio;
      const canvasHeight = (gapY + markHeight) * ratio;
      canvas.setAttribute('width', `${canvasWidth * BaseSize}px`);
      canvas.setAttribute('height', `${canvasHeight * BaseSize}px`);

      const drawX = (gapX * ratio) / 2;
      const drawY = (gapY * ratio) / 2;

      const drawWidth = markWidth * ratio;
      const drawHeight = markHeight * ratio;
      const rotateX = (drawWidth + gapX * ratio) / 2;
      const rotateY = (drawHeight + gapY * ratio) / 2;
      /** Alternate drawing parameters */
      const alternateDrawX = drawX + canvasWidth;
      const alternateDrawY = drawY + canvasHeight;
      const alternateRotateX = rotateX + canvasWidth;
      const alternateRotateY = rotateY + canvasHeight;

      ctx.save();
      rotateWatermark(ctx, rotateX, rotateY, rotate);

      if (image) {
        const img = new Image();

        img.onload = () => {
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

          ctx.restore();
          rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate);
          ctx.drawImage(img, alternateDrawX, alternateDrawY, drawWidth, drawHeight);

          appendWatermark(canvas.toDataURL(), markWidth);
        }

        img.onerror = () => {
          drawText(
            canvas,
            ctx,
            drawX,
            drawY,
            drawWidth,
            drawHeight,
            alternateRotateX,
            alternateRotateY,
            alternateDrawX,
            alternateDrawY,
            markWidth,
          );
        }

        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image;
      } else {
        drawText(
          canvas,
          ctx,
          drawX,
          drawY,
          drawWidth,
          drawHeight,
          alternateRotateX,
          alternateRotateY,
          alternateDrawX,
          alternateDrawY,
          markWidth,
        );
      }
    }
  }

  useEffect(renderWatermark, [
    rotate,
    zIndex,
    width,
    height,
    image,
    content,
    color,
    fontSize,
    fontWeight,
    fontStyle,
    fontFamily,
    gapX,
    gapY,
    offsetLeft,
    offsetTop,
  ]);

  const onMutate = (mutations: MutationRecord[]) => {
    if (stopObservation.current) {
      return;
    }

    mutations.forEach((mutation) => {
      if (reRendering(mutation, watermarkRef.current)) {
        destroyWatermark();
        renderWatermark();
      }
    });
  }

  const destroyWatermark = () => {
    if (watermarkRef.current) {
      watermarkRef.current.remove();
      watermarkRef.current = undefined;
    }
  };

  return (
    <MutateObserver onMutate={onMutate}>
      <div
        ref={containerRef}
        className={className}
        style={{ position: 'relative', ...style }}
      >
        {children}
      </div>
    </MutateObserver>
  );
}
