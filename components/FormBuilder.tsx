"use client";

import { Form } from "@prisma/client";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishedFormBtn from "./PublishedFormBtn";
import Designer from "./Designer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import { useEffect } from "react";
import { useDesigner } from "./hooks/useDesigner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function ({ form }: { form: Form }) {

  const {setElements} = useDesigner();

  useEffect(()=>{
    const element = JSON.parse(form.content);
    console.log(element);
    setElements(element);
  },[form,setElements]);

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`
  if(form.published){
    return(
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="max-w-md">
          <h1 className="text-center text-4xl text-primary border-b pb-2 mb-10">Form Published</h1>
          <h2 className="text-2xl">Shar this form</h2>
          <h3 className="text-xl text-muted-foreground border-b pb-10">
            Anyone with link can view and submit the form
          </h3>
          <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
            <Input className="w-full" readOnly value={shareUrl}></Input>
            <Button className="mt-2 w-full " onClick={()=>{
              navigator.clipboard.writeText(shareUrl);
              toast({
                title:"Copied!",
                description:"Link copied to clipboard"
              })
            }}>Copy Link</Button>
          </div>
          <div className="flex justify-between">
            <Button variant={"link"} asChild>
              <Link href={"/"} className="gap-2">
                <BsArrowLeft/>
                Go Back Home
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href={`/form/${form.id}`} className="gap-2">
                Form details
                <BsArrowRight/>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <DndContext>
    <div className="flex flex-col w-full ">
      <div className=" flex justify-between border-b-2 p-2 items-center">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Form:</span>
          {form.name}
        </h2>
        <div className="flex items-center gap-2">
          <PreviewDialogBtn />
          {!form.published && (
            <div>
              <SaveFormBtn id={form.id}/>
              <PublishedFormBtn id={form.id}/>
            </div>
          )}
        </div>
      </div>

      <div
        className="flex  w-full flex-grow item-center justify-center
        overflow-y-auto h-[200px] bg-[url(/texture.svg)] dark:bg-[url(/texture-dark.svg)]"
      >
        <Designer/>
      </div>
    </div>
    <DragOverlayWrapper/>
    </DndContext>
  );
}
