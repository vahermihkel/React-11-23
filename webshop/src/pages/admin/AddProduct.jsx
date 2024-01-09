import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
// import productsFromFile from "../../data/products.json";


// NÕUDED
// lisada faili üks toode juurde (refreshiga kustub)

const AddProduct = () => {
  const { t } = useTranslation();

  const imageRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const isActiveRef = useRef();
  const [dbProducts, setDbProducts] = useState([]); // täpselt andmebaasi seis
  const [categories, setCategories] = useState([]); // täpselt andmebaasi seis

  const previousMaximumId = Math.max(...dbProducts.map(product => product.id));
  const productsDbUrl = process.env.REACT_APP_PRODUCTS_DB_URL;
  const categoriesDbUrl = process.env.REACT_APP_CATEGORIES_DB_URL;
  
  useEffect(() => {
    fetch(productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setDbProducts(json);
      })
    fetch(categoriesDbUrl)
      .then(res => res.json())
      .then(json => {
        setCategories(json);
      })
  }, [productsDbUrl, categoriesDbUrl]);

  const addProduct = () => {
    if (nameRef.current.value === "") {
      return
    }

    if (priceRef.current.value === "") {
      return
    }
  
    dbProducts.push(
      {
        "id": previousMaximumId + 1,
        "image": imageRef.current.value,
        "name": nameRef.current.value,
        "price": Number(priceRef.current.value),
        "description": descriptionRef.current.value,
        "category": categoryRef.current.value,
        "active": isActiveRef.current.checked,
      }
    )

    const headers = {
      // "Authorization": "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json"
    }

    fetch(productsDbUrl, {"method": "PUT", "body": JSON.stringify(dbProducts), "headers": headers})
      .then(() => {
        imageRef.current.value = "";
        nameRef.current.value = "";
        priceRef.current.value = "";
        descriptionRef.current.value = "";
        categoryRef.current.value = "";
        isActiveRef.current.value = false;
      });
  }
  

  return (
    <div>
      <label>{t("product.name")}</label> <br />
      <input ref={nameRef} type="text" /> <br />

      <label>{t("product.price")}</label> <br />
      <input ref={priceRef} type="number"/> <br />

      <label>{t("product.image")}</label> <br />
      <input ref={imageRef} type="text" /> <br />

      <label>{t("product.description")}</label> <br />
      <input ref={descriptionRef} type="text" /> <br />

      <label>{t("product.category")}</label> <br />
      {/* <input ref={categoryRef} type="text" /> <br /> */}
      <select ref={categoryRef}>
        {categories.map(category => <option key={category.name}>{category.name}</option>)}
      </select> <br />

      <label>{t("product.active")}</label> <br />
      <input ref={isActiveRef} type="checkbox"  /> <br />

      <button onClick={addProduct} >{t("admin.add")}</button> <br />
    </div>
  )
}

export default AddProduct