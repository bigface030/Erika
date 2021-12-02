import { createSlice } from '@reduxjs/toolkit'
import { getProductsAPI, getProductAPI } from '../../webAPI/productAPI';

const initialState = {
  unfilteredProducts: '',
  products: '',
  product: '',
  error: '',
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setUnfilteredProducts: (state, action) => {
      state.unfilteredProducts = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
})

export const { 
  setUnfilteredProducts,
  setProducts,
  setProduct,
  setError,
} = productSlice.actions

export const getUnfilteredProducts = pathname => dispatch => {
  getProductsAPI(pathname, '')
    .then(result => {
      if(!result.ok) {
        dispatch(setUnfilteredProducts())
      }
      dispatch(setUnfilteredProducts(result.data))
    })
}

export const getProducts = (pathname, search) => dispatch => {
  getProductsAPI(pathname, search)
    .then(result => {
      if(!result.ok) {
        dispatch(setProducts())
        return dispatch(setError(result.message))
      }
      dispatch(setProducts(result.data))
      dispatch(setError())
    })
}

export const getProduct = id => dispatch => {
  getProductAPI(id)
    .then(result => {
      if(!result.ok) {
        dispatch(setProduct())
        return dispatch(setError(result.message))
      }
      dispatch(setProduct(result.data))
      dispatch(setError())
    })
}

export default productSlice.reducer