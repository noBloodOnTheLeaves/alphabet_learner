'use client';

import {useEffect, useState} from "react";
import CanvasDraw from "react-canvas-draw-v2";

export function CanvasDrawer({
    setDrawer= () => {},
    onClear = () => {}
}) {
    const [size, setSize] = useState({width: 500, height: 500})

    useEffect(() => {
        // Function to check if the device is mobile
        const checkIfMobile = () => {
            const width = window.innerWidth;
            if(width < 768){
                setSize({width: 300, height: 300})
            }else{
                setSize({width: 500, height: 500})
            }

        };

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Initial check on component mount
        checkIfMobile();

        // Cleanup function to remove event listener
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return (<CanvasDraw
        ref={canvasDraw => (setDrawer(canvasDraw))}
        onClear={onClear}
        lazyRadius='0'
        canvasWidth={size.width}
        canvasHeight={size.height}
        immediateLoading='true'
        loadTimeOffset='0.1'
        brushRadius={5}
        hideGridX={true}
        gridSizeY={120}
        brushColor='#000'
        onChange={() => console.log("onChange")}
    />)
}
