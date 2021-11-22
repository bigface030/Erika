import { useState, useEffect, useRef } from "react";

export default function useCarousel() {
  
  const [W, setW] = useState(0)
  const [currentPage, setCurrentPage] = useState('page1')
  const [isDragging, setIsDragging] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const X = useRef(null);
  const banner = useRef(null);
  const timeoutID = useRef(null);

  useEffect(() => {
    W % 2 ? setCurrentPage('page2') : setCurrentPage('page1')
  }, [W, setCurrentPage])

  useEffect(() => {
    if(!isHovered){
      timeoutID.current = setTimeout(() => {
        banner.current.style.transition = '0s'
        banner.current.style.transform = `translateX(${-100 * (W%2+3) + 100}vw)`
        setTimeout(() => {
          banner.current.style.transition = '.5s'
          banner.current.style.transform = `translateX(${-100 * (W%2+3)}vw)`
          setW(W%2+1)
        })
      }, 5000)
    }
    if(isHovered) clearTimeout(timeoutID.current)
    return () => clearTimeout(timeoutID.current)
  }, [banner, W, isHovered])

  const handleMouseDown = e => {
    e.preventDefault();
    X.current = e.pageX;
    setIsDragging(true)
    setIsClicked(true)
  }
  const handleMouseMove = e => {
    e.preventDefault();
    setIsClicked(false)
    if(isDragging) banner.current.style.transition = '0s'
    if(X.current && isDragging && e.pageX - X.current < 0){
      banner.current.style.transform = `translateX(calc(${-100 * (W%2+3) + 100}vw + ${e.pageX-X.current}px))`
    }
    if(X.current && isDragging && e.pageX - X.current > 0){
      banner.current.style.transform = `translateX(calc(${-100 * (W%2+3) - 100}vw + ${e.pageX-X.current}px))`
    }
  }
  const handleMouseUp = e => {
    if(!isClicked && isDragging) handleTransform(e)
    setIsDragging(false)
  }
  const handleMouseLeave = e => {
    setIsHovered(false)
    if(isDragging) handleTransform(e)
    setIsDragging(false)
  }

  const handleTransform = e => {
    banner.current.style.transition = '.25s'
    if(e.pageX-X.current < 0 && e.pageX-X.current >= -100){
      return banner.current.style.transform = `translateX(${-100 * (W%2+3) + 100}vw)`
    }
    if(e.pageX-X.current > 0 && e.pageX-X.current <= 100){
      return banner.current.style.transform = `translateX(${-100 * (W%2+3) - 100}vw)`
    }
    banner.current.style.transform = `translateX(${-100 * (W%2+3)}vw)`
    if(e.pageX-X.current < -100) return setW(W%2+1)
    if(e.pageX-X.current > 100) return setW(W%2-1)
  }

  const handleMouseOver = e => {
    setIsHovered(true)
  }

  const handleClick = e => {
    if(!isClicked) e.preventDefault()
  }

  const handleButtonClick = direction => () => {
    banner.current.style.transition = '0s'
    if(direction === 'backward') {
      banner.current.style.transform = `translateX(${-100 * (W%2+3) - 100}vw)`
    }
    if(direction === 'forward') {
      banner.current.style.transform = `translateX(${-100 * (W%2+3) + 100}vw)`
    }
    setTimeout(() => {
      banner.current.style.transition = '.25s'
      banner.current.style.transform = `translateX(${-100 * (W%2+3)}vw)`
      if(direction === 'forward') return setW(W%2+1)
      if(direction === 'backward') return setW(W%2-1)
    })
  }

  const handleRadioChange = e => {
    setCurrentPage(e.target.value)
  }

  const handleRadioClick = page => () => {
    banner.current.style.transition = '0s'
    if(page === 1 && currentPage === "page2"){
      banner.current.style.transform = `translateX(-300vw)`
    }
    if(page === 2 && currentPage === "page1"){
      banner.current.style.transform = `translateX(-200vw)`
    }
    setTimeout(() => {
      banner.current.style.transition = '.25s'
      if(page === 1 && currentPage === "page2"){
        banner.current.style.transform = `translateX(-200vw)`
        setW(W%2-1)
      }
      if(page === 2 && currentPage === "page1"){
        banner.current.style.transform = `translateX(-300vw)`
        setW(W%2+1)
      }
    })
  }

  return {

    currentPage,
    banner,

    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleMouseOver,
    handleClick,
    handleButtonClick,
    handleRadioChange,
    handleRadioClick,

  };
}