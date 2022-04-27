import { configureStore } from "@reduxjs/toolkit";
import { shopCartSlice } from "./slices/shopCartReducer";

const store = configureStore({
  reducer: {
    shopCart: shopCartSlice.reducer,
  },
});

export default store;
