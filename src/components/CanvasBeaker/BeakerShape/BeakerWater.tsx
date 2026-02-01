import React from 'react'

type BeakerWaterProps = {
  height?: string | number | undefined,
  width?: string | number | undefined,
  cornerRadius: number,
  concentration: number,
}

type Rect = {
  width: number,
  height: number
}

const BeakerWater = ({ height, width, cornerRadius, concentration }: BeakerWaterProps) => {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const ctx = canvas?.current?.getContext('2d');
    if (ctx) {
      const { height: rectHeight, width: rectWidth } = ctx.canvas;
      const rect: Rect = {
        width: rectWidth,
        height: rectHeight * concentration
      }
      ctx.moveTo(0, 0);
      ctx.lineTo(
        0,
        rect.height - cornerRadius,
      );

      ctx.quadraticCurveTo(
        0,
        rect.height,
        cornerRadius,
        rect.height,
      );

      ctx.lineTo(
        rect.width - cornerRadius,
        rect.height,
      )

      ctx.quadraticCurveTo(
        rect.width,
        rect.height,
        rect.width,
        rect.height - cornerRadius,
      )

      ctx.lineTo(
        rect.width,
        0,
      )

      ctx.fillStyle = 'rgb(218,238,245,0.4)'
      ctx.fill();
    }
  })
  return (
    <canvas
      ref={canvas}
      height={height}
      width={width}
    />
  );
};
export default BeakerWater