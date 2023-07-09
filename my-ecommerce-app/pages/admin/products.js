import withAdminLayout from '@/components/withAdminLayout'
import trCurrency from '@/services/trCurreny';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Products() {
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("seller")) {
            getAll();
        } else {
            router.push("/admin/login");
        }
    }, []);

    async function getAll() {
        const seller = JSON.parse(localStorage.getItem("seller"));

        const result = await axios.post("/api/admin/products/getAll", { sellerId: seller._id })
        setProducts(result.data);
    }    

    async function changeStatus(_id){
        await axios.post("/api/admin/products/changeStatus", {_id: _id});
        getAll();
    }

    return (
        <>
            <h1>Ürünler</h1>
            <hr />
            <div className='form-group'>
                <div className='row'>
                    <div className='col-lg-8 col-md-8 col-3'>
                        <Link href="/admin/product-add" className='btn btn-outline-primary'>
                            <i className='fa fa-plus'></i>
                        </Link>
                    </div>
                    <div className='col-lg-4 col-md-4 col-9'>
                        <input type='search' className='form-control' placeholder='Aranacak değer...' />
                    </div>
                </div>
            </div>
            <div className='form-group mt-2'>
                <table className='table table-hover table-bordered overflow-x'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ürün Resmi</th>
                            <th>Ürün Adı</th>
                            <th>Kategori</th>
                            <th>Satış Fiyatı</th>
                            <th>Stok Adedi</th>
                            <th>Sat.Dur.Değiştir</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((val, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className='text-center'>
                                        <img className='product-logo' src={val.mainImageUrl} />
                                        {
                                            (val.imageUrls.length > 0 && val.imageUrls[0] !== "") 
                                            ? <div className='row m-1'>
                                                {val.imageUrls.map((p, i) => {
                                                    return (
                                                        <div key={i} className='col-3 mx-auto product-img-div'>
                                                            <img className='product-img' src={p} />
                                                        </div>
                                                    )
                                                })}
                                            </div> 
                                            : <span></span>
                                        }

                                    </td>
                                    <td>
                                        {val.name}</td>
                                    <td>{val.categories[0].name}</td>
                                    <td>{trCurrency(val.price, "₺")}</td>
                                    <td>{val.stock}</td>
                                    <td className='text-center'>{val.isActive ?
                                        <button onClick={()=> changeStatus(val._id)} className='btn btn-outline-danger btn-sm' title="Satıştan Kaldır">
                                            Kaldır <i className='fa fa-x mx-1'></i></button> :
                                        <button onClick={()=> changeStatus(val._id)} className='btn btn-outline-info btn-sm' title="Satışa Al">
                                            Ekle<i className='fa fa-check mx-1'></i></button>}</td>
                                    <td>
                                        <button className='btn btn-outline-warning btn-sm m-1' title="Güncelle">
                                            <i className='fa fa-edit'></i>
                                        </button>
                                        <button className='btn btn-outline-danger btn-sm m-1' title="Sil">
                                            <i className='fa fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default withAdminLayout(Products);