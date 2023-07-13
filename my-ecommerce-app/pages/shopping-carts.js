import React, { useEffect, useState } from 'react'
import withUILayout from '@/components/withUILayout'
import axios from 'axios';
import { get } from 'mongoose';
import trCurrency from '@/services/trCurreny';

function shoppingCarts() {
    const [shoppingCarts, setShoppingCarts] = useState([]);
    const [user, setUser] = useState({});


    useEffect(()=> {
        if(localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem("user")));
            getAll();
        }
    },[])

    async function getAll(){
        const user = JSON.parse(localStorage.getItem("user"));
        const result = await axios.post("/api/ui/shoppingCarts/getAll",{userId: user._id});        
        setShoppingCarts(result.data);
    }

    return (
        <>
        <h1>Sepetim</h1>
        <hr/>
        <div className='row'>
            <div className='col-lg-9 col-md-9 col-12'>
                <table className='table table-hover table-bordered'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ürün Resmi</th>
                            <th>Ürün Adı</th>
                            <th>Adet</th>
                            <th>Birim Fiyatı</th>
                            <th>Toplam</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shoppingCarts.map((val,i)=> {
                            return(
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <img src={val.products[0]?.mainImageUrl} width={50}/>
                                    </td>
                                    <td>{val.products[0]?.name}</td>
                                    <td>{val.quantity}</td>
                                    <td>{trCurrency(val.products[0]?.price,"₺")}</td>
                                    <td>{trCurrency(val.quantity * val.products[0]?.price,"₺")}</td>
                                    <td>
                                        <button className='btn btn-sm btn-outline-danger'>
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='col-lg-3 col-md-3 col-12'>
                <h1>Ödenecek Tutar</h1>
                <h3>50.000,00 ₺</h3>
                <button className='btn btn-danger w-100'>
                    <i class="fa-solid fa-credit-card"></i>
                    <span className='ms-2'>Ödeme Yap</span>
                </button>
            </div>

        </div>
        </>
    )
}

export default withUILayout(shoppingCarts);
