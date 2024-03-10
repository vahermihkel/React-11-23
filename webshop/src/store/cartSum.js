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
  // return async (dispatch) => {
    
  // }
}

export const cartSumActions = cartSumSlice.actions;
export default cartSumSlice.reducer;