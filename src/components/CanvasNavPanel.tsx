import React from 'react';
import styles from './CanvasNavPanel.module.scss'

type PanelShapeProps = {
  height?: number | undefined,
  width?: number | undefined,
  tabWidth: number,
  tabHeight: number,
  cornerRadius: number,
}

const PanelShape = (props: PanelShapeProps) => {
  const {
    height = 420,
    width = 400,
    tabWidth,
    tabHeight,
    cornerRadius,
  } = props;
  const canvas = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const ctx = canvas?.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, width, height)
      const { height: rectHeightA, width: rectWidthA } = ctx.canvas;
      const rectHeight = rectHeightA - 12
      const rectWidth = rectWidthA - 12

      let panelWidth = rectWidth - tabWidth;
      let panelHeight = rectHeight - tabHeight;
      let _tabHeight = rectHeight - panelHeight;

      ctx.moveTo(0, 0);
      ctx.lineTo(
        0,
        rectHeight,
      );
      ctx.lineTo(
        panelWidth - cornerRadius,
        rectHeight,
      );

      // Bottom right
      ctx.quadraticCurveTo(
        panelWidth,
        rectHeight,
        panelWidth,
        rectHeight - cornerRadius,
      );

      ctx.lineTo(
        panelWidth,
        _tabHeight + cornerRadius,
      );

      // Tab left corner
      ctx.quadraticCurveTo(
        panelWidth,
        _tabHeight,
        panelWidth + cornerRadius,
        _tabHeight,
      );

      // ctx.lineTo(
      //   rectWidth - cornerRadius,
      //   _tabHeight,
      // );

      // Tab right corner
      ctx.quadraticCurveTo(
        rectWidth,
        _tabHeight,
        rectWidth,
        _tabHeight - cornerRadius,
      )

      ctx.lineTo(
        rectWidth,
        0,
      );
      ctx.lineTo(0, 0);
      ctx.fillStyle = 'white'
      ctx.fill()
      ctx.lineWidth = 0.1
      ctx.stroke();

      ctx.shadowColor = 'rgb(30, 30, 30)'
      ctx.shadowBlur = 10
    }
  })
  return (
    <canvas className={styles.canvasNavPanel} ref={canvas} height={height} width={width} />
  );
};
export default PanelShape;