"use client";

import DesignerSidebar from "./DesignerSidebar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import { useState } from "react";

import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { useDesigner } from "./hooks/useDesigner";
("./hooks/useDesigner");

export default function Designer() {
  const { elements, addElement, selectedElement, setSelectedElement } =
    useDesigner();
  console.log("Elements", elements);
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          Math.floor(Math.random() * 10001).toString()
        );
        console.log("New element", newElement);
        addElement(0, newElement);
      }
      console.log("Drag end", event);
    },
  });

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full "
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className="bg-background max-w-[1060px] h-full 
        m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto"
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex items-center flex-grow font-bold">
              Drop Here
            </p>
          )}
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full text-background gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}
function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const DesignerElement = FormElements[element.type].designerComponent;

  console.log("Selected item", selectedElement);

  return (
    <div
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full rounded-md rounded-l-none"
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <p className="text-muted-foreground text-sm">
              Click for properties
            </p>
          </div>
        </>
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 py-2 px-4 pointer-events-none",
          mouseIsOver && "opacity-10"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}
