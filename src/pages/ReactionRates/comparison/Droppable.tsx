
import React, { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import useAppData from '../../../hooks/useAppData';

const Droppable = (props: any) => {
    const { setIsOver } = useAppData()
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const { style } = props
    // const style: any = {
    // opacity: isOver ? 1 : 0.5,
    // position: 'absolute',
    // };
    useEffect(() => {
        setIsOver(isOver)
    }, [isOver])

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}

export default Droppable
