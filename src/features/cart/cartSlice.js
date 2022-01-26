import { createSlice } from '@reduxjs/toolkit'
import { getProductAPI } from '../../webAPI/productAPI';
import { setError } from '../product/productSlice';

const initialState = {
  cart: null, 
  errorMessage: '',
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setCartQty: (state, action) => {
      state.cart.find(item => 
        item.pattern_id === action.payload.pattern_id
      ).qty = action.payload.qty
    },
    deleteCart: (state, action) => {
      state.cart = state.cart.filter((item, index) => index !== action.payload)
    },
    addCart: (state, action) => {
      state.cart.push(action.payload);
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
})

export const { 
  setCart,
  setCartQty,
  addCart,
  deleteCart,
  setErrorMessage
} = cartSlice.actions


export const getCartStorage = () => dispatch => {
  const cartItem = JSON.parse(localStorage.getItem('cart')) || [];
  dispatch(setCartStorage(cartItem))
}

const getProductInfo = item => dispatch => {
  return getProductAPI(item.id)
    .then(result => {
      if(!result.ok) {
        dispatch(setError(result.message))
        throw new Error(result.message)
      }
      return result.data
    })
    .then(product => {
      item.name = product.product.name;
      const itemPattern = product.patterns.find(pattern => (pattern.id === item.pattern_id))
      const group = product.product.Category.group.slice(0, -1)
      item.size = itemPattern[group].size;
      item.color = itemPattern.Color.name;
      item.total = itemPattern.total;
      item.price_standard = product.product.price_standard;
      item.price_sale = product.product.price_sale;
      item.is_on = product.product.is_on;
      item.is_sale = product.product.is_sale;
      const mainImg = product.product.Images.find(img => img.is_main)
      item.src = mainImg.src;
      item.alt = mainImg.alt;
    })
    .catch(e => console.log(e.message))
}

export const setCartStorage = items => dispatch => {
  Promise.all(
    items.map(async item => {
        await dispatch(getProductInfo(item))
        return item
    })
  ).then(items => {
    console.log(items)
    dispatch(setCart(items))
  })
}

export const addCartStorage = item => dispatch => {
  dispatch(getProductInfo(item))
    .then(() => dispatch(addCart(item)))
}

export default cartSlice.reducer