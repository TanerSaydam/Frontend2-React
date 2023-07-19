import React, { useEffect, useRef, useState } from 'react'
import withUILayout from '@/components/withUILayout'
import axios from 'axios';
import trCurrency from '@/services/trCurreny';
import { toast } from 'react-toastify';

function shoppingCarts() {
    const [shoppingCarts, setShoppingCarts] = useState([]);
    const [user, setUser] = useState({});
    const [total, setTotal] = useState(0);
    const [inputs, setInputs] = useState({});
    const elRefs = useRef([]);
    const [isValid,setIsValid] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
            getAll();
        }
    }, [])

    useEffect(() => {
        let t = 0;
        for (let x of shoppingCarts) {
            t += x.quantity * x.products[0].price;
        }

        setTotal(t);
    }, [shoppingCarts])

    useEffect(()=> {
        checkValidations();
    },[inputs]);

    async function getAll() {
        const user = JSON.parse(localStorage.getItem("user"));
        const result = await axios.post("/api/ui/shoppingCarts/getAll", { userId: user._id });
        setShoppingCarts(result.data);
    }

    const removeById = async (val) => {
        const result = window.confirm(`${val.products[0]?.name} ürünü sepetten silmek istiyor musunuz?`);
        if (result) {
            const apiResponse = await axios.post("/api/ui/shoppingCarts/removeById", { id: val._id });
            toast.info(apiResponse.data.message);
            getAll();
        }
    }

    async function plusOrMinus(productId, type) {
        const user = JSON.parse(localStorage.getItem("user"));
        let quantity = 0;

        if (type === "plus") quantity = 1;
        else quantity = -1;

        const data = {
            userId: user._id,
            productId: productId,
            quantity: quantity
        };

        axios.post("/api/ui/shoppingCarts/add", data)
            .then(res => getAll())
            .catch(err => {
                toast.error(err.response?.data?.message);
            });
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(prev => ({ ...prev, [name]: value }))


        if (!e.target.validity.valid) {
            e.target.classList.add("is-invalid");
            e.target.classList.remove("is-valid");
        } else {
            e.target.classList.remove("is-invalid");
            e.target.classList.add("is-valid");
        }
    }

    function checkValidations() {       
        if (elRefs.current["name"]?.validity.valid &&
            elRefs.current["cartNumber"]?.validity.valid &&
            elRefs.current["expireDate"]?.validity.valid &&
            elRefs.current["cvv"]?.validity.valid) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    async function pay(){
        if(isValid){
            const user = JSON.parse(localStorage.getItem("user"));
            const result = await axios.post("/api/ui/orders/add",{userId:user._id});
            toast.success(result.data.message);
            getAll();
            setInputs({});
        }else{
            for (let key in elRefs.current) {
                if (!elRefs.current[key].validity.valid) {
                    elRefs.current[key].classList.add("is-invalid");
                    elRefs.current[key].classList.remove("is-valid");
                }
            }
        }
    }

    return (
        <>
            <h1>Sepetim</h1>
            <hr />
            {
                shoppingCarts.length > 0 
                ?
                <div className='row'>
                <div className='col-lg-9 col-md-9 col-12 overflow-auto'>
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
                            {shoppingCarts.map((val, i) => {
                                return (
                                    <tr key={i}>
                                        <td style={{ width: "4%" }}>{i + 1}</td>
                                        <td style={{ width: "8%" }}>
                                            <img src={val.products[0]?.mainImageUrl} width={50} />
                                        </td>
                                        <td style={{ width: "38%" }}>{val.products[0]?.name}</td>
                                        <td>
                                            <button onClick={() => plusOrMinus(val.productId, "plus")} className='btn btn-light btn-sm'>+</button>
                                            <span className='mx-2'>{val.quantity}</span>
                                            <button onClick={() => plusOrMinus(val.productId, "minus")} className='btn btn-light btn-sm'>-</button>
                                        </td>
                                        <td>{trCurrency(val.products[0]?.price, "₺")}</td>
                                        <td>{trCurrency(val.quantity * val.products[0]?.price, "₺")}</td>
                                        <td>
                                            <button onClick={() => removeById(val)} className='btn btn-sm btn-outline-danger'>
                                                <i className='fa-solid fa-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='col-lg-3 col-md-3 col-12 text-center'>
                    <h1>Ödenecek Tutar</h1>
                    <h3>{trCurrency(total, "₺")}</h3>
                    <button data-bs-toggle="modal" data-bs-target="#paymentModal" className='btn btn-danger w-100'>
                        <i className="fa-solid fa-credit-card"></i>
                        <span className='ms-2'>Ödeme Yap</span>
                    </button>
                </div>

            </div>
            :
            <h1 className='alert alert-danger'>Sepette ürün bulunamadı!</h1>
            }
            

            {/* Ödeme Modal */}
            <div
                className="modal fade"
                id="paymentModal"
                tabIndex={-1}
                aria-labelledby="paymentModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="paymentModalLabel">
                                Ödeme Yap
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className='form-group'>
                                <label htmlFor='name'>Kart Sahibin Adı</label>
                                <input
                                    className='form-control'
                                    id="name"
                                    name="name"
                                    required
                                    autoComplete='off'
                                    minLength={3}
                                    ref={(ref) => elRefs.current["name"] = ref}
                                    value={inputs["name"] || ""}
                                    onChange={handleChange} />
                                <div className='invalid-feedback'>
                                    Kart sahibin adı boş olamaz
                                </div>
                            </div>

                            <div className='form-group mt-1'>
                                <label htmlFor='cartNumber'>Kart Numarası</label>
                                <input
                                    className='form-control'
                                    id="cartNumber"
                                    name="cartNumber"
                                    required
                                    autoComplete='off'
                                    minLength={16}
                                    maxLength={16}
                                    ref={(ref) => elRefs.current["cartNumber"] = ref}
                                    value={inputs["cartNumber"] || ""}
                                    onChange={handleChange} />
                                <div className='invalid-feedback'>
                                    Kart numarası 16 karakter olmalıdır
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-6'>
                                    <div className='form-group mt-1'>
                                        <label htmlFor='expireDate'>Son Kullanma Tarihi</label>
                                        <input
                                            className='form-control'
                                            id="expireDate"
                                            name="expireDate"
                                            required
                                            autoComplete='off'
                                            minLength={7}
                                            maxLength={7}
                                            ref={(ref) => elRefs.current["expireDate"] = ref}
                                            value={inputs["expireDate"] || ""}
                                            onChange={handleChange} />
                                        <div className='invalid-feedback'>
                                            Son kullanma tarihi aa/yyyy olmalıdır
                                        </div>
                                    </div>
                                </div>

                                <div className='col-6'>
                                    <div className='form-group mt-1'>
                                        <label htmlFor='cvv'>CVV</label>
                                        <input
                                            className='form-control'
                                            id="cvv"
                                            name="cvv"
                                            required
                                            autoComplete='off'
                                            minLength={3}
                                            maxLength={3}
                                            ref={(ref) => elRefs.current["cvv"] = ref}
                                            value={inputs["cvv"] || ""}
                                            onChange={handleChange} />
                                        <div className='invalid-feedback'>
                                            CVV alanı 3 karakter olmalıdır
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button onClick={pay} type="button" data-bs-dismiss="modal" className="btn btn-danger w-100">
                                Ödeme Yap
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default withUILayout(shoppingCarts);
