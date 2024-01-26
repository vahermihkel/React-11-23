import { useEffect, useState } from "react";


const useFetchProducts = () => {

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

  return [dbProducts, loading];
}

export default useFetchProducts