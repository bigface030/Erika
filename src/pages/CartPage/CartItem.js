import styled from "styled-components"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { Btn, fontTheme, MEDIA_QUERY } from "../../constants/style"

import { QtySelector } from "../../components/QtySelector"
import { Img } from "../../components/Img"
import useProduct from "../../hooks/useProduct"
import useCart from "../../hooks/useCart"


const NameNote = styled.div`
    display: none;
    ${MEDIA_QUERY.m} {
        display: block;
    }
    padding: 10px 0;
    & > p {
        ${fontTheme.span}
    }
`

const Price = styled.p`
    font-weight: ${props => props.theme.fontWeight.xl};
    font-size: ${props => props.theme.fontSize.h4};
    ${MEDIA_QUERY.s} {
        font-size: ${props => props.theme.fontSize.bodyLarge};
    }
`

const SellingPrice = styled(Price)`
    color: ${props => props.theme.color.alert};
    & + div {
        font-weight: ${props => props.theme.fontWeight.xl};
        color: ${props => props.theme.color.lightGrey};
        line-height: 1.25em;
        margin-top: 10px;
    }
`

const ErrorMsg = styled.span`
    ${fontTheme.span}
    color: ${props => props.theme.color.alert};
    padding: 5px 0;
    position: absolute;
    ${MEDIA_QUERY.s} {
        bottom: 0;
        right: -100px;
    }
`

const MobileItem = styled.div`
    padding: 10px 0;
`
const ItemTitle = styled.div`
    display: flex;
    & > div {
        width: 50%;
        padding: 5px;
        ${fontTheme.p}
    }
    ${MEDIA_QUERY.xs} {
        display: block;
        & > div {
            width: 95%;
            margin: 0 auto;
        }
    }
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

const ItemContent = styled(TableContainer)`
    overflow: auto;
    & table {
        border: none;
        border-bottom: 1px solid #aaa;
        & th, td {
            border: none;
            ${fontTheme.span}
            position: relative;
            &:last-child {
                width: 10%;
            }
        }
        & svg {
            font-size: ${props => props.theme.fontSize.h3};
        }
    }
`
const ItemImage = styled.div`
    position: relative;
    & img {
        width: 100%;
        aspect-ratio: 1;
    }
`
const ItemName = styled.div`
`


export const CartItem = ({item, index}) => {

    const url = `/product/${item.id}`

    const subtotal = (item.is_sale ? item.price_sale : item.price_standard) * item.qty

    const errorMessage = useSelector(state => state.cart.errorMessage)

    const {
        addCommaToPrice,
    } = useProduct()

    const {
        handleDeleteCart,
        handleQtyChange,
        handleBtnClick
    } = useCart(item)

    return (
        <tr>
            <td>
                <Link to={url}>
                    <Img image={{src: item.src, alt: item.alt}} />
                </Link>
            </td>
            <td>
                {item.name}
                <NameNote>
                    <p>尺寸 : {item.size}</p>
                    <p>顏色 : {item.color}</p>
                </NameNote>
            </td>
            <td>
                <p>尺寸 : {item.size}</p>
                <p>顏色 : {item.color}</p>
            </td>
            <td>
                {item.is_sale ? (
                    <>
                        <SellingPrice>
                            ${addCommaToPrice(item.price_sale)}
                        </SellingPrice>
                        <div>
                            原價
                            <p>${addCommaToPrice(item.price_standard)}</p>
                        </div>
                    </>
                ) : (
                    <Price>
                        ${addCommaToPrice(item.price_standard)}
                    </Price>
                )}
            </td>
            <td>
                <QtySelector 
                    qty={item.qty}
                    handleQtyChange={handleQtyChange}
                    handleBtnClick={handleBtnClick}
                />
                {item.qty > item.total && (
                    <ErrorMsg>{errorMessage[index]}</ErrorMsg>
                )}
            </td>
            <td>
                <Price>
                    ${addCommaToPrice(subtotal)}
                </Price>
            </td>
            <td>
                <Btn onClick={handleDeleteCart(index)}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </Btn>
            </td>
        </tr>
    )
}


export const MobileCartItem = ({item, index}) => {

    const url = `/product/${item.id}`

    const subtotal = (item.is_sale ? item.price_sale : item.price_standard) * item.qty

    const errorMessage = useSelector(state => state.cart.errorMessage)

    const {
        addCommaToPrice
    } = useProduct()

    const {
        handleDeleteCart,
        handleQtyChange,
        handleBtnClick
    } = useCart(item)

    return (
        <li>
            <MobileItem>
                <ItemTitle>
                    <ItemImage>
                        <Link to={url}>
                            <Img image={{src: item.src, alt: item.alt}} />
                        </Link>
                    </ItemImage>
                    <ItemName>
                        {item.name}
                        <NameNote>
                            <p>尺寸 : {item.size}</p>
                            <p>顏色 : {item.color}</p>
                        </NameNote>
                    </ItemName>
                </ItemTitle>
                <ItemContent>
                    <table>
                        <thead>
                            <tr>
                                <th>售價</th>
                                <th>數量</th>
                                <th>小計</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {item.is_sale ? (
                                        <>
                                            <SellingPrice>
                                                ${addCommaToPrice(item.price_sale)}
                                            </SellingPrice>
                                            <div>
                                                原價
                                                <p>${addCommaToPrice(item.price_standard)}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <Price>
                                            ${addCommaToPrice(item.price_standard)}
                                        </Price>
                                    )}
                                </td>
                                <td>
                                    <QtySelector 
                                        qty={item.qty}
                                        handleQtyChange={handleQtyChange}
                                        handleBtnClick={handleBtnClick}
                                    />
                                    {item.qty > item.total && (
                                        <ErrorMsg>{errorMessage[index]}</ErrorMsg>
                                    )}
                                </td>
                                <td>
                                    <Price>
                                        ${addCommaToPrice(subtotal)}
                                    </Price>
                                </td>
                                <td>
                                    <Btn onClick={handleDeleteCart(index)}>
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                    </Btn>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </ItemContent>
            </MobileItem>
        </li>       
    )
}