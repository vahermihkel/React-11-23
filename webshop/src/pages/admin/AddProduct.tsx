import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
// import productsFromFile from "../../data/products.json";


// NÕUDED
// lisada faili üks toode juurde (refreshiga kustub)

const AddProduct = () => {
  const { t } = useTranslation();

  const imageRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const isActiveRef = useRef<HTMLInputElement>(null); //<Product[]>
  const [dbProducts, setDbProducts] = useState<any[]>([]); // täpselt andmebaasi seis
  const [categories, setCategories] = useState<any[]>([]); // täpselt andmebaasi seis

  const previousMaximumId = Math.max(...dbProducts.map(product => product.id));
  const productsDbUrl = process.env.REACT_APP_PRODUCTS_DB_URL;
  const categoriesDbUrl = process.env.REACT_APP_CATEGORIES_DB_URL;
  
  useEffect(() => {
    if (productsDbUrl === undefined || categoriesDbUrl === undefined) return;
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
    const nameInput = nameRef.current;
    const imageInput = imageRef.current;
    const priceInput = priceRef.current;
    const descriptionInput = descriptionRef.current;
    const categoryInput = categoryRef.current;
    const isActiveInput = isActiveRef.current;
    if (nameInput === null || imageInput === null ||
      priceInput === null || descriptionInput === null ||
      categoryInput === null || isActiveInput === null ) return;

    if (nameInput.value === "") {
      return
    }

    if (priceInput.value === "") {
      return
    }
  
    dbProducts.push(
      {
        "id": previousMaximumId + 1,
        "image": imageInput.value,
        "name": nameInput.value,
        "price": Number(priceInput.value),
        "description": descriptionInput.value,
        "category": categoryInput.value,
        "active": isActiveInput.checked,
      }
    )

    const headers = {
      // "Authorization": "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json"
    }

    if (productsDbUrl === undefined) return;
    fetch(productsDbUrl, {"method": "PUT", "body": JSON.stringify(dbProducts), "headers": headers})
      .then(() => {
        imageInput.value = "";
        nameInput.value = "";
        priceInput.value = "";
        descriptionInput.value = "";
        categoryInput.value = "";
        isActiveInput.checked = false;
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