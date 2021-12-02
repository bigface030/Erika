import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons'

import { H3, H4, P, Span } from "../../constants/style"
import useProduct from "../../hooks/useProduct";


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
  & > span {
    color: ${props => props.theme.color.alert};
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

const ColorLabel = styled.label`
  & input {
    display: none;
    &:checked + span {
      border: ${props => (parseInt(props.$color, 16) <= parseInt('777777', 16)) ? 'medium double #eee' : 'thin solid #333'};
    }
  }
  & span {
    background-color: #${props => props.$color};
    position: relative;
    overflow: hidden;
    ${props => props.$isNull && 'cursor: not-allowed;'}
    &:before {
      content: '';
      width: 40px;
      position: absolute;
      transform: rotate(45deg);
      transform-origin: top left;
      top: 0;
      left: 0;
      background-color: #aaaa;
      height: 2px;
      display: ${props => props.$isNull ? 'block' : 'none'};
    }
    &:after {
      content: '';
      width: 40px;
      position: absolute;
      transform: rotate(-45deg);
      transform-origin: top right;
      top: 0;
      right: 0;
      background-color: #aaaa;
      height: 2px;
      display: ${props => props.$isNull ? 'block' : 'none'};
    }
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
    font-size: ${props => props.theme.fontSize.h4};
    color: ${props => props.theme.color.black};
  }
`

const PriceIsSale = styled(Price)`
  & h4 {
    &:nth-child(1) {
      color: ${props => props.theme.color.grey};
      text-decoration: line-through;
    }
    &:nth-child(2) {
      color: ${props => props.theme.color.alert};
      font-size: ${props => props.theme.fontSize.h3};
    }
    & + h4 {
      padding-left: 10px;
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

const ColorSelect = ({name, code, total, color, handleColorChange}) => {

    const isNull = !total ? true : false

    return (
      <ColorLabel $color={code} $isNull={isNull}>
        {!isNull && (
          <input 
            type="radio" 
            name="color" 
            value={name} 
            onChange={handleColorChange} 
            checked={color === name}
          />
        )}
        <ColorSpan />
      </ColorLabel>
    )
  }

export const Content = ({product, group}) => {

  const {
    addCommaToPrice,
    size,
    color,
    qty, 
    setSize,
    handleBtnClick,
    handleSizeChange,
    handleQtyChange,
    handleColorChange
  } = useProduct()

  useEffect(() => {
    if (!group || !product) return;
    setSize(product.product[`${group}s`][0].size)
  }, [product, group, setSize])

  return (
    <ContentContainer>
      {product ? (
        <div>
          <H3>{product.product.name}</H3>
          <P>{product.product.desc}</P>
        </div>
      ) : (
        <H3>商品載入中......</H3>
      )}
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
            {product && size && (
              <select value={size} onChange={handleSizeChange}>
                {product.product[`${group}s`].map(size => (
                  <option key={size.id} value={size.size}>{size.size}</option>
                ))}
              </select>
            )}
          </div>
        </SizeSelector>
        <ColorSelector>
          <H4>顏色</H4>
          <ul>
            {group && product.patterns
            .filter(pattern => pattern[group].size === size)
            .map((pattern, index) => (
              <li key={index}>
                <ColorSelect
                  name={pattern.Color.name}
                  code={pattern.Color.code}
                  total={pattern.total}
                  color={color}
                  handleColorChange={handleColorChange}
                />
              </li>
            ))}
          </ul>
          {size && color && product.patterns
          .find(pattern => (pattern[group].size === size) && (pattern.Color.name === color))
          .total <= 10 && (
            <Span>庫存數量少</Span>
          )}
        </ColorSelector>
        {product && (product.product.is_sale ? (
          <PriceIsSale>
            <H4>NT ${addCommaToPrice(product.product.price_standard)}</H4>
            <H4>NT ${addCommaToPrice(product.product.price_sale)}</H4>
          </PriceIsSale>
        ) : (
          <Price>
            <H4>NT ${addCommaToPrice(product.product.price_standard)}</H4>
          </Price>
        ))}
        <QtySelector>
          <div>
            <input
              type="number"
              value={qty}
              min={1}
              onChange={handleQtyChange}
            />
            <div>
              <button onClick={handleBtnClick('inc')}>
                  <FontAwesomeIcon icon={faChevronDown} transform={{ rotate: 180 }}/>
              </button>
              <button onClick={handleBtnClick('dec')}>
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
  )
}