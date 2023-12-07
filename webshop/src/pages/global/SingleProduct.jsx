import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { findProduct } from '../../util/productsUtil.js';
import { Spinner } from 'react-bootstrap';
// import productsFromFile from "../../data/products.json";

const SingleProduct = () => {

  const { t } = useTranslation();
  const { id } = useParams();

  const [dbProducts, setDbProducts] = useState([]); // täpselt andmebaasi seis
  const [loading, setLoading] = useState(true);
  const productsDbUrl = process.env.REACT_APP_PRODUCTS_DB_URL;
  
  useEffect(() => {
    fetch(productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setDbProducts(json);
        setLoading(false);
      })
  }, [productsDbUrl]);

  const product = findProduct(id, dbProducts);

  if (loading) {
    return <Spinner />
  }

  if (product === undefined) {
    return <div>{t("product.error.notfound")}</div>
  }

  return (
    <div>
      <img src={product.image} alt="" />
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.description}</div>
      <div>{product.category}</div>
      <div>{product.active + 0}</div>
    </div>
  )
}

export default SingleProduct