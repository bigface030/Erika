import { createSlice } from '@reduxjs/toolkit'
import { getProductsAPI } from '../../webAPI/productAPI';

const initialState = {
  products: '',
  error: '',
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
})

export const { 
  setProducts,
  setError,
} = productSlice.actions

export const getProducts = (pathname, search) => dispatch => {
  getProductsAPI(pathname, search)
    .then(data => {
      if(!data.ok) {
        dispatch(setProducts())
        return dispatch(setError(data.message))
      }
      dispatch(setProducts(data.data))
      dispatch(setError())
    })
}

export default productSlice.reducer