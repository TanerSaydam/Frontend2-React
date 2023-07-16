import withUILayout from '@/components/withUILayout'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-toastify';

function login() {
    const [inputs, setInputs] = useState({});
    const [isValid, setIsValid] = useState(false);
    const elRefs = useRef([]);
    const router = useRouter();

    useEffect(()=> {
        checkValidations();;
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
        if (elRefs.current["emailOrPhoneNumber"]?.validity.valid &&
            elRefs.current["password"]?.validity.valid) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    async function login() {
        if (isValid) {
            axios.post("/api/ui/auth/login", inputs)
                .then((res) => {                    
                    localStorage.setItem("user", JSON.stringify(res.data));
                    router.push("/");
                    toast.success("Kullanıcı girişi başarılı!");
                })
                .catch((err) => {
                    console.log(err.response?.data?.message);
                    toast.error(err.response?.data?.message);
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

    // function onChange(value) {
    //     console.log("Captcha value:", value);
    //   }

    return (
        <div className="container d-flex justify-content-center">
            <div className='col-lg-6 col-md-8 col-12'>
                <div className='card mt-5'>
                    <div className='card-header'>
                        <h1>Giriş Sayfası</h1>
                        <p>Bilgilerinizi girerek giriş yapabilirsiniz</p>
                    </div>
                    <div className='card-body'>
                        <div className='form-group'>
                            <label htmlFor='emailOrPhoneNumber'>Mail Adresi / Telefon Numarası</label>
                            <input                                
                                id="emailOrPhoneNumber"
                                name="emailOrPhoneNumber"
                                required
                                ref={(ref) => elRefs.current["emailOrPhoneNumber"] = ref}
                                className='form-control'
                                value={inputs["emailOrPhoneNumber"]}
                                onChange={handleChange}
                            />
                            <div className='invalid-feedback'>
                                Geçerli bir mail ya da telefon numarası girin
                            </div>
                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor='password'>Şifre</label>
                            <input
                                type='password'
                                id="password"
                                name="password"
                                required
                                ref={(ref) => elRefs.current["password"] = ref}
                                className='form-control'
                                value={inputs["password"]}
                                onChange={handleChange}
                            />
                            <div className='invalid-feedback'>
                                Geçerli bir şifre girin
                            </div>
                        </div>
                        {/* <div className='form-group mt-2'>
                            <ReCAPTCHA
                                sitekey="Your client site key"
                                onChange={onChange}
                            />
                        </div> */}
                        <div className='form-group mt-2'>
                            <button
                                ref={(ref) => elRefs.current["loginBtn"] = ref}
                                onClick={login}
                                className='btn btn-primary w-100'>
                                Giriş Yap
                            </button>
                        </div>
                        <div className='card-footer'>
                            <Link className='register-link' href="/register">Ücretsiz Kayıt ol</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default withUILayout(login);