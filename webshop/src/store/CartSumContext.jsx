import { createContext, useState } from "react";
import { calculateCartSum, calculateTotalItems } from "../util/calculationsUtil";


      // tema kaudu hakkan võtma mida context väljastab
export const CartSumContext = createContext();

            // index.js faili -> tema sees olev useState globaalne
export function CartSumContextProvider({ children }) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartSum, setCartSum] = useState(calculateCartSum(cart));

  const [cartDifferentItems, setCartDifferentItems] = useState(cart.length);
  const [cartTotalItems, setCartTotalItems] = useState(calculateTotalItems(cart));


  return (     // saan igast failist, kes contexti impordib neid alumisi kätte
    <CartSumContext.Provider value={{
      cartSum, setCartSum,
      cartDifferentItems, setCartDifferentItems,
      cartTotalItems, setCartTotalItems
      }}>
        {children}
    </CartSumContext.Provider>
  )
}
