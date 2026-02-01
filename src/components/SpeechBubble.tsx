import React from 'react';

type BeakerTicksProps = {
  height?: string | number | undefined,
  width?: string | number | undefined,
}

type Rect = {
  width: number,
  height: number
}

const SpeechBubble = (props: BeakerTicksProps) => {
  const {
    width = 220,
    height = 200,
  } = props;
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const canvas1 = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const ctx = canvas?.current?.getContext('2d');
    const ctx1 = canvas1?.current?.getContext('2d');
    if (ctx) {
      const { height: rectHeight, width: rectWidth } = ctx.canvas;
      const stemWidth = rectWidth * 0.15
      const stemHeight = stemWidth * 1.1
      const stemCornerRadius = stemWidth * 0.3
      const stemYOffset = Math.max(rectHeight * 0.83 - stemHeight, 0)
      ctx.canvas.style.position = 'absolute'
      ctx.canvas.style.top = `${stemYOffset}px`
      ctx.moveTo(0, stemWidth)
      ctx.lineTo(stemHeight, stemCornerRadius)
      ctx.lineTo(stemCornerRadius, stemCornerRadius)
      ctx.quadraticCurveTo(0, stemCornerRadius, 0, 0)
      ctx.fillStyle = '#ededed'
      ctx.fill()
    }
    if (ctx1) {
      const { height: rectHeight, width: rectWidth } = ctx1.canvas;
      const cornerRadius = rectWidth * 0.15;
      ctx1.roundRect(0, 0, rectWidth, rectHeight, cornerRadius);
      ctx1.fillStyle = '#ededed'
      ctx1.fill()
    }
  })

  return (
    <div style={{
      position: 'absolute',
      width: '350px',
      overflow: 'hidden',
      background: 'transparent'
    }}>
      <canvas ref={canvas1} height={height} width={width} />
      <canvas ref={canvas} height={height} width={width} />
    </div>
  );
};
export default SpeechBubble;