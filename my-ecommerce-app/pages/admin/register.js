import { cityList } from '@/services/cityList'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';

export default function register() {
    const cities = cityList;
    const [inputs, setInputs] = useState({});
    const elRefs = useRef([]);
    const [isValid, setIsValid] = useState(false);
    const router = useRouter();

    useEffect(()=> {
        checkValidations();
    },[inputs]);

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
            elRefs.current["identityNumber"]?.validity.valid &&
            elRefs.current["email"]?.validity.valid &&
            elRefs.current["phoneNumber"]?.validity.valid &&
            elRefs.current["city"]?.validity.valid &&
            elRefs.current["address"]?.validity.valid &&
            elRefs.current["imageUrl"]?.validity.valid) {
            setIsValid(true);            
        } else {
            setIsValid(false);            
        }
    }

    async function register() {
        if (isValid) {
            axios.post("/api/admin/auth/register", inputs)
                .then((res) => {
                    console.log(res.data);
                    router.push("/admin/login");
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        } else {
            for (let key in elRefs.current) {
                if (!elRefs.current[key].validity.valid) {
                    elRefs.current[key].classList.add("is-invalid");
                    elRefs.current[key].classList.remove("is-valid");
                }
            }
        }
    }

    return (
        <div className="container">
            <div className='card mt-5'>
                <div className='card-header'>
                    <h1>Firma Kayıt Sayfası</h1>
                    <p>Firmanıza ait bilgileri doldurun</p>
                </div>
                <div className='card-body'>
                    <div className='form-group'>
                        <label htmlFor='name'>Firma Adı</label>
                        <input
                            ref={(ref) => elRefs.current["name"] = ref}
                            autoComplete='off'
                            name="name"
                            onChange={handleChange}
                            value={inputs["name"] || ""}
                            id="name"
                            className='form-control'
                            required
                            minLength="3" />
                        <div className='invalid-feedback'>
                            Geçerli bir firma adı yazın
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='row  mt-2'>
                            <div className='col-lg-3 col-md-6 col-12'>
                                <label htmlFor='identityNumber'>TC/VNo</label>
                                <input
                                    ref={(ref) => elRefs.current["identityNumber"] = ref}
                                    autoComplete='off'
                                    onChange={handleChange}
                                    value={inputs["identityNumber"] || ""}
                                    name="identityNumber"
                                    id="identityNumber"
                                    className='form-control'
                                    required
                                    minLength="10"
                                    maxLength="11" />
                                <div className='invalid-feedback'>
                                    Geçerli bir TC ya da VNO girin
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6 col-12'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    ref={(ref) => elRefs.current["email"] = ref}
                                    autoComplete='off'
                                    onChange={handleChange}
                                    value={inputs["email"] || ""}
                                    name="email"
                                    id="email"
                                    type='email'
                                    className='form-control'
                                    required />
                                <div className='invalid-feedback'>
                                    Geçerli bir email adresi girin
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6 col-12'>
                                <label htmlFor='phoneNumber'>Telefon Numarası</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">+90</span>
                                    <input
                                        ref={(ref) => elRefs.current["phoneNumber"] = ref}
                                        autoComplete='off'
                                        onChange={handleChange}
                                        value={inputs["phoneNumber"] || ""}
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        type="text"
                                        className="form-control"
                                        required
                                        minLength="10"
                                        maxLength="10" />
                                    <div className='invalid-feedback'>
                                        Geçerli bir telefon numarası girin
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6 col-12'>
                                <label htmlFor='city'>Şehir</label>
                                <select
                                    onChange={handleChange}
                                    value={inputs["city"] || ""}
                                    ref={(ref) => elRefs.current["city"] = ref}
                                    name="city"
                                    id="city"
                                    className='form-control'
                                    required>
                                    {cities.map((val, index) => <option key={index}>{val}</option>)}
                                </select>
                                <div className='invalid-feedback'>
                                    Şehir seçin
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='form-group'>
                        <label htmlFor='address'>Adres</label>
                        <input
                            ref={(ref) => elRefs.current["address"] = ref}
                            onChange={handleChange}
                            value={inputs["address"] || ""}
                            id="address"
                            name="address"
                            autoComplete='off'
                            className='form-control'
                            required minLength="3" />
                        <div className='invalid-feedback'>
                            Geçerli bir adres girin
                        </div>
                    </div>
                    <div className='form-group mt-2'>
                        <label htmlFor='password'>Şifre</label>
                        <input
                            ref={(ref) => elRefs.current["password"] = ref}
                            autoComplete='off'
                            onChange={handleChange}
                            value={inputs["password"] || ""}
                            name="password"
                            id="password"
                            required
                            type="password"
                            className='form-control' />
                        <div className='invalid-feedback'>
                            Geçerli bir şifre girin
                        </div>
                    </div>
                    <div className='form-group mt-2'>
                        <div className='row'>
                            <div className='col-lg-9 col-md-12 col-12 mt-1'>
                                <label htmlFor='imageUrl'>Logo</label>
                                <input
                                    ref={(ref) => elRefs.current["imageUrl"] = ref}
                                    autoComplete='off'
                                    onChange={handleChange}
                                    value={inputs["imageUrl"] || ""}
                                    name="imageUrl"
                                    id="imageUrl"
                                    required
                                    minLength={10}
                                    className='form-control' />
                                <div className='invalid-feedback'>
                                    Geçerli bir şirket logosu girin
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-12 col-12 mt-1'>
                                <img src={inputs["imageUrl"] || ""} className='register-logo' />
                            </div>
                        </div>
                    </div>
                    <div className='form-group mt-2'>
                        <button
                            type="button"
                            onClick={register}
                            className='btn btn-primary w-100'
                            ref={(ref) => elRefs.current["registerBtn"] = ref}>
                            <i className="fa-solid fa-notes-medical mx-2"></i>
                            Kayıt Ol
                        </button>
                    </div>
                </div>
                <div className='card-footer'>
                    <Link className='login-link' href="/admin/login">Zaten kayıtınız var mı? Giriş sayfasına git</Link>
                </div>
            </div>
        </div>
    )
}
