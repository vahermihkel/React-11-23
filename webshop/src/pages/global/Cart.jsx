import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ParcelMachines from "../../components/cart/ParcelMachines";
import styles from "../../css/Cart.module.css";
import Payment from "../../components/cart/Payment";
import { CartSumContext } from "../../store/CartSumContext";
import { calculateCartSum, calculateTotalItems } from "../../util/calculationsUtil";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const { t } = useTranslation();
  const { setCartSum, setCartDifferentItems, setCartTotalItems } = useContext(CartSumContext);

  const setCartContent = () => {
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartSum(calculateCartSum(cart));
    setCartDifferentItems(cart.length);
    setCartTotalItems(calculateTotalItems(cart));
  }

  const emptyCart = () => {
    cart.splice(0);
    setCartContent();
  };

  const decreaseQuantity = (index) => {
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
    }
    setCartContent();
  }

  const increaseQuantity = (index) => {
    cart[index].quantity++;
    setCartContent();
  }

  const deleteFromCart = (index) => {
    cart.splice(index, 1);
    setCartContent();
  };

  // const calculateCartSum = () => {
  //   let sum = 0;
  //   cart.forEach((p) => (sum += p.product.price * p.quantity));
  //   return sum.toFixed(2);
  // };

  return (
    <div>
      {cart.length > 0 && (
        <>
          <button onClick={emptyCart}>{t("cart.empty")}</button>
          <div>
            {t("cart.cart-has")} {cart.length} {t("cart.products")}
          </div>
        </>
      )}
      
      {cart.map((cartProduct, id) => (
        <div className={styles.product} key={id}>
          <img className={styles.image} src={cartProduct.product.image} alt="" />
          <div className={styles.name}>{cartProduct.product.name}</div>
          <div className={styles.price}>{cartProduct.product.price.toFixed(2)} €</div>
          <div className={styles.quantity}>
            <button className={styles.button} onClick={() => decreaseQuantity(id)}>
              <img src={require("../../images/minus.png")} alt="" />
            </button>
            <div>{cartProduct.quantity} pcs</div>
            <button className={styles.button} onClick={() => increaseQuantity(id)}>
              <img src={require("../../images/plus.png")} alt="" />
            </button>
          </div>
          <div className={styles.total}>{(cartProduct.product.price * cartProduct.quantity).toFixed(2)} €</div>
          <button className={styles.button} onClick={() => deleteFromCart(id)}>
            <img src={require("../../images/remove.png")} alt="" />
          </button>
        </div>
      ))}
      {cart.length === 0 ? (
        <div className={styles["cart-bottom"]}>
          <div>{t("cart.empty-cart")}</div>
          <Link to="/">
            <button>{t("cart.view-products")}</button>
          </Link>
        </div>
      ) :
        <>
          <div>
            {t("cart.total-sum")}: {calculateCartSum(cart)} €
          </div>

          <ParcelMachines />

          <Payment cartSum={calculateCartSum(cart)} />
        </>
      }

      
    </div>
  );
};

export default Cart;

// 07.12   14.00-17.15   Firebase -> Hosting, Kategooriad Andmebaasi, Tooted andmebaasi
// 12.12   14.00-17.15   kogused ostukorvis + kujundust + css modules
// 15.12   14.00-17.15   Makse: EveryPay + Components + komponentide vaheline suhtlus (props)
// 19.12   14.00-17.15   Context
// 21.12   14.00-17.15   <-- arutame teisipäeval
// 26.12   EI TOIMU
// 28.12   17.30-20.45
// 02.01   ?17.30-20.45?
// 04.01   EI TOIMU
