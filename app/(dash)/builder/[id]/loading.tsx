import React from "react";
import { ImSpinner2 } from "react-icons/im";

function Loading(){
    return <div className="w-full h-full flex items-center justify-center">
        <ImSpinner2 className="animate-spin"></ImSpinner2>
    </div>
}
export default Loading;