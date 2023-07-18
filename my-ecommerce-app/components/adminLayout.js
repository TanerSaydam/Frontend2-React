import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminNavbar from "./adminNavbar";

function AdminLayout({ children }) {
    const [seller, setSeller] = useState();
    const router = useRouter();

    useEffect(()=> {
        if(localStorage.getItem("seller")){
            setSeller(JSON.parse(localStorage.getItem("seller")));
        }else{
            router.push("/admin/login");
        }
    },[])

    const logout = () =>{
        localStorage.removeItem("seller");
        router.push("/admin/login");
    }

    return (
        <div className="container">
            <AdminNavbar logout={logout} seller={seller}/>
            <section className="mt-2">
                {children}
            </section>
        </div>
    )
}

export default AdminLayout;