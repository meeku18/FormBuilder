"use client";

import { useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "./ui/use-toast";
import { SubmitForm } from "@/actions/form";


export function FormSubmitComponent({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;

  };
  const submitForm = async() => {
    console.log("FORM values", formValues.current);
    try{
        const jsonContent   = JSON.stringify(formValues.current);
        await SubmitForm(formUrl,jsonContent);
        setSubmitted(true);
    }catch(error){
        toast({
            title:"Error",
            description:"Something went wrong",
            variant:"destructive",
        })
    }
  };

  if(submitted){
    return<div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto">
            <h1 className="text-2xl font-bold">Form submitted</h1>
            <p className="text-muted-foreground">
                Thank you for submitting the form you can close this page now.
            </p>
        </div>
    </div>
  }
  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={pending}
        >
          {!pending && <>Submit</>}
          {pending && <ImSpinner2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}
