import withAdminLayout from '@/components/withAdminLayout'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Products() {
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if(localStorage.getItem("seller")){
            getAll();
        }else{
            router.push("/admin/login");
        }
    },[]);

    async function getAll() {
        const seller = JSON.parse(localStorage.getItem("seller"));

        const result = await axios.post("/api/admin/products/getAll", { sellerId: seller._id })
        setProducts(result.data);
    }

    function trCurrency(value = 0, symbol = ""){
        if (value == 0) {            
            return "0,00 " + symbol;
          }
      
          let isValueNegative = false;
          if(value < 0){
            isValueNegative = true;
            value *= -1;
          }
      
          let money = value.toString().split(".")
          let newMoney = "";
          let lira = money[0];
          let penny = "00";
          if (money.length > 1) {
            penny = money[1]
            if (penny.length == 1) {
              penny = penny + "0"
            }
      
            if (penny.length > 1) {
              penny = penny.substring(0,2);
            }
          }
      
          let count = 0;
          for (let i = lira.length; i > 0; i--) {      
            if (count == 3 && count < (lira.length)) {
              newMoney = lira[i-1] + "." + newMoney 
              count = 1;
            }else{
              newMoney = lira[i-1] + newMoney
              count++;
            }
          }
          newMoney = `${newMoney},${penny} ${symbol}`;
      
          if(isValueNegative){
            newMoney = "-" + newMoney;
          }    
          return newMoney;
    }

    return (
        <>
            <h1>Ürünler</h1>
            <hr />
            <div className='form-group'>
                <div className='row'>
                    <div className='col-lg-8 col-md-8 col-3'>
                        <button className='btn btn-outline-primary'>
                            <i className='fa fa-plus'></i>
                        </button>
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
                            <th>Satış Fiyatı</th>
                            <th>Stok Adedi</th>
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
                                        <div className='row m-1'>
                                            {val.imageUrls.map((p,i)=> {
                                                return(
                                                    <div key={i} className='col-3 mx-auto product-img-div'>
                                                        <img className='product-img' src={p}/>
                                                    </div>
                                                )
                                            })}
                                            
                                        </div>
                                    </td>
                                    <td>
                                        {val.name}</td>
                                    <td>{trCurrency(val.price, "₺")}</td>
                                    <td>{val.stock}</td>
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