import { UpdateFormContent } from "@/actions/form";
import { useDesigner } from "./hooks/useDesigner";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { useTransition } from "react";  

export  function SaveFormBtn({id}:{id:number}){
    const {elements} =useDesigner();
    const [loading,startTransition] = useTransition();

    const updateFormContent = async ()=>{
        try{
            const JsonElements = JSON.stringify(elements);
            await UpdateFormContent(id,JsonElements);
        }catch(error){
            toast({
                title:"Error",
                description:"Something went wrong",
                variant:"destructive"
            })
        }
    }
    return <Button variant={"outline"} className="mr-2" disabled={loading} onClick={()=>{
        startTransition(updateFormContent);
    }}>Save</Button>
}