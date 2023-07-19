import withAdminLayout from '@/components/withAdminLayout';
import trCurrency from '@/services/trCurreny';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import moment from 'moment';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [orgOrders, setOrgOrders] = useState([]);
    const [orderId, setOrderId] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");
    const trackingNumberRef = useRef();

    useEffect(() => {
        getAll();
    }, []);

    async function getAll() {
        const seller = JSON.parse(localStorage.getItem("seller"));
        const result = await axios.post("/api/admin/orders/getAll", { sellerId: seller._id });
        setOrders(result.data);
        setOrgOrders(result.data);
    }

    async function accept(id) {
        const result = window.confirm("Sipariş onaylamak istediğinizden emin misiniz?");
        if (result) {
            const response = await axios.post("/api/admin/orders/accept", { id: id });
            toast.success(response.data.message);
            getAll();
        }
    }

    function search(e) {
        const value = e.target.value;
        const newOrders = orgOrders.filter(
            p =>
                p.products.name.toLowerCase().includes(value.toLowerCase()) ||
                p.status.toLowerCase().includes(value.toLowerCase()) ||
                p.trackingNumber.toLowerCase().includes(value.toLowerCase()))
        setOrders(newOrders);
    }

    async function reject(id) {
        const result = window.confirm("Sipariş reddetmek istediğinizden emin misiniz?");
        if (result) {
            const response = await axios.post("/api/admin/orders/reject", { id: id });
            toast.info(response.data.message);
            getAll();
        }
    }

    function setTheIdOfOrderToBeCargo(id) {
        setOrderId(id);
    }

    async function giveItToTheCargo() {
        if (trackingNumberRef.current.validity.valid) {
            const data = {
                id: orderId,
                trackingNumber: trackingNumber
            }

            const response = await axios.post("/api/admin/orders/giveItToTheCargo", data);
            toast.success(response.data.message);
            getAll();
            let closeBtn = document.getElementById("cargoModalCloseBtn");
            closeBtn.click();
        } else {
            trackingNumberRef.current.classList.add("is-invalid");
            trackingNumberRef.current.classList.remove("is-valid");
        }

    }

    const handleChange = (e) => {
        setTrackingNumber(e.target.value);

        if (!e.target.validity.valid) {
            e.target.classList.add("is-invalid");
            e.target.classList.remove("is-valid");
        } else {
            e.target.classList.remove("is-invalid");
            e.target.classList.add("is-valid");
        }
    }

    function convertDate(date) {
        return moment(date).format('DD.MM.YYYY HH:mm:ss');
    }

    function checkStatus(order) {
        if (order.status === "Onay Bekliyor") {
            return (
                <>
                    <button onClick={() => accept(order._id)} className='btn btn-outline-success btn-sm'>
                        <i className='fa-solid fa-check'></i>
                        <span className='ms-1'>Onayla</span>
                    </button>
                    <br/>
                    <button onClick={() => reject(order._id)} className='btn btn-outline-danger btn-sm mt-1'>
                        <i className='fa-solid fa-x'></i>
                        <span className='ms-1'>Reddet</span>
                    </button>
                </>
            )
        } else if (order.status === "Sipariş Onaylandı") {
            return (
                <>
                    <button data-bs-toggle="modal" data-bs-target="#cargoModal" onClick={() => setTheIdOfOrderToBeCargo(order._id)} className='btn btn-outline-info btn-sm'>
                        <i class="fa-solid fa-truck"></i>
                        <span className='ms-1'>Kargoya Ver</span>
                    </button>
                    <br/>
                    <button onClick={() => reject(order._id)} className='btn btn-outline-danger btn-sm mt-1'>
                        <i className='fa-solid fa-x'></i>
                        <span className='ms-1'>Reddet</span>
                    </button>
                </>
            )
        } else if (order.status === "Sipariş Reddedildi") {
            return <></>
        } else if (order.status === "Sipariş Kargoya Verildi") {
            return <b>Kargo Numarası: {order.trackingNumber}</b>
        }
        else {
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
                    <input onChange={search} type="search" className='form-control' placeholder='Aranacak değer...' />
                </div>
            </div>
            <div className='overflow-auto'>
                <table className='table table-bordered table-hover mt-2'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sipariş Tarihi</th>
                            <th>Kullanıcı</th>
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
                                    <td>{val.users[0].name}</td>
                                    <td>{val.status}</td>
                                    <td>
                                        <img src={val.products.mainImageUrl} width={100} />
                                    </td>
                                    <td>{val.products.name}</td>
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

            {/* Kargo Modal */}
            <div
                className="modal fade"
                id="cargoModal"
                tabIndex={-1}
                aria-labelledby="cargoModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="cargoModalLabel">
                                Siparişi Kargoya Ver
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                id="cargoModalCloseBtn"
                            />
                        </div>
                        <div className="modal-body">
                            <div className='form-group'>
                                <label htmlFor='trackingNumber'>Kargo Numarası</label>
                                <input
                                    className='form-control'
                                    id="trackingNumber"
                                    name="trackingNumber"
                                    required
                                    autoComplete='off'
                                    minLength={3}
                                    ref={trackingNumberRef}
                                    value={trackingNumber}
                                    onChange={handleChange} />
                                <div className='invalid-feedback'>
                                    Kargo takip numarası boş olamaz!
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button onClick={giveItToTheCargo} type="button" className="btn btn-danger w-100">
                                Siparişi Kargoya Ver
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default withAdminLayout(Orders)