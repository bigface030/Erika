import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpened: false,
    errorMessage: '',
    popupCode: '',
};

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setIsOpened: (state, action) => {
            state.isOpened = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        setPopupCode: (state, action) => {
            state.popupCode = action.payload;
        },
    },
});

export const { setIsOpened, setErrorMessage, setPopupCode } =
    generalSlice.actions;

export default generalSlice.reducer;
