import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react'

export default function login() {
  const [inputs, setInputs] = useState({});
  const [isValid, setIsValid] = useState(false);
  const elRefs = useRef([]);
  const router = useRouter();

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

    checkValidations();
  }

  function checkValidations() {
    if (elRefs.current["email"]?.validity.valid &&
      elRefs.current["password"]?.validity.valid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  async function login() {
    if (isValid) {
      axios.post("/api/admin/auth/login", inputs)
        .then((res) => {
          localStorage.setItem("accessToken",JSON.stringify(res.data.accessToken));
          localStorage.setItem("seller",JSON.stringify(res.data.seller));
          router.push("/admin/");
        })
        .catch((err) => {
          console.log(err.response?.data?.message);
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
    <div className="container d-flex justify-content-center">
      <div className='col-lg-6 col-md-8 col-12'>
        <div className='card mt-5'>
          <div className='card-header'>
            <h1>Giriş Sayfası</h1>
            <p>Bilgilerinizi girerek giriş yapabilirsiniz</p>
          </div>
          <div className='card-body'>
            <div className='form-group'>
              <label htmlFor='email'>Mail Adresi</label>
              <input
                type='email'
                id="email"
                name="email"
                required
                ref={(ref)=> elRefs.current["email"] = ref}
                className='form-control'
                value={inputs["email"]}
                onChange={handleChange}
              />
              <div className='invalid-feedback'>
                Geçerli bir mail adresi girin
              </div>
            </div>
            <div className='form-group mt-2'>
              <label htmlFor='password'>Şifre</label>
              <input
                type='password'
                id="password"
                name="password"
                required
                ref={(ref)=> elRefs.current["password"] = ref}
                className='form-control'
                value={inputs["password"]}
                onChange={handleChange}
              />
              <div className='invalid-feedback'>
                Geçerli bir şifre girin
              </div>
            </div>
            <div className='form-group mt-2'>
              <button 
                ref={(ref)=> elRefs.current["loginBtn"] = ref} 
                onClick={login} 
                className='btn btn-primary w-100'>
                  Giriş Yap
                </button>
            </div>
            <div className='card-footer'>
                <Link className='register-link' href="/admin/register">Ücretsiz Kayıt ol</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
