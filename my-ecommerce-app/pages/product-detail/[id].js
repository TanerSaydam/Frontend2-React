import withUILayout from '@/components/withUILayout'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import trCurrency from "@/services/trCurreny";

function ProductDetail() {
    const router = useRouter();
    const [product, setProduct] = useState({});
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        if (router.isReady) {
            getById(router.query.id);
        }
    }, [router.isReady]);

    async function getById(id) {
        const result = await axios.post("/api/ui/products/getById", { _id: id });
        setProduct(result.data);
        setSelectedImage(result.data.mainImageUrl);
        setAmount(result.data.price);
    }

    function changeImage(val){
        setSelectedImage(val);
    }

    useEffect(()=> {
        setAmount(product.price * quantity);
    }, [quantity]);
    
    return (
        <>
            <h1>Ürün Detay Sayfası</h1>
            <hr />
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-12 product-detail-main-img-div'>
                    <img className='product-detail-main-img' src={selectedImage}/>
                    
                    <div className='row mt-2'>
                            <div style={{cursor:"pointer"}} onClick={()=> changeImage(product.mainImageUrl)} className='col-lg-2 col-md-4 col-4 mt-1'>
                                <img className='product-details-img' src={product.mainImageUrl} />
                            </div>
                        {product.imageUrls?.map((val, i) => {
                            return (
                            <div key={i} style={{cursor:"pointer"}} onClick={()=> changeImage(val)} className='col-lg-2 col-md-4 col-4 mt-1'>
                                <img className='product-details-img' src={val} />
                            </div>
                            )
                        })}
                    </div>
                </div>
                <div className='col-lg-6 col-md-6 col-12'>
                    <h1>{product.name}</h1>
                    <p>Firma: {(product.sellers?.[0] ?? {}).name}</p>                    
                    <p>Kategori: {(product.categories?.[0] ?? {}).name}</p>
                    <p>Kalan Adet: {product.stock}</p>
                    <p>Birim Fiyatı: {trCurrency(product.price, "₺")}</p>
                    <hr />
                    <div className='form-group'>
                        <label>Adet</label>
                        <input value={quantity} className='form-control' type="number" style={{width:"60%"}} onChange={e=> setQuantity(e.target.value)} max={product.stock} min="1"/>
                    </div>
                    <p>Ödenecek Tutar: {trCurrency(amount,"₺")}</p>
                    <button className='btn btn-danger'>Sepete Ekle</button>

                </div>
            </div>
        </>
    )
}

export default withUILayout(ProductDetail);