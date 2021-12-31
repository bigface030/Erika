import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpened: false,
  errorMessage: '',
  errorCode: '',
}

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
    setErrorCode: (state, action) => {
      state.errorCode = action.payload;
    },
  },
})

export const { 
  setIsOpened,
  setErrorMessage,
  setErrorCode,
  setErrorMessageArr
} = generalSlice.actions


export default generalSlice.reducer