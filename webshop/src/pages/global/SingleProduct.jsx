import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { findProduct } from '../../util/productsUtil.js';
import { Spinner } from 'react-bootstrap';
import useFetchProducts from '../../util/useFetchProducts.js';
// import productsFromFile from "../../data/products.json";

const SingleProduct = () => {

  const { t } = useTranslation();
  const { id } = useParams();

  const [dbProducts, loading] = useFetchProducts(); 

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