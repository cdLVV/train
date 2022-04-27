import { createSlice } from "@reduxjs/toolkit";
// import { nanoid } from "nanoid";

export const shopCartSlice = createSlice({
  name: "shop",
  initialState: {
    carts: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // 在redux里面不能够，在redux tookit可以用push方法
      // state.hobbies.push({ id: nanoid(), hobby: action.payload });
    },
    deleteAll: (state) => {
      // state.hobbies = [];
    },
  },
});

// 将reducers里面的方法暴露出去，在container容器里面能够使用
// export const { addHobby, deleteAll } = shopCartSlice.actions;
