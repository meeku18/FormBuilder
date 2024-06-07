import { ReactNode } from "react"
export function layout({children}:{children:ReactNode}){
    return <div className="w-full flex flex-grow">
        {children}
    </div>
}