import AdminLayout from "./adminLayout"

export default function withAdminLayout(Component){
    return props=> (
        <AdminLayout>           
            <Component {...props}/>
        </AdminLayout>
    )
}