import { createSlice } from '@reduxjs/toolkit';
import { getProductsAPI, getProductAPI } from '../../webAPI/productAPI';

const initialState = {
    unfilteredProducts: null,
    products: null,
    product: null,
    error: null,
    spec: { size: '', color: '', qty: '' },
};

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
        setSize: (state, action) => {
            state.spec.size = action.payload;
        },
        setColor: (state, action) => {
            state.spec.color = action.payload;
        },
        setQty: (state, action) => {
            state.spec.qty = action.payload;
        },
    },
});

export const {
    setUnfilteredProducts,
    setProducts,
    setProduct,
    setError,
    setSize,
    setColor,
    setQty,
} = productSlice.actions;

export const getUnfilteredProducts = pathname => dispatch => {
    getProductsAPI(pathname, '').then(result => {
        if (!result.ok) {
            dispatch(setUnfilteredProducts(''));
        }
        dispatch(setUnfilteredProducts(result.data));
    });
};

export const getProducts = (pathname, search) => dispatch => {
    getProductsAPI(pathname, search).then(result => {
        if (!result.ok) {
            dispatch(setProducts(''));
            return dispatch(setError(result.message));
        }
        dispatch(setProducts(result.data));
        dispatch(setError(null));
    });
};

export const getProduct = id => dispatch => {
    getProductAPI(id).then(result => {
        if (!result.ok) {
            dispatch(setProduct(''));
            return dispatch(setError(result.message));
        }
        dispatch(setProduct(result.data));
        dispatch(setError(null));
    });
};

export default productSlice.reducer;
