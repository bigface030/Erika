import { useRef, useState } from "react";

export default function useProduct () {
  
  function addCommaToPrice (price) {
    if(parseInt(price/1000)) return parseInt(price/1000).toString() + ',' + parseInt(price%1000/100).toString() + parseInt(price%100/10).toString() + parseInt(price%10).toString()
    return price.toString()
  }

  const [isChecked, setIsChecked] = useState(true)
  const [mainImg, setMainImg] = useState({src: '', alt: ''})
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const [qty, setQty] = useState(1)

  const scaledImg = useRef()

  const handleSizeChange = e => {
    setSize(e.target.value)
    setColor(null)
  }
  const handleColorChange = e => {
    setColor(e.target.value)
  }
  const handleQtyChange = e => {
    setQty(parseInt(e.target.value))
  }
  const handleBtnClick = direction => () => {
    if(direction === 'inc') return setQty(qty+1)
    if(direction === 'dec') return setQty(qty>1 ? qty-1 : qty)
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

  return {
    addCommaToPrice,
    mainImg,
    setMainImg,
    scaledImg,
    handleMouseMove,
    handleImgClick,
    isChecked,
    handleCheckedChange,
    size,
    color,
    qty, 
    setSize,
    handleBtnClick,
    handleSizeChange,
    handleColorChange,
    handleQtyChange
  };
}