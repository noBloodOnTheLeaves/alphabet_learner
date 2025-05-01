'use client';

import CanvasDraw from "react-canvas-draw-v2";

export function CanvasDrawer({
    setDrawer= () => {},
    onClear = () => {}
}) {
    return (<CanvasDraw 
        ref={canvasDraw => (setDrawer(canvasDraw))}
        onClear={onClear}
        lazyRadius='0'
        immediateLoading='true'
        loadTimeOffset='0.1'
        brushRadius={5}
        hideGridX={true}
        gridSizeY={120}
        brushColor='#000'
        onChange={() => console.log("onChange")}
    />)
}