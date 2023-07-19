import trCurrency from '@/services/trCurreny';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import moment from 'moment';
import withUILayout from '@/components/withUILayout'

function Orders() {
    const [orders, setOrders] = useState([]);
    const [orgOrders, setOrgOrders] = useState([]);
    const [orderId,setOrderId] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");
    const commentRef = useRef();
    const [comment, setComment] = useState("");
    const [star,setStar] = useState("5");

    useEffect(() => {
        getAll();
    }, []);

    async function getAll() {
        const user = JSON.parse(localStorage.getItem("user"));
        const result = await axios.post("/api/ui/orders/getAll", { userId: user._id });
        setOrders(result.data);
        setOrgOrders(result.data);
    }    

    function search(e){
        const value = e.target.value;
        const newOrders = orgOrders.filter(
            p=> 
                p.products.name.toLowerCase().includes(value.toLowerCase()) ||
                p.status.toLowerCase().includes(value.toLowerCase()) ||
                p.trackingNumber.toLowerCase().includes(value.toLowerCase()))
        setOrders(newOrders);
    }   
  
    const handleChange = (e) => {
        setComment(e.target.value);

        if (!e.target.validity.valid) {
            e.target.classList.add("is-invalid");
            e.target.classList.remove("is-valid");
        } else {
            e.target.classList.remove("is-invalid");
            e.target.classList.add("is-valid");
        }        
    }  

    function convertDate(date){
        return moment(date).format('DD.MM.YYYY HH:mm:ss');
    }

    async function checkOut(id){
        const result = await axios.post("/api/ui/orders/checkOut",{id: id});
        toast.success(result.data.message);
        getAll();
    }

    function openCommentModal(order){
        setOrderId(order._id);
        console.log(order.rate);
        if(order.rate === undefined){
            setStar("5");
            setComment("");
        }else{
            setStar(order.rate);
            setComment(order.comment);
        }
    }

    async function saveComment(){
        const sendData = {
            _id: orderId,
            rate: star,
            comment: comment
        };

        const result = await axios.post("/api/ui/orders/saveComment",sendData);
        toast.success(result.data.message);
        getAll();
    }

    function checkStatus(order) {
        if (order.status === "Onay Bekliyor") {
            return (
                <>
                    <p>Onaylaması bekleniyor</p>
                </>
            )
        } else if (order.status === "Sipariş Onaylandı") {
            return (
                <>
                   <p>Kargolanması bekleniyor</p>
                </>
            )
        }else if(order.status === "Sipariş Reddedildi"){
            return <></>
        }else if(order.status === "Sipariş Kargoya Verildi"){
            return(
                <>
                <b>Kargo Numarası: {order.trackingNumber}</b>
                <br/>
                <button onClick={()=> checkOut(order._id)} className='btn btn-outline-danger mt-1'>Teslim al</button>
                </>
            )
        }else if(order.status === "Teslim Alındı"){
           
            let sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);            
            if(new Date(order.date) >= sevenDaysAgo){
                return (
                    <>
                    <button className='btn btn-primary'>İade et</button>
                    <br/>
                    <button className='btn btn-success mt-1' data-bs-toggle="modal" data-bs-target="#commentModal" onClick={()=> openCommentModal(order)}>Yorum Yap</button>
                    </>
                )
            }else{
                return <>
                <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#commentModal" onClick={()=> openCommentModal(order)}>Yorum Yap</button>
                </>
            }            
        }
        else{
            return <></>
            
        }
    }

    return (
        <>
            <h1>Siparişlerim</h1>
            <hr />
            <div className='row'>
                <div className='col-lg-9 col-md-6 col-0'></div>
                <div className='col-lg-3 col-md-6 col-12'>
                    <input onChange={search} type="search" className='form-control' placeholder='Aranacak değer...'/>
                </div>
            </div>
            <div className='overflow-auto'>
            <table className='table table-bordered table-hover mt-2 '>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Sipariş Tarihi</th>
                        <th>Firma</th>
                        <th>Sipariş Durumu</th>
                        <th>Ürün Resmi</th>
                        <th>Ürün Adı</th>
                        <th>Sipariş Adedi</th>
                        <th>Birim Fiyatı</th>
                        <th>Toplam</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((val, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{convertDate(val.date)}</td>
                                <td>{val.products[0].seller[0].name}</td>
                                <td>{val.status}</td>
                                <td>
                                    <img src={val.products[0].mainImageUrl} width={100} />
                                </td>
                                <td>{val.products[0].name}</td>
                                <td>{val.quantity}</td>
                                <td>{trCurrency(val.price, "₺")}</td>
                                <td>{trCurrency(val.price * val.quantity, "₺")}</td>
                                <td>
                                    {
                                        checkStatus(val)
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
            



            {/* Yorum Modal */}
            <div
                className="modal fade"
                id="commentModal"
                tabIndex={-1}
                aria-labelledby="commentModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="commentModalLabel">
                                Yorum Alanı
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                id="commentModalCloseBtn"
                            />
                        </div>
                        <div className="modal-body">
                            <div className='form-group'>
                                <label htmlFor='star'>Puanınız</label>
                                <select value={star} onChange={(e)=> setStar(e.target.value)} className='form-control'>
                                    <option value="1">
                                        &#9733;
                                    </option>
                                    <option value="2">
                                        &#9733;
                                        &#9733;
                                    </option>
                                    <option value="3">                                    
                                        &#9733;
                                        &#9733;
                                        &#9733;
                                    </option>
                                    <option value="4">
                                        &#9733;
                                        &#9733;
                                        &#9733;
                                        &#9733;
                                    </option>
                                    <option value="5">
                                        &#9733;
                                        &#9733;
                                        &#9733;
                                        &#9733;
                                        &#9733;
                                    </option>
                                </select>
                            </div>
                            <div className='form-group mt-1'>
                                <label htmlFor='comment'>Yorumunuz</label>
                                <textarea
                                    className='form-control'
                                    id="comment"
                                    name="comment"
                                    required
                                    autoComplete='off'
                                    minLength={3}
                                    ref={commentRef}
                                    value={comment}
                                    rows={5}                                    
                                    onChange={handleChange} />
                                <div className='invalid-feedback'>
                                    Yorum alanı boş olamaz
                                </div>
                            </div>                                                     

                        </div>
                        <div className="modal-footer">
                            <button onClick={saveComment} type="button" data-bs-dismiss="modal" className="btn btn-danger w-100">
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default withUILayout(Orders)