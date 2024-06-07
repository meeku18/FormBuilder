"use client"
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { useState } from "react";

export function DragOverlayWrapper(){
    const [draggedItem,setdraggedItem] = useState<Active|null>(null);

    useDndMonitor({
        onDragStart : (event) =>{
            console.log(event);
        },
        onDragCancel:()=>{
            setdraggedItem(null);
        },
        onDragEnd:()=>{
            setdraggedItem(null);
        }
    })

    const node = <div>No drag overlay</div>

    return <DragOverlay>
       {node}
    </DragOverlay>
}