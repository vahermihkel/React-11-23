import { createSlice } from "@reduxjs/toolkit";
import { calculateCartSum } from "../util/calculationsUtil";

const cartSumSlice = createSlice({
  name: "cartSum",
  initialState: {cartSum: 0},
  reducers: {
    initialize(state, action) {
      state.cartSum = action.payload;
    },
    add(state, action) {
      state.cartSum = state.cartSum + action.payload;
    },
    deduct(state, action) {
      state.cartSum = state.cartSum - action.payload;
    },
    empty(state) {
      state.cartSum = 0;
    }
  }
});

export const setInitialCart = () => {
  return async (dispatch) => {
    fetch(process.env.REACT_APP_PRODUCTS_DB_URL)
      .then(res => res.json())
      .then(json => {
        const cartLS = JSON.parse(localStorage.getItem("cart")) || [];
        const cartWithProducts = cartLS.map(element => ({
          "quantity": element.quantity,
          "product": json.find(product => product.id === element.productId)
        }));
        dispatch(cartSumActions.initialize(Number(calculateCartSum(cartWithProducts))));
      })
  }
}

export const cartSumActions = cartSumSlice.actions;
export default cartSumSlice.reducer;