import React, { useEffect, useRef, useState } from 'react';
import useAppData from '../hooks/useAppData';

type TimeSliderProps = {
    max?: number
    min?: number
    height?: string | number | undefined
    width?: string | number | undefined
    disabled: boolean
    onChange: (val: number) => void
}

// let xx = 0, ratio = 0
let isDrag = false

const TimeSlider = (props: TimeSliderProps) => {
    const {
        max = 15,
        min,
        width = 212,
        disabled,
        onChange,
    } = props;

    const { curStep } = useAppData()

    const thickness = 80

    const rate = 212 / 27.6
    const initialTime = 10
    const zero = 1.2

    const canvas = useRef<HTMLCanvasElement>(null);
    const [x, setX] = useState<number>(rate * (min??initialTime))
    // const [isDrag, startDrag] = useState<boolean>(false)
    
    const touchStartEventHandler = function (event: any) {
        // startDrag(true)
        isDrag = true
        if (event.touches.length) {
            const rect = event.target.getBoundingClientRect()
            const currX = event.touches[0].clientX - rect.left
            if (min) {
                setX(Math.max(Math.max(Math.min(currX / ratio, rate * max), rate * min), rate * zero))
            } else {
                setX(Math.max(Math.min(currX / ratio, rate * max), rate * zero))
            }
        }
    }

    const ratio = Math.min(window.innerWidth / 1150, window.innerHeight / 650)
    const touchMoveEventHandler = function (event: any) {
        if (!disabled && event.touches.length) {
            const rect = event.target.getBoundingClientRect()
            const currX = event.touches[0].clientX - rect.left
            if (min) {
                setX(Math.max(Math.max(Math.min(currX / ratio, rate * max), rate * min), rate * zero))
            } else {
                setX(Math.max(Math.min(currX / ratio, rate * max), rate * zero))
            }
        }
    };

    const touchEndEventHandler = function (event: any) {
        // startDrag(false)
        isDrag = false
    }

    const mouseDownEventHandler = function (event: any) {
        // startDrag(true)
        isDrag = true
        // ratio = event.offsetX / xx
        if (min) {
            setX(Math.max(Math.max(Math.min(event.offsetX, rate * max), rate * min), rate * zero))
        } else {
            setX(Math.max(Math.min(event.offsetX, rate * max), rate * zero))
        }
    }

    const mouseMoveEventHandler = function (event: any) {
        if (!disabled) {
            if (min) {
                setX(Math.max(Math.max(Math.min(event.offsetX, rate * max), rate * min), rate * zero))
            } else {
                setX(Math.max(Math.min(event.offsetX, rate * max), rate * zero))
            }
        }
    };

    const mouseUpEventHandler = function (event: any) {
        // startDrag(false)
        isDrag = false
    }

    const addEventListeners = (ctx: CanvasRenderingContext2D) => {
        // @ts-ignore
        if (window.mobileCheck()) {
            ctx.canvas.addEventListener('touchstart', touchStartEventHandler, { passive: true });
            ctx.canvas.addEventListener('touchend', touchEndEventHandler, { passive: true });
            ctx.canvas.addEventListener('touchmove', touchMoveEventHandler, { passive: true });
        } else {
            ctx.canvas.addEventListener('mousedown', mouseDownEventHandler, { passive: true });
            ctx.canvas.addEventListener('mouseup', mouseUpEventHandler, { passive: true });
            ctx.canvas.addEventListener('mousemove', mouseMoveEventHandler, { passive: true });
        }
    }

    const removeEventListeners = (ctx: CanvasRenderingContext2D) => {
        // @ts-ignore
        if (window.mobileCheck()) {
            ctx.canvas.removeEventListener('touchstart', touchStartEventHandler);
            ctx.canvas.removeEventListener('touchend', touchEndEventHandler);
            ctx.canvas.removeEventListener('touchmove', touchMoveEventHandler);
        } else {
            ctx.canvas.removeEventListener('mousedown', mouseDownEventHandler);
            ctx.canvas.removeEventListener('mouseup', mouseUpEventHandler);
            ctx.canvas.removeEventListener('mousemove', mouseMoveEventHandler);
        }
    }

    const drawSlider = (ctx: CanvasRenderingContext2D) => {
        const { height: rectHeight, width: rectWidth } = ctx.canvas;
        ctx.beginPath()
        ctx.clearRect(0, 0, rectWidth, rectHeight)
        ctx.roundRect(x - 9, rectHeight / 2.5, 18, 30, 2)
        ctx.rect(x - 1.5, 0, 3, 22)
        ctx.fillStyle = disabled ? 'gray' : 'rgb(220, 84, 59)'
        ctx.fill()
        if (!disabled) {
            ctx.fillStyle = 'black'
            ctx.font = '18px Arial';
            ctx.fillText(`Time`, rectWidth / 4, rectHeight - 2)
            ctx.fillStyle = 'rgb(220, 84, 59)'
            ctx.fillText(`${(x / rate).toFixed(2)}s`, rectWidth / 4 + 44, rectHeight - 2)
        } 
        ctx.beginPath()
        ctx.globalCompositeOperation = 'destination-over'
        ctx.moveTo(0, rectHeight / 4 * 2.4)
        ctx.lineTo(rectWidth, rectHeight / 4 * 2.4)
        ctx.strokeStyle = 'gray'
        ctx.stroke()
    }

    useEffect(() => {
        const ctx = canvas?.current?.getContext('2d');
        if (ctx) {
            drawSlider(ctx)
        }
        // @ts-ignore
    }, [window.mobileCheck() && drawSlider, disabled])

    useEffect(() => {
        const ctx = canvas?.current?.getContext('2d');
        if (ctx && isDrag && !disabled) {
            drawSlider(ctx)
        }
    }, [x, isDrag, drawSlider, disabled])

    useEffect(() => {
        const ctx = canvas?.current?.getContext('2d');
        if (ctx) {
            if (disabled) {
                removeEventListeners(ctx)
            } else {
                addEventListeners(ctx)
            }
        }
    }, [disabled, addEventListeners, removeEventListeners])

    useEffect(() => {
        onChange(x / rate)
    }, [x])

    useEffect(() => {
        curStep === 0 && setX(initialTime * rate)
    }, [curStep])

    return (
        <div style={{width, height: thickness, position: 'absolute', bottom: -30, zIndex: 1}}>
            <canvas ref={canvas} height={thickness} width={width} />
        </div>
    );
};
export default TimeSlider;