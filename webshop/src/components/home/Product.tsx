import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from "../../css/HomePage.module.css";
import { useContext } from 'react';
import { CartSumContext } from '../../store/CartSumContext';
import { useDispatch } from "react-redux";
import { cartSumActions } from "../../store/cartSum";
// import { PaymentProps } from '../../models/payment/PaymentProps';
 
// type PaymentProps = {
//  product: any
//  dbProducts: any
// }

const Product = ({ product }: any) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { updateCartProperties } = useContext(CartSumContext);
  

  const addToCart = (productClicked: any) => {
    const cartLS: any[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cartLS.findIndex(p => p.productId === productClicked.id);
    if (index !== -1) {
      cartLS[index].quantity++;
    } else {
      cartLS.push({"quantity": 1, "productId": productClicked.id});
    }
    updateCartProperties(false, cartLS);
    dispatch(cartSumActions.add(productClicked.price));
  }

  return (
    <div className={styles.product}>
      <img src={product.image} alt="" />
      <div>{product.name}</div>
      <div>{product.price} €</div>
      <Link to={"/product/" + product.id}>
          <button>{t("home.detailed")}</button>
      </Link>
      <button onClick={() => addToCart(product)} >{t("home.add-to-cart")}</button>
    </div>
  )
}

export default Product