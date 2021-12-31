import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/product/productSlice'
import generalReducer from '../features/general/generalSlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    general: generalReducer,
    cart: cartReducer,
  },
})