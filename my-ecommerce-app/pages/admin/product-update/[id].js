import withAdminLayout from '@/components/withAdminLayout'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'

function ProductUpdate() {
    const [categories, setCategories] = useState([]);
    const [inputs, setInputs] = useState({ imageUrls: [""], isActive: true, sellerId: "" });
    const elRefs = useRef([]);
    const [isValid, setIsValid] = useState(false);
    const router = useRouter();    

    useEffect(() => {
        if (router.isReady) {
            getCategories();
            getProductById();
        }       
    }, [router.isReady]);

    useEffect(()=> {
        checkValidations();
    },[inputs]);

    async function getProductById(){
        const {id} = router.query;
        const result = await axios.post("/api/admin/products/getById", {id: id});
        setInputs(result.data);
    }
    
    async function getCategories() {
        const result = await axios("/api/admin/categories/getAll");
        setCategories(result.data);
    }

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setInputs(prev => ({ ...prev, [name]: value }));

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
            elRefs.current["categoryId"]?.validity.valid &&
            elRefs.current["stock"]?.validity.valid &&
            elRefs.current["price"]?.validity.valid &&
            elRefs.current["mainImageUrl"]?.validity.valid) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    async function update() {
        if (isValid) {
            if(inputs["categoryId"] === "0" || inputs["categoryId"] === null || inputs["categoryId"] === undefined){
                elRefs.current["categoryId"].classList.add("is-invalid");
                elRefs.current["categoryId"].classList.remove("is-valid");
                return;
            }

            inputs["price"] = inputs["price"].toString().replace(",",".");
            const seller = JSON.parse(localStorage.getItem("seller"));
            inputs["sellerId"] = seller._id;
            console.log(inputs);
            await axios.post("/api/admin/products/update", inputs);
            router.push("/admin/products");
        } else {
            for (let key in elRefs.current) {
                if (!elRefs.current[key].validity.valid) {
                    elRefs.current[key].classList.add("is-invalid");
                    elRefs.current[key].classList.remove("is-valid");
                }
            }
        }
    }    

    function removeImageField(index) {
        const newImageFileds = inputs["imageUrls"].filter((p, i) => i !== index);
        setInputs(prev => ({ ...prev, ["imageUrls"]: newImageFileds }));
    }
       
    function setImageFieldValue(e, index) {
        const newImageFileds = inputs["imageUrls"]?.map((val, i) => {
            if (i === index) return e.target.value
            else return val
        });
        setInputs(prev => ({ ...prev, ["imageUrls"]: newImageFileds }));        
    }

    function addNewImageField() {
        const newImageField = [...inputs["imageUrls"]];
        newImageField.push("");
        setInputs(prev => ({ ...prev, ["imageUrls"]: newImageField }));
    }   

    return (
        <>
            <h1>Ürün Güncelleme</h1>
            <hr />
            <div className='row'>
                <div className='col-lg-5 col-md-6 col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>Ürün Adı</label>
                        <input
                            className='form-control'
                            required
                            id="name"
                            name="name"
                            minLength="3"
                            autoComplete='off'
                            value={inputs["name"] || ""}
                            onChange={handleChange}
                            ref={(ref) => elRefs.current["name"] = ref} />
                        <div className='invalid-feedback'>
                            Geçerli bir ürün adı girin
                        </div>
                    </div>
                </div>
                <div className='col-lg-3 col-md-6 col-12'>
                    <div className='form-group'>
                        <label htmlFor='categoryId'>Kategori</label>
                        <select
                            className='form-control'
                            id="categoryId"
                            name="categoryId"
                            value={inputs["categoryId"] || ""}
                            onChange={handleChange}
                            ref={(ref) => elRefs.current["categoryId"] = ref}>
                            <option value="0">Seçim yapınız</option>
                            {
                                categories.map((val, index) =>
                                    <option key={index} value={val._id}>
                                        {val.name}
                                    </option>)
                            }
                        </select>
                        <div className='invalid-feedback'>
                            Ürün kategorisi seçilmelidir
                        </div>
                    </div>
                </div>
                <div className='col-lg-2 col-md-6 col-12'>
                    <div className='form-group'>
                        <label htmlFor='stock'>Stok Adedi</label>
                        <input
                            type="number"
                            className='form-control'
                            required
                            id="stock"
                            name="stock"
                            autoComplete='off'
                            value={inputs["stock"] || ""}
                            onChange={handleChange}
                            ref={(ref) => elRefs.current["stock"] = ref} />
                        <div className='invalid-feedback'>
                            Ürün stok adedi boş olamaz
                        </div>
                    </div>
                </div>
                <div className='col-lg-2 col-md-6 col-12'>
                    <div className='form-group'>
                        <label htmlFor='price'>Birim Fiyatı</label>
                        <input
                            className='form-control'
                            required
                            min="0"
                            id="price"
                            name="price"
                            autoComplete='off'
                            value={inputs["price"] || ""}
                            onChange={handleChange}
                            ref={(ref) => elRefs.current["price"] = ref} />
                        <div className='invalid-feedback'>
                            Birim fiyatı 0'dan yüksek olmalıdır
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-group mt-2'>
                <label htmlFor='mainImageUrl'>Ürünün Kapak Resmi</label>
                <input
                    className='form-control'
                    id="mainImageUrl"
                    name="mainImageUrl"
                    required
                    minLength="3"
                    autoComplete='off'
                    value={inputs["mainImageUrl"] || ""}
                    onChange={handleChange}
                    ref={(ref) => elRefs.current["mainImageUrl"] = ref} />
                <div className='invalid-feedback'>
                    Ürüne ait geçerli bir kapak resmi girin
                </div>
            </div>
            {/* <div className='form-group mt-2'>
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        onChange={handleChange}
                         />
                        <label className="form-check-label" for="isActive">
                            Ürün Satışta Mı?
                        </label>
                </div>
            </div> */}
            {
                inputs["imageUrls"]?.map((val, index) => {
                    return (
                        <div key={index} className='form-group mt-2'>
                            <label>Ürün Resmi
                            </label>
                            <button style={{ float: "right" }} onClick={() => removeImageField(index)} className='btn btn-outline-danger btn-sm mb-1'>
                                <i className='fa-solid fa-x'></i>
                            </button>
                            <input
                                className='form-control'
                                autoComplete='off'
                                value={val}
                                onChange={(e) => setImageFieldValue(e, index)} />
                        </div>
                    )
                })
            }
            <div className='form-group mt-2'>
                <button onClick={addNewImageField} className='btn btn-primary'>
                    <i className="fa-solid fa-plus"></i>
                    Yeni Resim Alanı
                </button>
            </div>
            <div className='form-group mt-2'>
                <button onClick={update} className='btn btn-info w-100'>
                    <i className='fa-solid fa-check'></i>
                    Güncelle
                </button>
            </div>
        </>
    )
}

export default withAdminLayout(ProductUpdate);
