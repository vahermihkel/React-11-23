import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
// import productsFromFile from "../../data/products.json";

const HomePage = () => {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]); // väljanäidatav HTMLs
  // const productsCopy = productsFromFile;
  const [productsCopy, setDbProducts] = useState([]); // täpselt andmebaasi seis
  const [nameSortToggle, setNameSortToggle] = useState(true); // kasutame selleks, et toggledada name sortimist
  const [priceSortToggle, setPriceSortToggle] = useState(true); // kasutame selleks, et toggledada hinna sortimist
  const [loading, setLoading] = useState(true);
  const productsDbUrl = process.env.REACT_APP_PRODUCTS_DB_URL;
  
  useEffect(() => {
    fetch(productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        setDbProducts(json);
        setLoading(false);
      })
  }, [productsDbUrl]);

  const sortByName = () => {
    let sortDesc = nameSortToggle;

    if (sortDesc) {
      products.sort((a,b) => b.name.localeCompare(a.name));
    }
    else {
      products.sort((a,b) => a.name.localeCompare(b.name));
    }
    setProducts(products.slice());
    setNameSortToggle(!sortDesc); // anname vastupidise väärtuse järgmiseks sortimiseks
  }

  const sortByPrice = () => {
    let sortDesc = priceSortToggle;

    if (sortDesc) {
      products.sort((a,b) => b.price - a.price);
    }
    else {
      products.sort((a,b) => a.price - b.price);
    }
    setProducts(products.slice());
    setPriceSortToggle(!sortDesc); // anname vastupidise väärtuse järgmiseks sortimiseks
  }

  const filterByGroup = (name) => {
    clearFilter();
    let filteredProducts = productsCopy.filter(product => product.category === name);
    setProducts(filteredProducts);
  }

  const clearFilter = () => {
    setProducts(productsCopy);
  }

  const addToCart = (product) => {
    // cartFromFile.push(product);
    // localStorage.setItem("cart", cartFromFile);

    const cartLS = JSON.parse(localStorage.getItem("cart") || "[]");
    cartLS.push(product);
    localStorage.setItem("cart", JSON.stringify(cartLS));

    // 1. võtta vana seis localStoragest
    // 2. parse-da Array kujule ehk võtta jutumärgid maha
    // 3. lisada juurde   .push()
    // 4. paneme jutumärgid ise peale -> keerame Array Stringiks
    // 5. panna tagasi localStoragesse (set abil ehk asenda uue väärtusega vana)
  }

  if (loading) {
    return <Spinner />
  }


  return (
    <div>
      <div>Tooteid kokku {products.length} tk</div>
      <div> {t("home.sort-by")} </div>
      <div className="btn-group p-4" role="group">
        <button className="btn btn-secondary btn-sm" onClick={sortByName}> {t("home.sort-by-name")} </button>
        <button className="btn btn-secondary btn-sm" onClick={sortByPrice}> {t("home.sort-by-price")} </button><br />
      </div>
      <div>
      <div> {t("home.filter-by-category")} </div>
      <div className="btn-group p-4" role="group">
        <button className="btn btn-secondary btn-sm" onClick={() => filterByGroup("lego")}>{t("home.filter-lego")}</button>
        <button className="btn btn-secondary btn-sm" onClick={() => filterByGroup("star wars")}>{t("home.filter-star")}</button>
        <button className="btn btn-secondary btn-sm" onClick={() => filterByGroup("figure")}>{t("home.filter-figure")}</button>
        <button className="btn btn-primary btn-sm" onClick={() => clearFilter()}>{t("home.clear-filter")}</button>
      </div>
        
      </div>
      { 
      products.map(product =>
      <div key={product.id}>
        <img src={product.image} alt="" />
        <div>{product.name}</div>
        <div>{product.price} €</div>
        <Link to={"/product/" + product.id}>
            <button>{t("home.detailed")}</button>
        </Link>
        <button onClick={() => addToCart(product)} >{t("home.add-to-cart")}</button>
      </div>
      )}
      
    </div>
  )
}

export default HomePage