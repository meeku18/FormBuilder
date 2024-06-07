import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";

export async function SubmitPage({params}:{
    params:{
        formUrl:string
    }
}){

    const form = await GetFormContentByUrl(params.formUrl);
    const formContent = JSON.parse(form.content) as FormElementInstance[];
    return <FormSubmitComponent formUrl ={params.formUrl} content={formContent}/>
}