import { ImSpinner2 } from "react-icons/im";

export default function loading(){
    return <div className="w-full h-full flex items-center justify-center">
        <ImSpinner2 className="animate-spin"></ImSpinner2>
    </div>
}