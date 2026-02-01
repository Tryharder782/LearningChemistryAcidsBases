import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import useAppData from '../../../hooks/useAppData';

const Draggable = (props: any) => {
    const { setDragOrder } = useAppData()
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    const style = {
        // Outputs `translate3d(x, y, 0)`
        transform: CSS.Translate.toString(transform),
        background: 'transparent',
        border: 'none',
        zIndex: 9999,
        cursor: 'pointer',
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} onMouseMove={() => setDragOrder(props.id)}>
            {props.children}
        </div>
    );
}

export default Draggable