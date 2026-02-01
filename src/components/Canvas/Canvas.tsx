import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
interface CanvasProps {
  draw: (val: CanvasRenderingContext2D) => void,
  width: number,
  height: number,
}
const Canvas = ({ draw, width, height }: CanvasProps) => {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvas.current) return
    const context = canvas.current.getContext('2d')
    if (!context) return
    draw(context)
  })
  return (
    <canvas ref={canvas} width={width} height={height} style={{width: '100%', height: '100%'}} />
  )
}
Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}
export default Canvas;