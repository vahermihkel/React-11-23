import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { calculateCartSum, calculateTotalItems } from "../util/calculationsUtil";


      // tema kaudu hakkan võtma mida context väljastab
export const CartSumContext = createContext({
  cartSumState: 0,
  cartSum: "0",
  cartDifferentItems: 0,
  cartTotalItems: 0,
  updateCartProperties: (converted: boolean,  cartLS: any[]) => {},
  dispatchCartSum: (action: {type: string, payload: number}) => {}
});
      // state: eelnev väärtus    action: mida tehakse ja mis uue väärtuse ma kaasa annan
const cartSumReducer = (state: any, action: any) => {
  if (action.type === "INITIALIZE") {
    return action.payload;
  }
  if (action.type === "ADD") {
    return state + action.payload;
  }
  if (action.type === "DEDUCT") {
    //     610        50
    return state - action.payload;
  }
  if (action.type === "EMPTY") {
    return 0;
  }
  return state;
}

export function CartSumContextProvider({ children }: { children: React.ReactNode }) {
  const [cartSumState, dispatchCartSum] = useReducer(cartSumReducer, 0);

  const cart: any[] = useMemo(() => JSON.parse(localStorage.getItem("cart") || "[]"), []);
  const [cartSum, setCartSum] = useState("0.00");

  const [cartDifferentItems, setCartDifferentItems] = useState(cart.length);
  const [cartTotalItems, setCartTotalItems] = useState(calculateTotalItems(cart));
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_PRODUCTS_DB_URL || "") // võiks tegelikult olla muutujas ja returnida kui ei ole
      .then(res => res.json())
      .then((json: any[]) => {
        // setProducts(json);
        const cartWithProducts = cart.map(element => ({
          "quantity": element.quantity,
          "product": json.find(product => product.id === element.productId)
        }));
        // setCart(cartWithProducts);
        // setLoading(false);
        setProducts(json);
        // console.log(products);
        // console.log(json);
        setCartSum(calculateCartSum(cartWithProducts));
        dispatchCartSum({"type": "INITIALIZE", "payload": calculateCartSum(cartWithProducts)});
      })
  }, [cart]);

  const updateCartProperties = (convertedCart: boolean, cartLS: any[]) => {
    // setCartSum(newCartSum);
    if (convertedCart) {
      setCartSum(calculateCartSum(cartLS));
    } else {
      const cartWithProducts = cartLS.map(element => ({
        "quantity": element.quantity,
        "product": products.find(product => product.id === element.productId)
      }));
      setCartSum(calculateCartSum(cartWithProducts));
      localStorage.setItem("cart", JSON.stringify(cartLS));
    }
    setCartDifferentItems(cartLS.length);
    setCartTotalItems(calculateTotalItems(cartLS));
  }

  return (     // saan igast failist, kes contexti impordib neid alumisi kätte
    <CartSumContext.Provider value={{
      cartSumState, cartSum, cartDifferentItems,
      cartTotalItems, updateCartProperties,
      dispatchCartSum
      }}>
        {children}
    </CartSumContext.Provider>
  )
}
