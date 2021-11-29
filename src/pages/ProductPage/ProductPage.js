import { createContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons'

import { MEDIA_QUERY, H3, H4, P, Span, Btn, PageWrapper, PageContainer } from "../../constants/style"

import { CrumbNav } from "../../components/CrumbNav";
import { Aside } from "../../components/Aside";

import useProduct from "../../hooks/useProduct";


const MainContainer = styled.main`
  width: 80%;
  flex-grow: 1;
`

const ItemContainer = styled.div`
  display: flex;
  & > div {
    width: 50%;
    padding: 10px;
  }
  ${MEDIA_QUERY.m} {
    display: block;
    & > div {
      width: 90%;
      margin: 0 auto;
    }
  }
`

const ImageContainer = styled.div`
  & img {
    width: 100%;
  }
`

const ImageMain = styled.div`
  border: 1px solid #aaa;
  margin-bottom: 5px;
  overflow: hidden;
  position: relative;
  @media (min-width: 512px) {
    &:hover {
      cursor: crosshair;
      & > img:last-child {
        opacity: 0;
      }
    }
  }
  & > img:first-child {
    z-index: -1;
    transform: scale(2);
    transform-origin: top left;
    position: absolute;
    top: -50%;
    left: -50%;
  }
`

const ContentContainer = styled.div`
  & h3 {
    padding-bottom: 10px;
    border-bottom: 1px solid #aaa;
    margin-bottom: 10px;
  }
  & p {
    font-weight: ${props => props.theme.fontWeight.m};
    line-height: 1.75em;
  }
  & h4 {
    font-size: ${props => props.theme.fontSize.bodyLarge};
    padding: 5px 0;
  }
  & > div {
    padding-bottom: 20px;
    & > div {
      padding: 5px 0;
    }
  }
`

const ColorSelector = styled.div`
  & ul {
    display: flex;
    & li {
      z-index: 1;
      & + li {
        margin-left: 5px;
      }
    }
  }
`

const ColorLabel = styled.label`
  & input {
    display: none;
  }
  & span {
    background-color: ${props => props.theme.color[props.$color]};
  }
  & input:checked + span {
    border: ${props => (props.$color === 'black') || 'thin solid #333'};
    border: ${props => (props.$color === 'black') && 'medium double #eee'};
  }
`

const ColorSpan = styled.span`
  display: block;
  box-sizing: border-box;
  border: 1px solid #aaa8;
  width: 30px;
  height: 30px;
`

const Price = styled.div`
  & h4 {
    display: inline-block;
    font-weight: ${props => props.theme.fontWeight.m};
    font-size: ${props => props.theme.fontSize.h3};
    &:nth-child(1) {
      color: ${props => props.theme.color.grey};
      text-decoration: line-through;
      font-size: ${props => props.theme.fontSize.h4};
    }
    &:nth-child(2) {
      color: ${props => props.theme.color.alert};
    }
    & + h4 {
      padding-left: 10px;
    }
  }
`

const AddBtn = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  border-radius: .25em;
  transition: .2s;
  background-color: ${props => props.theme.color.black};
  &:hover {
    background-color: ${props => props.theme.color.lightGrey};
  }
  & span {
    font-size: ${props => props.theme.fontSize.body};
    font-weight: ${props => props.theme.fontWeight.l};
    color: ${props => props.theme.color.white};
  }
  & svg {
    font-size: ${props => props.theme.fontSize.bodyLarge};
    color: ${props => props.theme.color.white};
    margin-right: 5px;
  }
`

const SizeSelector = styled.div`
  & > div {
    position: relative;
    width: 60px;
    height: 33px;
    & > div {
      display: flex;
      height: 100%;
      box-sizing: border-box;
      border: 1px solid #aaa;
      & span {
        width: 50%;
        padding-left: 5px;
        margin: auto 0;
        font-size: ${props => props.theme.fontSize.body};
      }
    }
    & svg {
      display: block;
      margin: auto;
      color: ${props => props.theme.color.grey};
      font-size: ${props => props.theme.fontSize.bodySmall};
    }
    & select {
      position: absolute;
      top: 0;
      opacity: 0;
      padding: 5px;
      outline: 0;
      border-color: ${props => props.theme.color.lightGrey};
      width: 60px;
    }
  }
`

const QtySelector = styled.div`
  display: flex;
  & > div {
    height: 40px;
    position: relative;
    & > input {
      box-sizing: border-box;
      width: 60px;
      padding-left: 5px;
      height: 100%;
      outline: 0;
      border: 1px solid #aaa;
    }
    & > div {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      & > button {
        box-sizing: content-box;
        height: 18.5px;
        border: 1px solid #aaa;
        transition: .25s;
        background-color: ${props => props.theme.color.white};
        & + button {
          margin-top: -1px;
        }
        & svg {
          display: block;
          margin: auto;
          color: ${props => props.theme.color.grey};
          font-size: ${props => props.theme.fontSize.bodySmall};
        }
        &:hover {
          background-color: #eee;
        }
      }
    }
  }
`

const WishList = styled(P)`

  & svg {
    color: ${props => props.theme.color.grey};
    font-size: ${props => props.theme.fontSize.body};
    margin-right: 3px;
  }
  & span {
    color: ${props => props.theme.color.grey};
    font-weight: ${props => props.theme.fontWeight.l};
  }
`

const ImageCarousel = styled.div`
  padding: 5px;
  display: flex;
  & > div {
    width: calc(100%/3);
    border: 1px solid #aaa;
    margin: 5px;
  }
  ${MEDIA_QUERY.l} {
    & > div:last-child {
      display: none;
    }
  }
  ${MEDIA_QUERY.m} {
    & > div:last-child {
      display: block;
    }
  }
  ${MEDIA_QUERY.s} {
    & > div:last-child {
      display: none;
    }
  }
`

const DetailContainer = styled.div`
  padding: 10px;
  ${MEDIA_QUERY.m} {
    width: 90%;
    margin: 0 auto;
  }
`
const DetailTag = styled.div`
  text-align: center;
  padding: 10px 0 20px;
`
const TagBtn = styled.button`
  margin: 5px;
  padding: 5px 15px;
  border-radius: .25em;
  border: 1px solid ${props => props.$checked ? props.theme.color.black : props.theme.color.lightGrey};
  transition: .4s;
  background-color: ${props => props.$checked ? props.theme.color.black : props.theme.color.white};
  & span {
    font-size: ${props => props.theme.fontSize.bodyLarge};
    font-weight: ${props => props.theme.fontWeight.l};
    color: ${props => props.$checked ? props.theme.color.white : props.theme.color.black};
  }
  &:hover {
    background-color: ${props => props.theme.color.black};
    border-color: ${props => props.theme.color.black};
    & span {
      color: ${props => props.theme.color.white};
    }
    &::before {
      opacity: 1;
    }
  }
  position: relative;
  &::before {
    opacity: ${props => props.$checked ? 1 : 0};
    transition: .4s;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: -8px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 8px solid ${props => props.theme.color.black};
  }
  position: relative;
  & label {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;
  }
`
const DetailContent = styled.div`
  border: 1px solid #aaa;
  padding: 20px;
  & > input {
    display: none;
    &:checked + div {
      opacity: 1;
      position: relative;
      top: 0px;
      transition: opacity .5s;
    }
  }
  position: relative;
  & > div {
    z-index: -1;
    opacity: 0;
    position: absolute;
    top: -200px;
    margin: 10px;
  }
  ${MEDIA_QUERY.s} {
    padding: 0;
  }
`

const InfoContainer = styled.div`
  & h4 {
    font-size: ${props => props.theme.fontSize.bodyLarge};
    font-weight: ${props => props.theme.fontWeight.xl};
    padding: 5px 0 10px;
  }
  & p {
    color: ${props => props.theme.color.grey};
    padding-bottom: 10px;
  }
`
const SizeContainer = styled.div`
  overflow: auto;
  & table {
    border-collapse: collapse;
  }
  & th, td {
    border: 1px solid #aaa;
    width: 150px;
    text-align: center;
    padding: 5px 0;
    & span {
      display: block;
    }
  }
  & th, td, span {
    font-size: ${props => props.theme.fontSize.bodyLarge};
    font-weight: ${props => props.theme.fontWeight.l};
    color: ${props => props.theme.color.black};
    line-height: 1.5em;
  }
`

const ColorSelect = ({currentColor, setColor}) => {

  const colors = {
    white: 'light_primary',
    black: 'black',
    grey: 'lightGrey',
    yellow: 'yellow',
    brown: 'brown',
  }

  const handleColorChange = e => {
    setColor(e.target.value)
  }

  return (
    <ColorLabel $color={colors[currentColor]}>
      <input 
        type="radio" 
        name="color" 
        value={currentColor} 
        onChange={handleColorChange} 
      />
      <ColorSpan />
    </ColorLabel>
  )
}

export default function ProductPage () {

    const { id } = useParams()

    const { addCommaToPrice } = useProduct()

    const pathArr = ['', 'collection', 'men', 'tops']
    const colors = ['brown', 'yellow', 'white', 'grey', 'black']

    const [size, setSize] = useState('S')
    const [color, setColor] = useState(null)
    const [qty, setQty] = useState(1)

    const [mainImg, setMainImg] = useState({
      src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80',
      alt: '男裝素色圓領短袖T恤_01'
    })

    const [isChecked, setIsChecked] = useState(true)

    const scaledImg = useRef()

    const handleSizeChange = e => {
      setSize(e.target.value)
    }
    const handleQtyChange = e => {
      setQty(parseInt(e.target.value))
    }
    const handleClick = direction => () => {
      if(direction === 'inc') return setQty(qty+1)
      if(direction === 'dec') return setQty(qty>1 ? qty-1 : qty)
    }

    const handleCheckedChange = () => {
      setIsChecked(!isChecked)
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

    return (
        <>
          <CrumbNav pathArr={pathArr} name="男裝素色圓領短袖T恤" />
          <PageWrapper>
            <PageContainer>
              <Aside />
              <MainContainer>
                <ItemContainer>
                  <ImageContainer>
                    <ImageMain onMouseMove={handleMouseMove}>
                      <img src={mainImg.src} alt={mainImg.alt} ref={scaledImg} />
                      <img src={mainImg.src} alt={mainImg.alt} />
                    </ImageMain>
                    <ImageCarousel onClick={handleImgClick}>
                      <div>
                        <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80" alt="01" />
                      </div>
                      <div>
                        <img src="https://picsum.photos/250/250?random=2" alt="02" />
                      </div>
                      <div>
                        <img src="https://picsum.photos/250/250?random=3" alt="03" />
                      </div>
                      <div>
                        <img src="https://picsum.photos/250/250?random=4" alt="04" />
                      </div>
                    </ImageCarousel>
                  </ImageContainer>
                  <ContentContainer>
                    <div>
                      <H3>男裝素色圓領短袖T恤</H3>
                      <P>使用有機棉製成，舒適棉質，親膚透氣。領口設計經過精心熟慮的思考，製成舒適耐用的t恤。素色基本款實穿百搭，搭配不出錯。</P>
                    </div>
                    <div>
                      <SizeSelector>
                        <H4>尺寸</H4>
                        <div>
                          <div>
                            <span>{size}</span>
                            <span>
                              <FontAwesomeIcon icon={faChevronDown} transform={{ rotate: 0 }}/>
                            </span>
                          </div>
                          <select value={size} onChange={handleSizeChange}>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                          </select>
                        </div>
                      </SizeSelector>
                      <ColorSelector>
                        <H4>顏色</H4>
                        <ul>
                          {colors.map(c => (
                            <li key={c}>
                              <ColorSelect
                                currentColor={c}
                                setColor={setColor}
                              />
                            </li>
                          ))}
                        </ul>
                      </ColorSelector>
                      <Price>
                        <H4>NT ${addCommaToPrice(1490)}</H4>
                        <H4>NT ${addCommaToPrice(1290)}</H4>
                      </Price>
                      <QtySelector>
                        <div>
                          <input
                            type="number"
                            value={qty}
                            min={1}
                            onChange={handleQtyChange}
                          />
                          <div>
                            <button onClick={handleClick('inc')}>
                              <FontAwesomeIcon icon={faChevronDown} transform={{ rotate: 180 }}/>
                            </button>
                            <button onClick={handleClick('dec')}>
                              <FontAwesomeIcon icon={faChevronDown} transform={{ rotate: 0 }}/>
                            </button>
                          </div>
                        </div>
                        <AddBtn>
                          <FontAwesomeIcon icon={faShoppingCart} />
                          <Span>加入購物車</Span>
                        </AddBtn>
                      </QtySelector>
                      <WishList>
                        <Link to="#">
                          <FontAwesomeIcon icon={faHeart} />
                          <Span>加入願望清單</Span>
                        </Link>
                      </WishList>
                    </div>
                  </ContentContainer>
                </ItemContainer>
                <DetailContainer>
                  <DetailTag>
                    <TagBtn $checked={isChecked}>
                      <label htmlFor="detail_info" />
                      <Span>商品詳情</Span>
                    </TagBtn>
                    <TagBtn $checked={!isChecked}>
                      <label htmlFor="detail_size" />
                      <Span>尺寸資訊</Span>
                    </TagBtn>
                  </DetailTag>
                  <DetailContent>
                    <input type="radio" name="detail" id="detail_info" checked={isChecked} onChange={handleCheckedChange} />
                    <InfoContainer>
                      <H4>材質</H4>
                      <P>100%棉</P>
                      <H4>清洗方式</H4>
                      <P>最高水洗溫度攝氏三十度溫和洗程序。不可漂白，不可翻滾烘乾。不可以專業乾洗，不可浸泡。</P>
                    </InfoContainer>
                    <input type="radio" name="detail" id="detail_size" checked={!isChecked} onChange={handleCheckedChange} />
                    <SizeContainer>
                      <table>
                        <tr>
                          <td></td>
                          <th>
                            <span>Sleeve Length</span>
                            <span>袖長</span>
                          </th>
                          <th>
                            <span>Body Length</span>
                            <span>衣長</span>
                          </th>
                          <th>
                            <span>Body Width</span>
                            <span>胸寬</span>
                          </th>
                        </tr>
                        <tr>
                          <td>M</td>
                          <td>42cm</td>
                          <td>69cm</td>
                          <td>51cm</td>
                        </tr>
                        <tr>
                          <td>L</td>
                          <td>44cm</td>
                          <td>72cm</td>
                          <td>54cm</td>
                        </tr>
                      </table>
                    </SizeContainer>
                  </DetailContent>
                </DetailContainer>
              </MainContainer>
            </PageContainer>
          </PageWrapper>
          {/* <Feed /> */}
        </>
    )
}