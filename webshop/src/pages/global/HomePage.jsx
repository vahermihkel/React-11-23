import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import styles from "../../css/HomePage.module.css";
import SortButtons from '../../components/home/SortButtons';
import FilterButtons from '../../components/home/FilterButtons';
import Product from '../../components/home/Product';

const HomePage = () => {

  const [products, setProducts] = useState([]); // väljanäidatav HTMLs
  // const productsCopy = productsFromFile;
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

  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      <div>Tooteid kokku {products.length} tk</div>
      <div>
        <SortButtons 
          products={products}
          setProducts={setProducts}
        />
        <FilterButtons 
          productsCopy={productsCopy}
          setProducts={setProducts}
        />
      </div>
      <div className={styles.products}>
        { 
        products.map(product =>
          <Product key={product.id} product={product} />
        )}
      </div>
      
    </div>
  )
}

export default HomePage