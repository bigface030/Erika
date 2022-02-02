import styled from "styled-components"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { Span, H4, Btn, fontTheme, TextBtn } from "../../constants/style"

import { Img } from "../Img";
import { Link, useLocation } from "react-router-dom";
import { setCartStorage } from "../../features/cart/cartSlice";
import useCart from "../../hooks/useCart";
import { useRef } from "react";


const MenuBtn = styled.div`
  position: relative;
  & > input {
    display: none;
    &:checked {
        & ~ div {
            display: flex;
        }
        & + label {
            display: block;
        }
    }
  }
  & > button {
    &:hover span {
      cursor: pointer;
    }
    & span {
      position: absolute;
      width: 15px;
      line-height: 15px;
      vertical-align: middle;
      top: -5px;
      right: -5px;
      font-size: ${props => props.theme.fontSize.bodySmall};
      background-color: ${props => props.theme.color.black};
      color: ${props => props.theme.color.white};
      border-radius: 50%;
    }
  }
`

const CartContainer = styled.div`
  position: absolute;
  top: calc(35px + calc(28.5px/2));
  right: 0;
  width: 50vw;
  max-width: 300px;
  background-color: #fff;
  border: 1px solid #aaa;
  display: none;
  flex-direction: column;
  align-items: center;
  & > ul {
    max-height: 240px;
    overflow: auto;
  }
  & > h4 {
    padding: 20px;
  }
`

const CartCard = styled.li`
  display: flex;
  align-items: flex-start;
  text-align: left;
  & > button {
    padding: 5px;
    & svg {
      font-size: ${props => props.theme.fontSize.body};
      color: ${props => props.theme.color.black};
    }
  }
`

const CartImage = styled.div`
  margin: 5px;
  width: 30%;
  position: relative;
  & img {
    width: 100%;
  }
`
const CartInfo = styled.div`
  padding: 5px;
  width: 70%;
  ${fontTheme.span}
  font-weight: ${props => props.theme.fontWeight.l};
  & p {
    font-size: ${props => props.theme.fontSize.bodySmall};
    font-weight: ${props => props.theme.fontWeight.m};
  }
  & > span {
    color: ${props => props.theme.color.alert};
    font-weight: ${props => props.theme.fontWeight.l};
    & > span {
      text-decoration: line-through;
      color: ${props => props.theme.color.grey};
      margin-right: 3px;
    }
  }
`

const ToCartBtn = styled(TextBtn)`
  margin: 10px;
`

const Cover = styled.label`
  z-index: 0;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  display: none;
  // background-color: #aaaa;
`

export const Cart = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)

    const cartDOM = useRef()
    const { pathname, search } = useLocation()

    useEffect(() => {
      const cartItem = JSON.parse(localStorage.getItem('cart')) || [];
      dispatch(setCartStorage(cartItem))
    }, [dispatch])

    useEffect(() => {
      cartDOM.current.checked = false
    }, [pathname, search])
  
    const {
      handleDeleteCart
    } = useCart()

    const handleCloseHeaderCart = () => {
      cartDOM.current.checked = false
    }
  
    return (
      <MenuBtn>
        <Btn>
          <label htmlFor="cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            {cart && cart.length > 0 && (
              <Span>{cart.reduce(((acc, cur) => acc + cur.qty), 0)}</Span>
            )}
          </label>
        </Btn>
        <input type="checkbox" id="cart" ref={cartDOM} />
        <Cover htmlFor="cart" />
        <CartContainer>
          {cart ? (
            <>
              {cart.length > 0 ? (
                <ul>
                  {cart.map((item, i) => {
                    const url = `/product/${item.id}`
                    return (
                      <CartCard key={item.pattern_id}>
                        <CartImage>
                          <Link to={url}>
                            <Img image={{src: item.src, alt: item.alt}} />
                          </Link>
                        </CartImage>
                        <CartInfo>
                          {item.qty} x {item.name}
                          <p>尺寸: {item.size}, 顏色: {item.color}</p>
                          {item.is_sale ? (
                            <Span>
                              <Span>${item.price_standard}</Span>
                              ${item.price_sale}
                            </Span>
                            ) : (
                            <>${item.price_standard}</>
                          )}
                        </CartInfo>
                        <button onClick={handleDeleteCart(i)}>
                          <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                      </CartCard>
                    )
                  })}
                </ul>
              ) : (
                <H4>購物車內目前沒有商品</H4>
              )}
              {cart.length > 0 ? (
                <Link to="/cart" onClick={handleCloseHeaderCart}>
                    <ToCartBtn $active={true}>
                        前往結帳
                    </ToCartBtn>
                </Link>
              ) : (
                <ToCartBtn $active={false}>
                    前往結帳
                </ToCartBtn>
              )}
            </>
          ) : (
            <H4>商品載入中...</H4>
          )}
        </CartContainer>
      </MenuBtn>
    )
  }