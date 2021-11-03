import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const BannerWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`

const BannerContainer = styled.div`
  display: flex;
  & img {
    width: 100vw;
    vertical-align: middle;
  }
`

const Btn = styled.span`
  height: 50px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  z-index: 1;
  & svg {
    padding: 5px 10px;
    font-size: 38px;
    color: #eee4;
    transition: .2s;
    filter: drop-shadow(0px 0px 0.75rem #333);
    &:hover {
      cursor: pointer;
      color: #eee6;
    }
    &:active ~ div {
      transition: .25s;
      transform: translateX(-400vw);
    }
  }
`

const LeftBtn = styled(Btn)`
  left: 2.5%;
  & svg {
    transform: rotate(90deg);
  }
`

const RightBtn = styled(Btn)`
  right: 2.5%;
  & svg {
    transform: rotate(270deg);
  }
`

const Dot = styled.span`
  width: 12px;
  height: 12px;
  background-color: #eee6;
  display: block;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  position: relative;
  transition: .25s;
`

const DotContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1;
  width: 50px;
  & ul {
    margin: 0 10px 10px;
    display: flex;
    justify-content: space-between;
    & li {
      display: flex;
      align-items: center;
    }
  }
  & input {
    display: none;
    &:checked + span {
      background-color: #eeed;
    }
  }
`

export const Carousel = () => {
  
  const bannerStyle = {
    transform: "translateX(-200vw)",
    transition: "0s"
  }

  const [W, setW] = useState(0)
  const [currentPage, setCurrentPage] = useState('page1')
  const [isDragging, setIsDragging] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const X = useRef(null);
  const banner = useRef(null);

  useEffect(() => {
    W % 2 ? setCurrentPage('page2') : setCurrentPage('page1')
  }, [W, setCurrentPage])

  const timeoutID = useRef(null);
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
  }, [W, isHovered])

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

  const handleButtonClick = direction => e => {
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

  const handleRadioClick = page => e => {
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

  return (
    <BannerWrapper onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver}>
      <DotContainer>
        <ul>
          <li>
            <label>
              <input type="radio" name="banner" value="page1" checked={currentPage === "page1"} onChange={handleRadioChange}/>
              <Dot onClick={handleRadioClick(1)}/>
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="banner" value="page2" checked={currentPage === "page2"} onChange={handleRadioChange} />
              <Dot onClick={handleRadioClick(2)}/>
            </label>
          </li>
        </ul>
      </DotContainer>
      <div>
        <LeftBtn onClick={handleButtonClick('backward')}>
          <FontAwesomeIcon icon={faChevronDown}/>
        </LeftBtn>
        <RightBtn onClick={handleButtonClick('forward')}>
          <FontAwesomeIcon icon={faChevronDown}/>
        </RightBtn>
      </div>
      <BannerContainer ref={banner} style={bannerStyle} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <Link to="#1" onClick={handleClick}><img src="https://picsum.photos/970/250?random=1" alt="1" /></Link>
        <Link to="#2" onClick={handleClick}><img src="https://picsum.photos/970/250?random=2" alt="2" /></Link>
        <Link to="#1" onClick={handleClick}><img src="https://picsum.photos/970/250?random=1" alt="1" /></Link>
        <Link to="#2" onClick={handleClick}><img src="https://picsum.photos/970/250?random=2" alt="2" /></Link>
        <Link to="#1" onClick={handleClick}><img src="https://picsum.photos/970/250?random=1" alt="1" /></Link>
        <Link to="#2" onClick={handleClick}><img src="https://picsum.photos/970/250?random=2" alt="2" /></Link>
      </BannerContainer>
    </BannerWrapper>
  );
}