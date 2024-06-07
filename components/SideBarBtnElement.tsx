"use client";
import React from "react";
import { FormElement } from "./FormElements";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";

export function SiderBarBtnElement({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      variant={"outline"}
      className="flex flex-col gap-2 h-[100px] w-[100px] cursor-grab"
    >
      <Icon className="h-8 w-8" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
