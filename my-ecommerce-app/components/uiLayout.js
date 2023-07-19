import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function UILayout({ children }) {
    const [user,setUser] = useState(undefined);
    const [shoppingCartCount, setShoppingCartCount] = useState(0);

    useEffect(()=> {
        if(localStorage.getItem("user")){
           setUser(JSON.parse(localStorage.getItem("user")));
           const user = JSON.parse(localStorage.getItem("user"));
           axios.post("/api/ui/shoppingCarts/getCount",{userId: user._id})
           .then(res=> setShoppingCartCount(res.data.count));
        }
    },[]);

    function logout(){
        localStorage.removeItem("user");
        setUser(undefined);
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/">
                        <i className="fa fa-home mx-1"></i>
                        Ana Sayfa
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                user !== undefined ? 
                                (<li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/orders">
                                    Siparişler
                                </Link>
                                </li>)
                                : <></>
                            }                            
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/admin">
                                    Firma Girişi
                                </Link>
                            </li>
                        </ul>
                        {user !== undefined ? 
                        (
                            <>                            
                            <div className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle ui-profile"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa-solid fa-user" style={{fontSize:"20px"}}></i>
                                    <span className="ms-1">{user?.name}</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Profil
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={logout} className="dropdown-item">
                                            Çıkış Yap
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-item ms-3">
                                <Link href="/shopping-carts" className="shopping-cart">                                    
                                    <i className="fa-solid fa-shopping-cart"></i> 
                                    <span className="mx-1">Sepetim</span>
                                    {
                                        shoppingCartCount > 0
                                        ? <span className="badge bg-primary">{shoppingCartCount}</span>
                                        : <span></span>
                                    }
                                </Link>
                            </div>
                            </>
                        )
                            : <Link href="/login">Giriş Yap</Link>
                        }
                        
                        
                    </div>
                </div>
            </nav>
            <section className="mt-2">
                {children}
            </section>
        </div>
    )
}

export default UILayout;