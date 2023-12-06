import React, { useState } from 'react'
// import cartFromFile from "../../data/cart.json";
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import ParcelMachines from '../../components/cart/ParcelMachines';

//NÕUDED
// võtta failist kogu ostukorv +
// kuvada välja + 
// võimaldada ühte ostukorvist kustutada +
// ostukorvi tühjendada +
// dünaamiline väljakuvamine ehk kui ostukorv on tühi, näidatakse midagi muud +
// ostukorvi kogusumma +

const Cart = () => {

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));
  const { t } = useTranslation();

  // 
  // uef
  // useEffect(() => { // componentDidMount()
  //   console.log("re-renderdasin");
  //   fetchPMs();
  // }, []);

  // const fetchPMs = async () => {
  //   const data = await fetch(url)
  //     .then(response => response.json());
  //   const result = data.filter();
  //   setParcelMachines(data);
  // }

  const emptyCart = () => {
    cart.splice(0);
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const deleteFromCart = (index) => {
    cart.splice(index, 1);
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const calculateCartSum = () => {
    let sum = 0;
    
    cart.forEach(product => sum += product.price);

    return sum.toFixed(2);
  }

  return (
    <div>
      {cart.length > 0 && <button onClick={emptyCart}>{t("cart.empty")}</button>}
      <div>{t("cart.cart-has")} {cart.length} {t("cart.products")}</div>
      {
      cart.map((product, id) =>
        <div key={id}>
          <img src={product.image} alt="" />
          <div>{product.name}</div>
          <div>{product.description}</div>
          <div>{product.category}</div>
          <div>{product.price.toFixed(2)} €</div>
          <div>{product.active + 0}</div>
          <button onClick={() => deleteFromCart(id)}>x</button>
        </div>
      )}
      {
        cart.length === 0 &&
        <> 
          <div>
            {t("cart.empty-cart")}
          </div>
          <Link to="/">
              <button>{t("cart.view-products")}</button>
          </Link>
        </>
      }

      <div>{t("cart.total-sum")}: {calculateCartSum()} € </div>

      <ParcelMachines />

    </div>
  )
}

export default Cart

// 07.12   14.00-17.15   Firebase -> Hosting, Kategooriad Andmebaasi, Tooted andmebaasi
// 12.12                 Makse: EveryPay + kogused ostukorvis + kujundust + css modules
// 14.12                 Components + komponentide vaheline suhtlus (props)
// 19.12                 Context