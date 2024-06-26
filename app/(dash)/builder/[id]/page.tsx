import { GetFormById } from "@/actions/form";
import {FormBuilder} from "@/components/FormBuilder";
import React from "react";

async function Builderpage({params}:{params:{
    id:string
}}){  
    const {id} = params; 
    const form = await GetFormById(Number(id));
    if(!form){
        console.log("form is null");
    }
    console.log("builder",form?.content);
    if(!form){
        throw new Error("form not found");
    }
    return <FormBuilder form={form}/>
}

export default Builderpage;