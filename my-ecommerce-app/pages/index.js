import trCurrency from "@/services/trCurreny";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import withUILayout from '@/components/withUILayout'

function Home() {
  const [products, setProducts] = useState([]); //undefined
  const [orgProducts, setOrgProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("0");
  const [filterType, setFilterTpye] = useState("");
  const elRefs = useRef([]);

  async function getAllProducts(categoryId = "0", selectedFilterType = "") {
    const result = await axios.post("/api/ui/products/getAll", { categoryId: categoryId, filterType: selectedFilterType });
    setProducts(result.data);
    setOrgProducts(result.data);
  }

  function search(e) {
    const value = e.target.value;
    const newProducsts = orgProducts.filter((p) => p.name.toLowerCase().includes(value));
    setProducts(newProducsts);
  }

  async function getAllCategories() {
    const result = await axios.get("/api/ui/categories/getAll");
    setCategories(result.data);
  }

  function selectCategory(categoryId, i) {
    clearActiveClassFromCategoryLi();
    getAllProducts(categoryId, filterType);
    setSelectedCategoryId(categoryId);
    elRefs.current["category-" + i].className = "active";
  }

  function clearActiveClassFromCategoryLi() {
    for (let key in elRefs.current) {
      elRefs.current[key].className = "";
    }
  }



  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, [])

  function changeFilterType(e) {
    setFilterTpye(e.target.value);
    getAllProducts(selectedCategoryId, e.target.value);
  }

  function returnRateToStar(average) {
    const arr = [];
    for (let x = 0; x < 5; x++) {
      if (x < average) {
        arr.push("text-warning");
      } else {
        arr.push("text-secondary");
      }
    }

    return arr;
  }


  return (
    <div className="container">
      <h1>e-Ticaret Ana Sayfa</h1>
      <hr />
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6 d-none d-lg-block ui-categories">
          <ul>
            <li
              ref={(ref) => elRefs.current["category--1"] = ref}
              onClick={() => selectCategory("0", -1)}
              className="active">
              <span className="badge text-bg-danger mx-1">
                {products.length}
              </span>
              Tümü
            </li>
            {categories.map((val, i) =>
              <li
                ref={(ref) => elRefs.current["category-" + i] = ref}
                key={i}
                onClick={() => selectCategory(val._id, i)}>
                <span className="badge text-bg-danger mx-1">
                  {val.products.length}
                </span>
                {val.name}
              </li>)}
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 d-lg-none col-12 ui-categories">
          <select value={selectedCategoryId} onChange={(e) => selectCategory(e.target.value, categories.findIndex(cat => cat._id === e.target.value))} className="form-control">
            <option value="0">Tümü</option>
            {categories.map((val, i) =>
              <option key={i} value={val._id}>{val.name}</option>
            )}
          </select>
        </div>
        <div className="col-lg-9 col-md-6 col-sm-6 col-12">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12 mt-1">
              <input className="form-control" onChange={search} type="search" placeholder="Aranacak değer..." />
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 col-12 mt-1">
              <select value={filterType} onChange={changeFilterType} className="form-control">
                <option value="">Seçim Yapınız...</option>
                <option value="1">1 yıldız üstü</option>
                <option value="2">2 yıldız üstü</option>
                <option value="3">3 yıldız üstü</option>
                <option value="4">4 yıldız üstü</option>
                <option value="5">5 yıldız</option>
              </select>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 col-12 mt-1">
              <select value={filterType} onChange={changeFilterType} className="form-control">
                <option value="">Seçim Yapınız...</option>
                <option value="0">Fiyata Göre Artan</option>
                <option value="1">Fiyata Göre Azalan</option>
              </select>
            </div>
          </div>
          <div className="row">
            {products.map((val, i) => {
              return (
                <div key={i} className="col-lg-4 col-md-12 col-sm-12 col-12 mt-2">
                  <div className="card">
                    <img src={val.mainImageUrl} className="card-img-top card-product-img" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title card-product-title">{val.name}</h5>
                      {returnRateToStar(val.average).map((val, i) =>
                        <i key={i} className={"fa-solid fa-star " + val}></i>
                      )}
                      <hr />
                      <p className="card-text">Adet: {val.stock}</p>
                      <p className="card-text">Fiyat: {trCurrency(val.price, "₺")}</p>
                      <Link href={"/product-detail/" + val._id} className="btn btn-danger">Ürün Detayı</Link>
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