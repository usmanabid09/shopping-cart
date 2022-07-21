import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from './../features/cart/store/slice';

const reducers = combineReducers({
    cartSlice
});

const store = configureStore({
    reducer: reducers
})

export default store;