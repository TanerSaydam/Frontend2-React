import UILayout from "./uiLayout"

export default function withAdminLayout(Component){
    return props=> (
        <UILayout>           
            <Component {...props}/>
        </UILayout>
    )
}