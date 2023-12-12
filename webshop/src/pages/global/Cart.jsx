import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ParcelMachines from "../../components/cart/ParcelMachines";
import styles from "../../css/Cart.module.css";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const { t } = useTranslation();

  const emptyCart = () => {
    cart.splice(0);
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const decreaseQuantity = (index) => {
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
    }
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const increaseQuantity = (index) => {
    cart[index].quantity++;
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const deleteFromCart = (index) => {
    cart.splice(index, 1);
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const calculateCartSum = () => {
    let sum = 0;
    cart.forEach((p) => (sum += p.product.price * p.quantity));
    return sum.toFixed(2);
  };

  return (
    <div>
      {cart.length > 0 && (
        <button onClick={emptyCart}>{t("cart.empty")}</button>
      )}
      <div>
        {t("cart.cart-has")} {cart.length} {t("cart.products")}
      </div>
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
      {cart.length === 0 && (
        <div className={styles["cart-bottom"]}>
          <div>{t("cart.empty-cart")}</div>
          <Link to="/">
            <button>{t("cart.view-products")}</button>
          </Link>
        </div>
      )}

      <div>
        {t("cart.total-sum")}: {calculateCartSum()} €{" "}
      </div>

      <ParcelMachines />
    </div>
  );
};

export default Cart;

// 07.12   14.00-17.15   Firebase -> Hosting, Kategooriad Andmebaasi, Tooted andmebaasi
// 12.12   14.00-17.15   Makse: EveryPay + kogused ostukorvis + kujundust + css modules
// 14.12   17.30-20.30   Components + komponentide vaheline suhtlus (props)
// 19.12                 Context
