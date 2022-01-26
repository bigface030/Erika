import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import { fontTheme, H2, MEDIA_QUERY, P, TextBtn, H4 } from "../../constants/style"

import useProduct from "../../hooks/useProduct"
import useCart from "../../hooks/useCart"
import { setErrorMessage } from "../../features/cart/cartSlice"
import { CheckoutFlow } from "../../components/CheckoutFlow"
import { CartItem, MobileCartItem } from "./CartItem"


const PageWrapper = styled.div``

const PageContainer = styled.div`
    width: 90%;
    ${MEDIA_QUERY.m} {
        width: 95%;
    }
    margin: 0 auto;
    //   display: flex;
    //   align-items: flex-start;
`

const TableContainer = styled.div`
    & table {
        width: 100%;
        border: 1px solid #aaa;
        & th, td {
            ${fontTheme.p}
            color: ${props => props.theme.color.black};
            border-top: 1px solid #aaa;
            border-bottom: 1px solid #aaa;
        }
        & tr {
            vertical-align: top;
            & th {
                text-align: left;
                padding: 5px 10px;
                background-color: ${props => props.theme.color.lightGrey};
                color: ${props => props.theme.color.white};
                font-weight: ${props => props.theme.fontWeight.xl};
            }
            & td {
                padding: 10px;
            }
        }
    }
`

const CartContainer = styled(TableContainer)`
    padding: 10px 0;
    & table {
        & th, td {
            ${MEDIA_QUERY.m} {
                &:nth-child(3) {
                    display: none;
                }
            }
            &:nth-last-child(2) {
                width: 15%;
            }
        }
        & td:first-child {
            width: 10%;
            position: relative;
            & img {
                width: 100%;
                min-width: 80px;
            }
        }
    }
    ${MEDIA_QUERY.s} {
        display: none;
    }
`

const ADDSTYLE = css`
    display: inline-block;
    margin-left: 10px;
    ${MEDIA_QUERY.s} {
        display: block;
        width: fit-content;
        margin: 20px 0 0 auto;
    }
`

const TotalContainer = styled.div`
    margin-bottom: 20px;
    padding: 10px 0;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: baseline;
    ${fontTheme.h4}
    ${MEDIA_QUERY.s} {
        display: block;
        text-align: right;
    }
    & > a {
        color: ${props => props.theme.color.black};
        display: block;
        margin: 10px 0;
        & svg {
            margin-right: 4px;
        }
    }
    & > div {
        color: ${props => props.theme.color.black};
        & span {
            ${fontTheme.h3}
        }
        & a {
            ${ADDSTYLE}
        }
    }
`



const ToCartBtn = styled(TextBtn)`
    vertical-align: bottom;
    padding: 5px 20px;
    ${fontTheme.h4}
    ${props => !props.$active && ADDSTYLE}
`

const MobileCartContainer = styled.div`
    display: none;
    padding: 10px 0;
    ${MEDIA_QUERY.s} {
        display: block;
    }
    & > p {
        ${fontTheme.span}
        border-bottom: 1px solid #aaa;
    }
`


export default function CartPage () {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)
    const error = useSelector(state => state.product.error)
    const errorMessage = useSelector(state => state.cart.errorMessage)

    useEffect(() => {
        if(!cart || !cart.length) return
        const arr = Array(cart.length).fill('').map((element, index) => {
            if(cart[index].qty > cart[index].total){
                element = '選擇的數量超過庫存數量!'
            }
            if(cart[index].qty === 0){
                element = '選擇的數量不可為0!'
            }
            if(!cart[index].is_on){
                element = '此商品已下架, 請從購物車移除!'
            }
            return element
        })
        dispatch(setErrorMessage(arr))
    }, [dispatch, cart])

    const {
        addCommaToPrice
    } = useProduct()

    const {
        getTotal,
        hasError
    } = useCart()

    return (
        <PageWrapper>
            <PageContainer>
                <H2>購物車</H2>
                <CheckoutFlow step={1}/>
                <CartContainer>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>商品名稱</th>
                                <th>尺寸 / 顏色</th>
                                <th>售價</th>
                                <th>數量</th>
                                <th>小計</th>
                                <th></th>
                            </tr>
                        </thead>
                        {cart && cart.every(item => item.name) && !error && cart.length > 0 && (
                            <tbody>
                                {cart.map((item, index) => (
                                    <CartItem 
                                        key={index}
                                        item={item} 
                                        index={index}
                                    />
                                ))}
                            </tbody>
                        )}
                    </table>
                    {cart && cart.every(item => item.name) && !error && !cart.length > 0 && (<H4>購物車內暫無商品</H4>)}
                    {(!cart || !cart.every(item => item.name)) && (
                        error ? (
                            <H4>{error}</H4>
                        ) : (
                            <H4>商品載入中...</H4>
                        )
                    )}
                </CartContainer>
                <MobileCartContainer>
                    <P>全部商品 ({cart ? cart.length : '-'})</P>
                    <ul>
                        {(!cart || !cart.every(item => item.name)) && (
                            error ? (
                                <H4>{error}</H4>
                            ) : (
                                <H4>商品載入中...</H4>
                            )
                        )}
                        {cart && cart.every(item => item.name) && !error && (
                            cart.length > 0 ? (
                                cart.map((item, index) => (
                                    <MobileCartItem 
                                        key={index}
                                        item={item} 
                                        index={index}
                                    />
                                ))
                            ) : (
                                <H4>購物車內暫無商品</H4>
                            )
                        )}
                    </ul>
                </MobileCartContainer>
                <TotalContainer>
                    {cart && !error && (
                        <div>
                            總金額 (不含運費) : 
                            <span>
                                ${cart.length > 0 ? (
                                    addCommaToPrice(getTotal(cart))
                                ) : (
                                    '-'
                                )}
                            </span>
                            {hasError(errorMessage) ? (
                                <ToCartBtn $active={!hasError(errorMessage)}>
                                    前往結帳
                                </ToCartBtn>
                            ) : (
                                <Link to="#">
                                    <ToCartBtn $active={!hasError(errorMessage)}>
                                        前往結帳
                                    </ToCartBtn>
                                </Link>
                            )}
                        </div>
                    )}
                    <Link to="/collection">
                        <FontAwesomeIcon icon={faChevronDown} transform={{ rotate: 90 }}/>
                        繼續選購
                    </Link>
                </TotalContainer>
            </PageContainer>
        </PageWrapper>
    )
}