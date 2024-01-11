import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from "../../css/HomePage.module.css";
import { useContext } from 'react';
import { CartSumContext } from '../../store/CartSumContext';
import { calculateCartSum, calculateTotalItems } from '../../util/calculationsUtil';

const Product = ({ product }) => {
  const { t } = useTranslation();
  const { setCartSum, setCartDifferentItems, setCartTotalItems } = useContext(CartSumContext);

  const addToCart = (productClicked) => {
    // cartFromFile.push(product);
    // localStorage.setItem("cart", cartFromFile);

    const cartLS = JSON.parse(localStorage.getItem("cart") || "[]");

    const index = cartLS.findIndex(p => p.productId === productClicked.id);
    if (index !== -1) {
      cartLS[index].quantity++;
      // cartLS[index].quantity += 1;
      // cartLS[index].quantity = cartLS[index].quantity + 1;
    } else {
      cartLS.push({"quantity": 1, "productId": productClicked.id});
    }
    setCartSum(calculateCartSum(cartLS));
    setCartDifferentItems(cartLS.length);
    setCartTotalItems(calculateTotalItems(cartLS));
    localStorage.setItem("cart", JSON.stringify(cartLS));

    // 1. võtta vana seis localStoragest
    // 2. parse-da Array kujule ehk võtta jutumärgid maha
    // 3. lisada juurde   .push()
    // 4. paneme jutumärgid ise peale -> keerame Array Stringiks
    // 5. panna tagasi localStoragesse (set abil ehk asenda uue väärtusega vana)
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