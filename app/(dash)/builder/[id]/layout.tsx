import { ReactNode } from "react"
export default function({children}:{children:ReactNode}){
    return <div className="w-full flex flex-grow">
        {children}
    </div>
}