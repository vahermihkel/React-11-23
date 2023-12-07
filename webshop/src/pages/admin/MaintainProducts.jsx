import React, { useEffect, useRef, useState } from "react";
// import productsFromFile from "../../data/products.json";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { findIndex } from "../../util/productsUtil.js";
import { Spinner } from "react-bootstrap";

// NÕUDED
// failist kustutada üks toode +
// minna toodet muutma, saates ID url +

const MaintainProducts = () => {
  const { t } = useTranslation();
  const searchedRef = useRef();

  const [products, setProducts] = useState([]);
  const [productsCopy, setDbProducts] = useState([]); // täpselt andmebaasi seis
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

  const searchFromProducts = () => {
    const result = productsCopy.filter(product => 
      product.name.toLowerCase().includes(searchedRef.current.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchedRef.current.value.toLowerCase()) ||
      product.id.toString().includes(searchedRef.current.value)
    );
    setProducts(result);
  }

  const deleteProduct = (id) => {
    const index = findIndex(id, productsCopy);
    productsCopy.splice(index, 1);
    // setProducts(productsCopy.slice());
    fetch(productsDbUrl, {"method": "PUT", "body": JSON.stringify(productsCopy)});
    searchFromProducts();
  };

  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      <input onChange={searchFromProducts} ref={searchedRef} type="text" />
      <div>{products.length} tk</div>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt="" />
          <div>{product.id}</div>
          <div>{product.name}</div>
          <div>{product.price} €</div>
          <div>{product.description}</div>
          <div>{product.category}</div>
          <div>{product.active}</div>
          <button onClick={() => deleteProduct(product.id)}>
            {t("admin.delete")}
          </button>

          <Link to={"/admin/edit/" + product.id}>
            <button>{t("admin.update")}</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MaintainProducts;
