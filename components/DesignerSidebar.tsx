import { FormElements } from "./FormElements";
import PropertiesFormSideBar from "./PropertiesFormSideBar";
import SiderBarBtnElement from "./SideBarBtnElement";
import { useDesigner } from "./hooks/useDesigner";

export default function(){
    const {selectedElement } = useDesigner();
    
    

    return <div className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2
    border-muted  bg-background overflow-y-auto h-full p-4">
        {!selectedElement &&
        <div>
            Elements
            <SiderBarBtnElement formElement ={FormElements.TextField}/>
        </div>}
        {selectedElement && 
            <PropertiesFormSideBar/>
        }
    </div>
}