import withUILayout from '@/components/withUILayout'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import trCurrency from "@/services/trCurreny";
import { toast } from 'react-toastify';
import moment from 'moment';

function ProductDetail() {
    const router = useRouter();
    const [product, setProduct] = useState({});
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [amount, setAmount] = useState(0);
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});
    const [stars, setStars] = useState({ fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 })
    const [comments, setComments] = useState([]);
    const [average, setAverage] = useState([]);

    useEffect(() => {
        if (router.isReady) {
            getById(router.query.id);
            getProductComments();
        }
    }, [router.isReady]);

    useEffect(() => {
        setAmount(product.price * quantity);
    }, [quantity]);

    useEffect(() => {
        console.log(localStorage.getItem("user"))
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, [])

    function convertDate(date) {
        return moment(date).format('DD.MM.YYYY HH:mm:ss');
    }

    async function addShoppingCart() {
        const data = {
            userId: user._id,
            productId: router.query.id,
            quantity: quantity
        };

        const result = await axios.post("/api/ui/shoppingCarts/add", data);
        toast.success(result.data.message);
        router.push("/");
    }

    async function getById(id) {
        const result = await axios.post("/api/ui/products/getById", { _id: id });
        setProduct(result.data);
        setSelectedImage(result.data.mainImageUrl);
        setAmount(result.data.price);
    }

    function changeImage(val) {
        setSelectedImage(val);
    }

    async function getProductComments() {
        const result = await axios.post("/api/ui/products/getRatesAndComments", { productId: router.query.id });

        setStars({
            fiveStar: result.data.fiveStar,
            fourStar: result.data.fourStar,
            threeStar: result.data.threeStar,
            twoStar: result.data.twoStar,
            oneStar: result.data.oneStar
        });

        let resultAverageList = [];

        for (let x = 0; x < result.data.average; x++) {
            resultAverageList.push("&#9733;")
        }

        setAverage(resultAverageList);

        const resultComments = [];
        for (let x of result.data.orders) {
            if (x.comment !== null && x.comment !== undefined) {
                resultComments.push({ user: x.users[0], comment: x.comment, date: x.date, rate: x.rate });
            }
        }
        setComments(resultComments);
    }

    function returnRateToStar(rate){
        const arr = [];
        for(let x = 0; x<rate ;x ++){
            arr.push(x);
        }

        return arr;
    }

    return (
        <>
            <h1>Ürün Detay Sayfası</h1>
            <hr />
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-12 product-detail-main-img-div'>
                    <img className='product-detail-main-img' src={selectedImage} />

                    <div className='row mt-2'>
                        <div style={{ cursor: "pointer" }} onClick={() => changeImage(product.mainImageUrl)} className='col-lg-2 col-md-4 col-4 mt-1'>
                            <img className='product-details-img' src={product.mainImageUrl} />
                        </div>
                        {product.imageUrls?.map((val, i) => {
                            return (
                                <div key={i} style={{ cursor: "pointer" }} onClick={() => changeImage(val)} className='col-lg-2 col-md-4 col-4 mt-1'>
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

                    {
                        isAuth ? (
                            <>
                                <hr />
                                <div className='form-group'>
                                    <label>Adet</label>
                                    <input value={quantity} className='form-control' type="number" style={{ width: "60%" }} onChange={e => setQuantity(e.target.value)} max={product.stock} min="1" />
                                </div>
                                <p>Ödenecek Tutar: {trCurrency(amount, "₺")}</p>
                                <button onClick={addShoppingCart} className='btn btn-danger'>Sepete Ekle</button>
                            </>
                        )
                            :
                            <span className='alert alert-danger mt-2'>
                                Sepete eklemek için giriş yapmalısınız!

                            </span>
                    }


                </div>

            </div>
            <hr />
            <div className='container mt-4'>
                <h3>Ürün Değerlendirmesi (Ortalama Puanı: <span className='text-warning'>
                    {average.map((val, i) => <i class="fa-solid fa-star text-warning"></i>)}
                </span>)</h3>
                <div className='form-group'>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <span>({stars.fiveStar})</span>
                </div>
                <div className='form-group'>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star"></i>
                    <span>({stars.fourStar})</span>
                </div>
                <div className='form-group'>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <span>({stars.threeStar})</span>
                </div>
                <div className='form-group'>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <span>({stars.twoStar})</span>
                </div>
                <div className='form-group'>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <span>({stars.oneStar})</span>
                </div>
            </div>
            <hr />
            <div className='container'>
                <h3>Yorum Alanı</h3>
                {
                    comments.map((val, i) => {
                        return (
                            <div className='form-group mt-1' key={i}>
                                <div className="card">
                                    <div className='d-flex card-header'>
                                        <i className='fa-solid fa-user fa-md' style={{ border: "1px solid", borderRadius: "50px", padding: "10px" }}></i>
                                        <span className='ms-1 mt-1 text-danger bold'>{val.user.name}</span>
                                        <span className='ms-1 mt-1'>{convertDate(val.date)}</span>
                                        <span className='ms-1 mt-1'>
                                            {/* {Array.from({ length: val.rate }, (_, i) => i + 1).map((_, i) => (
                                                <i key={i} className="fa-solid fa-star text-warning"></i>
                                            ))}  */}

                                            {returnRateToStar(val.rate).map((val,i)=> <i key={i} className="fa-solid fa-star text-warning"></i>)}
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">
                                            {val.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            <div style={{ marginBottom: "1000px" }}></div>
        </>
    )
}

export default withUILayout(ProductDetail);