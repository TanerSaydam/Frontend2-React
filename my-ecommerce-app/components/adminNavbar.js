import Link from 'next/link'
import React from 'react'

export default function AdminNavbar(props) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/admin">
                        <h3>
                        Satıcı Paneli
                        </h3>
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
                            <li className="nav-item">
                                <Link href="/" className="nav-link active" aria-current="page">
                                    Kullanıcı Arayüzü
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/admin/products" className="nav-link active" aria-current="page">
                                    Ürünler
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/admin/orders">
                                    Siparişler
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    Raporlar
                                </a>
                            </li>
                        </ul>
                        <div className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img className="nav-logo" src={props.seller?.imageUrl} />
                                    {props.seller?.name}
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Profil
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={props.logout} className="dropdown-item">
                                            Çıkış Yap
                                        </a>
                                    </li>
                                </ul>
                            </div>
                    </div>
                </div>
    </nav>
  )
}
