import React, { useEffect, useRef, useState } from 'react';

type BeakerTicksProps = {
    max: number
    height?: string | number | undefined
    width?: string | number | undefined
    direction?: 'horizontal' | 'vertical'
    distance?: number
    showThumbIndex: number[]
    values: number[]
    onChange: (val: number, index: number) => void
}

const CanvasSlider = (props: BeakerTicksProps) => {
    const {
        max,
        width = 220,
        direction = 'Horizontal',
        distance = 13,
        showThumbIndex,
        values,
        onChange,
    } = props;
    const valLeft = values[0]
    const valRight = values[1]

    const minDisabled = showThumbIndex[0] === 1 ? true : false
    const maxDisabled = showThumbIndex[1] === 1 ? true : false
    const isLeftOverlap = maxDisabled || valLeft > max - max * 0.1
    const isHorizontal = direction === 'horizontal'
    const canvas = useRef<HTMLCanvasElement>(null);
    const maxCanvas = useRef<HTMLCanvasElement>(null);
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const [isDrag, startDrag] = useState<boolean>(false)
    const thickness = 30
    useEffect(() => {
        const ctx = canvas?.current?.getContext('2d');
        const maxCtx = maxCanvas?.current?.getContext('2d');

        if (ctx) {
            minDisabled && removeEventListeners(ctx)
            !minDisabled && addEventListeners(ctx)
        }
        if (maxCtx && !minDisabled) {
            maxCtx.canvas.style.position = "absolute"
            maxCtx.canvas.style.left = "0px"
            maxDisabled && removeEventListeners(maxCtx)
            !maxDisabled && addEventListeners(maxCtx)
        }
    }, [])

    const touchStartEventHandler = function (event: any) {
        if (event.touches.length) {
            const rect = event.target.getBoundingClientRect();
            const currX = event.touches[0].clientX - rect.left
            setX(currX)
        }
        startDrag(true)
    }

    const touchMoveEventHandler = function (event: any) {
        if (event.touches.length) {
            const rect = event.target.getBoundingClientRect();
            const currX = event.touches[0].clientX - rect.left
            setX(currX)
        }
    };

    const touchEndEventHandler = function (event: any) {
        startDrag(false)
    }

    const mouseDownEventHandler = function (event: any) {        
        setX(event.offsetX)
        startDrag(true)
    }

    const mouseMoveEventHandler = function (event: any) {
        setX(event.offsetX)
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

    const drawSlider = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        line: boolean,
    ) => {
        const { height: rectHeight, width: rectWidth } = ctx.canvas;
        ctx.beginPath()
        ctx.clearRect(0, 0, rectWidth, rectHeight)

        if (line) {
            if (isHorizontal) {
                ctx.moveTo(0, rectHeight / 2)
                ctx.lineTo(rectWidth, rectHeight / 2)
                ctx.strokeStyle = 'black'
                ctx.stroke()
            } else {
                ctx.moveTo(rectWidth / 2, 0)
                ctx.lineTo(rectWidth / 2, rectHeight)
                ctx.strokeStyle = 'black'
                ctx.stroke()
            }
        }

        const nx = isHorizontal ? x - 9 : 0
        const ny = !isHorizontal ? y - 9 : 0
        ctx.roundRect(nx, ny, !isHorizontal ? 30 : 18, direction === 'horizontal' ? 30 : 18, 3)
        ctx.fillStyle = 'rgb(220, 84, 59)'
        if (ctx.canvas === canvas.current && minDisabled) ctx.fillStyle = 'gray'
        if (ctx.canvas === maxCanvas.current && maxDisabled) ctx.fillStyle = 'gray'
        ctx.fill()
    }

    useEffect(() => {
        const ctx = canvas?.current?.getContext('2d');
        // const maxCtx = maxCanvas?.current?.getContext('2d');
        if (ctx && !minDisabled) {
            if (isDrag) {
                drawSlider(ctx, Math.max(9, x), y, true)
                onChange(x, y)
            } else {            
                drawSlider(ctx, valLeft, y, true)
            }
        } 
        // if (maxCtx && isDrag && x > (valLeft + 16) && x < 152) {
        //     maxCtx.canvas.style.position = "absolute"
        //     maxCtx.canvas.style.left = "0px"
        //     // console.log({ valLeft, x })
        //     // onChange(x, y)
        //     drawSlider(maxCtx, Math.max(9, x), y, false)
        // }
        // console.log({ x, y })
    }, [x, y, isDrag, minDisabled])

    useEffect(() => {
        const ctx = canvas?.current?.getContext('2d');
        if (ctx && !isDrag) {
            drawSlider(ctx, valLeft, y, true)
        }
    }, [isDrag])

    return (
        <>
            <canvas ref={canvas} height={!isHorizontal ? width : thickness} width={direction === 'horizontal' ? width : thickness} />
            <canvas ref={maxCanvas} height={!isHorizontal ? width : thickness} width={direction === 'horizontal' ? width : thickness} />
        </>
    );
};
export default CanvasSlider;