import { ReactNode } from "react"
export default function({children}:{children:ReactNode}){
    return <div className="w-full flex flex-col flex-grow">
        {children}
    </div>
}