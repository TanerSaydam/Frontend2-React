import trCurrency from "@/services/trCurreny";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import withUILayout from '@/components/withUILayout'

function Home() {
  const [products, setProducts] = useState([]); //undefined
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("0");
  const elRefs = useRef([]);

  async function getAllProducts(categoryId = "0") {
    const result = await axios.post("/api/ui/products/getAll", {categoryId: categoryId});
    setProducts(result.data);
  }

  async function getAllCategories(){
    const result = await axios.get("/api/ui/categories/getAll");
    setCategories(result.data);
  }

  function selectCategory(categoryId,i){
    clearActiveClassFromCategoryLi();
    getAllProducts(categoryId);
    elRefs.current["category-" + i].className = "active";
  }

  function clearActiveClassFromCategoryLi(){
    for (let key in elRefs.current) {
      elRefs.current[key].className = "";
    }
  }



  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, [])

  return (
    <div className="container">
      <h1>e-Ticaret Ana Sayfa</h1>
      <hr />
      <div className="row">
        <div className="col-lg-3 col-md-3 col-0 ui-categories">
          <ul>
            <li 
              ref={(ref)=> elRefs.current["category--1"] = ref} 
              onClick={()=> selectCategory("0",-1)} 
              className="active">
                Tümü
            </li>
            {categories.map((val,i)=> <li ref={(ref)=> elRefs.current["category-" + i] = ref} key={i} onClick={()=> selectCategory(val._id,i)}><span className="badge text-bg-danger mx-1">{val.products.length}</span>{val.name}</li>)}
          </ul>
        </div>
        <div className="col-lg-9 col-md-9 col-12">
          <div className="row">
            <div className="col-12">
              <input className="form-control" type="search" placeholder="Aranacak değer..."/>
            </div>
          </div>
          <div className="row">
            {products.map((val, i) => {
              return (
                <div key={i} className="col-lg-3 col-md-4 col-12 mt-2">
                  <div className="card">
                    <img src={val.mainImageUrl} className="card-img-top card-product-img" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title card-product-title">{val.name}</h5>
                      <p className="card-text">Adet: {val.stock}</p>
                      <p className="card-text">Fiyat: {trCurrency(val.price, "₺")}</p>
                      <Link href="#" className="btn btn-danger">Ürün Detayı</Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>


      </div>
    </div>
  )
}

export default withUILayout(Home);