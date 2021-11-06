import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import useCarousel from "../../hooks/useCarousel";

const BannerWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`

const BannerContainer = styled.div`
  display: flex;
  & img {
    width: 100vw;
  }
`

const Btn = styled.button`
  height: 50px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  z-index: 1;
  & svg {
    padding: 5px 10px;
    font-size: ${props => props.theme.fontSize.svgLarge};
    color: ${props => props.theme.color.light_primary}4;
    transition: .2s;
    filter: drop-shadow(0px 0px 0.75rem ${props => props.theme.color.black});
    &:hover {
      color: ${props => props.theme.color.light_primary}6;
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

const Dot = styled.button`
  width: 12px;
  height: 12px;
  background-color: ${props => props.theme.color.light_primary}6;
  display: block;
  border-radius: 50%;
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
  }
  & input {
    display: none;
    &:checked + button {
      background-color: ${props => props.theme.color.light_primary}d;
    }
  }
`

const ArrowContainer = styled.div``

const BannerImage = ({page, handleClick}) => {
  const link = `#${page}`
  const src = `https://picsum.photos/970/250?random=${page}`
  const alt = `BannerImage${page}`
  return (
    <Link to={link} onClick={handleClick}>
      <img src={src} alt={alt} />
    </Link>
  )
}

export const Carousel = () => {

  const {
    banner,
    currentPage,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleMouseOver,
    handleClick,
    handleButtonClick,
    handleRadioChange,
    handleRadioClick
  } = useCarousel();
  
  const bannerStyle = {
    transform: "translateX(-200vw)",
    transition: "0s"
  }

  return (
    <BannerWrapper onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver}>
      <DotContainer>
        <ul>
          <li>
            <label>
              <input 
                type="radio" 
                name="banner" 
                value="page1" 
                checked={currentPage === "page1"} 
                onChange={handleRadioChange} 
              />
              <Dot onClick={handleRadioClick(1)}/>
            </label>
          </li>
          <li>
            <label>
              <input 
                type="radio" 
                name="banner" 
                value="page2" 
                checked={currentPage === "page2"} 
                onChange={handleRadioChange} 
              />
              <Dot onClick={handleRadioClick(2)}/>
            </label>
          </li>
        </ul>
      </DotContainer>
      <ArrowContainer>
        <LeftBtn onClick={handleButtonClick('backward')}>
          <FontAwesomeIcon icon={faChevronDown}/>
        </LeftBtn>
        <RightBtn onClick={handleButtonClick('forward')}>
          <FontAwesomeIcon icon={faChevronDown}/>
        </RightBtn>
      </ArrowContainer>
      <BannerContainer 
        ref={banner} 
        style={bannerStyle} 
        onMouseDown={handleMouseDown} 
        onMouseMove={handleMouseMove} 
        onMouseUp={handleMouseUp}
      >
        <BannerImage page={1} handleClick={handleClick}/>
        <BannerImage page={2} handleClick={handleClick}/>
        <BannerImage page={1} handleClick={handleClick}/>
        <BannerImage page={2} handleClick={handleClick}/>
        <BannerImage page={1} handleClick={handleClick}/>
        <BannerImage page={2} handleClick={handleClick}/>
      </BannerContainer>
    </BannerWrapper>
  );
}