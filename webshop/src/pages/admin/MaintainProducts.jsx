import React, { useEffect, useRef, useState } from "react";
// import productsFromFile from "../../data/products.json";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { findIndex } from "../../util/productsUtil.js";
import { Spinner } from "react-bootstrap";
import ConfirmationModal from "../../components/ConfirmationModal.jsx";
import useFetchProducts from "../../util/useFetchProducts.js";

// NÕUDED
// failist kustutada üks toode +
// minna toodet muutma, saates ID url +

const MaintainProducts = () => {
  const { t } = useTranslation();
  const searchedRef = useRef();
  const confirmationModal = useRef();

  const [products, setProducts] = useState([]);
  // const {dbProducts: productsCopy, loading} = useFetchProducts();
  const [productsCopy, loading] = useFetchProducts();

  useEffect(() => {
    setProducts(productsCopy.slice());
  }, [productsCopy]);

  const searchFromProducts = () => {
    const result = productsCopy.filter(product => 
      product.name.toLowerCase().includes(searchedRef.current.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchedRef.current.value.toLowerCase()) ||
      product.id.toString().includes(searchedRef.current.value)
    );
    setProducts(result);
  }

  const deleteProduct = (id) => {
    console.log(id);
    const index = findIndex(id, productsCopy);
    console.log(index);
    if (index >= 0) { // kui index on -1, siis ei leitud. kui -1ga kustutatakse, siis kustutatakse lõpust
      productsCopy.splice(index, 1);
      // fetch(productsDbUrl, {"method": "PUT", "body": JSON.stringify(productsCopy)});
      searchFromProducts();
      confirmationModal.current.closeModal();
    }
  };

  

  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      <ConfirmationModal 
        ref={confirmationModal}
        modalMessage="product"
        confirmed={deleteProduct}
      />
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
          <button onClick={() => confirmationModal.current.handleShow(product.id)}>
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
