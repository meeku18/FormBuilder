import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField";
export type SubmitFunction = (key:string,value:string) => void;
export type FormElement = {
  type: ElementsType;   

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon : React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>; // text field ka name aur placeholder aur ek helper text
  formComponent: React.FC<{ elementInstance: FormElementInstance
    submitValue?: (key:string,value:string) => void
   }>;// preview ke time ye use krunga
  propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>;
};
type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};
