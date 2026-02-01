import React, { useEffect, useRef, useState } from 'react';

type ConcentrationSliderProps = {
    max?: number
    min?: number
    height?: string | number | undefined
    width?: string | number | undefined
    disabled: boolean
    onChange?: (val: number, index: number) => void
}

let xx = 0, ratio = 0

const ConcentrationSlider = (props: ConcentrationSliderProps) => {
    const {
        max = 15,
        min,
        width = 212,
        disabled,
        onChange,
    } = props;


    const thickness = 80

    const rate = 212 / 27.6
    const initialTime = 10

    const canvas = useRef<HTMLCanvasElement>(null);
    const [x, setX] = useState<number>(rate * (min??initialTime))
    const [isDrag, startDrag] = useState<boolean>(false)
    
    const touchStartEventHandler = function (event: any) {
        if (event.touches.length) {
            const rect = event.target.getBoundingClientRect()
            const currX = event.touches[0].clientX - rect.left
            xx = currX
        }
        startDrag(true)
    }

    const touchMoveEventHandler = function (event: any) {
        if (event.touches.length) {
            const rect = event.target.getBoundingClientRect()
            const currX = event.touches[0].clientX - rect.left
            if (min) {
                setX(Math.max(Math.min(currX * ratio, rate * max), rate * min))
            } else {
                setX(Math.min(currX * ratio, rate * max))
            }
        }
    };

    const touchEndEventHandler = function (event: any) {
        startDrag(false)
    }

    const mouseDownEventHandler = function (event: any) {
        ratio = event.offsetX / xx
        if (min) {
            setX(Math.max(Math.min(event.offsetX, rate * max), rate * min))
        } else {
            setX(Math.min(event.offsetX, rate * max))
        }
        startDrag(true)
    }

    const mouseMoveEventHandler = function (event: any) {
        if (min) {
            setX(Math.max(Math.min(event.offsetX, rate * max), rate * min))
        } else {
            setX(Math.min(event.offsetX, rate * max))
        }
    };

    const mouseUpEventHandler = function (event: any) {
        startDrag(false)
    }

    const addEventListeners = (ctx: CanvasRenderingContext2D) => {
        ctx.canvas.addEventListener('touchstart', touchStartEventHandler);
        ctx.canvas.addEventListener('touchend', touchEndEventHandler);
        ctx.canvas.addEventListener('touchmove', touchMoveEventHandler);
        ctx.canvas.addEventListener('mousedown', mouseDownEventHandler);
        ctx.canvas.addEventListener('mouseup', mouseUpEventHandler);
        ctx.canvas.addEventListener('mousemove', mouseMoveEventHandler);
    }

    const removeEventListeners = (ctx: CanvasRenderingContext2D) => {
        ctx.canvas.removeEventListener('touchstart', touchStartEventHandler);
        ctx.canvas.removeEventListener('touchend', touchEndEventHandler);
        ctx.canvas.removeEventListener('touchmove', touchMoveEventHandler);
        ctx.canvas.removeEventListener('mousedown', mouseDownEventHandler);
        ctx.canvas.removeEventListener('mouseup', mouseUpEventHandler);
        ctx.canvas.removeEventListener('mousemove', mouseMoveEventHandler);
    }

    const drawSlider = (ctx: CanvasRenderingContext2D) => {
        const { height: rectHeight, width: rectWidth } = ctx.canvas;
        ctx.beginPath()
        ctx.clearRect(0, 0, rectWidth, rectHeight)
        ctx.rect(0, 0, rectWidth, rectHeight)
        ctx.fillStyle = 'rgba(0,0,0,0.1)'
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(rectWidth / 4 * 2.4, 0)
        ctx.lineTo(rectWidth / 4 * 2.4, rectHeight)
        ctx.strokeStyle = 'black'
        ctx.stroke()
        ctx.roundRect(x - 9, rectHeight / 2.5, 18, 30, 2)
        ctx.rect(x - 1.5, 0, 3, 22)
        ctx.fillStyle = disabled ? 'gray' : 'rgb(220, 84, 59)'
        ctx.fill()
        if (!disabled) {
            ctx.fillStyle = 'black'
            ctx.font = '18px Arial';
            ctx.fillText('[A]', 10, rectHeight / 2 - 7)
            ctx.fillStyle = 'rgb(220, 84, 59)'
            ctx.font = '14px Arial';
            ctx.fillText(`${(x / rate).toFixed(2)}M`, 2, rectHeight / 2 + 15)
        } 
    }

    useEffect(() => {
        const ctx = canvas?.current?.getContext('2d');
        if (ctx) {
            addEventListeners(ctx)
            drawSlider(ctx)
        }
    }, [])

    useEffect(() => {
        const ctx = canvas?.current?.getContext('2d');
        if (ctx && isDrag && !disabled) {
            drawSlider(ctx)
        }
    }, [x, isDrag, disabled])

    useEffect(() => {
        if (disabled) {
            const ctx = canvas?.current?.getContext('2d');
            if (ctx) {
                removeEventListeners(ctx)
            }
        }
    }, [disabled])

    return (
        <div style={{width: thickness, height: width, position: 'absolute', left: -30, zIndex: 1}}>
            <canvas ref={canvas} height={width} width={thickness} />
        </div>
    );
};
export default ConcentrationSlider;