import { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux'
import { addCartStorage, setCartQty } from "../features/cart/cartSlice";
import { setErrorCode, setErrorMessage, setIsOpened } from "../features/general/generalSlice";
import { setColor, setQty, setSize } from "../features/product/productSlice";

export default function useProduct (spec, product, group, isOpened) {

  const [isChecked, setIsChecked] = useState(true)
  const [mainImg, setMainImg] = useState({src: '', alt: ''})

  const scaledImg = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    if(isOpened) return;
    if (!group || !product) return;
    const size_Initialized = product ? product.product[`${group}s`][0].size : ''
    dispatch(setSize(size_Initialized))
    dispatch(setColor(''))
    dispatch(setQty(1))
  }, [product, group, dispatch, isOpened])

  const handleClosePopup = () => {
    dispatch(setIsOpened(false))
    dispatch(setErrorCode(''))
    dispatch(setErrorMessage(''))
  }

  const handleSizeChange = e => {
    dispatch(setSize(e.target.value))
    dispatch(setColor(''))
  }
  const handleColorChange = isNull => e => {
    if(isNull) return;
    dispatch(setColor(e.target.value))
  }
  const handleQtyChange = e => {
    dispatch(setQty(parseInt(e.target.value)))
  }
  const handleBtnClick = direction => {
    if(direction === 'inc') return dispatch(setQty(spec.qty+1))
    if(direction === 'dec') {
      if(spec.qty<=1) return 
      dispatch(setQty(spec.qty-1))
    }
  }

  const handleMouseMove = e => {
    e.preventDefault();
    const offsetX = e.nativeEvent.offsetX > 0 ? e.nativeEvent.offsetX : 0
    const offsetY = e.nativeEvent.offsetY > 0 ? e.nativeEvent.offsetY : 0
    const offsetWidth = e.target.offsetWidth
    const perX = offsetX / offsetWidth
    const perY = offsetY / offsetWidth
    scaledImg.current.style.left = `-${perX*100}%`
    scaledImg.current.style.top = `-${perY*100}%`
  }

  const handleImgClick = e => {
    if(e.target.tagName === 'IMG'){
      setMainImg({src: e.target.src, alt: e.target.alt})
    }
  }

  const handleCheckedChange = () => {
    setIsChecked(!isChecked)
  }

  const handleAddToCart = () => {
    if(!spec.size || !spec.color) return dispatch(setErrorMessage('請選擇尺寸或顏色'))
    const cartItem = JSON.parse(localStorage.getItem('cart')) || [];
    WriteToLocalStorage(cartItem)
    dispatch(setIsOpened(true))
  }


  function WriteToLocalStorage (cartItem) {
    const pattern_id = product.patterns.find(pattern => (pattern.Color.name === spec.color) && (pattern[group].size === spec.size)).id
    const newItem = {
      pattern_id,
      qty: spec.qty,
    }
    const getItem = cartItem.find(item => 
      item.pattern_id === newItem.pattern_id
    )
    if (getItem) {
      getItem.qty += spec.qty
      newItem.qty = getItem.qty
      dispatch(setCartQty(newItem))
    } else {
      newItem.id = product.product.id
      cartItem.push(newItem)
      dispatch(addCartStorage(newItem))
    }
    return localStorage.setItem('cart', JSON.stringify(cartItem))
  }

  function addCommaToPrice (price) {
    if(parseInt(price/1000)) return parseInt(price/1000).toString() + ',' + parseInt(price%1000/100).toString() + parseInt(price%100/10).toString() + parseInt(price%10).toString()
    return price.toString()
  }

  return {
    addCommaToPrice,
    mainImg,
    setMainImg,
    scaledImg,
    handleMouseMove,
    handleImgClick,
    isChecked,
    handleCheckedChange,
    handleBtnClick,
    handleSizeChange,
    handleColorChange,
    handleQtyChange,
    handleAddToCart,
    handleClosePopup,
  };
}