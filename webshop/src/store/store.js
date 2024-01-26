import { configureStore } from "@reduxjs/toolkit";
import cartSumReducer from "./cartSum";

            // createStore()
const store = configureStore({reducer: {cartSumReducer: cartSumReducer}});

export default store;