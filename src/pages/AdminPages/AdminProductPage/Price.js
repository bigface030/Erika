import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import { fontTheme, H2, H4, P, TextBtn } from "../../../constants/style"
import { getProducts } from "../../../features/product/productSlice";
import { updateProductAPI } from "../../../webAPI/productAPI";


const MainContainer = styled.main`
    width: 70%;
    flex-grow: 1;
    & h2 {
        padding: 0 10px;
    }
`

const TableContainer = styled.div`
    padding: 10px;
    overflow: auto;
    & table {
        width: 100%;
        min-width: 1000px;
        border: 1px solid #aaa;
        & th, td {
            ${fontTheme.span}
            color: ${props => props.theme.color.black};
            border-top: 1px solid #aaa;
            border-bottom: 1px solid #aaa;
            &:nth-child(n+3):nth-child(-n+6){
                width: 8%;
            }
        }
        & tr {
            vertical-align: top;
            & th {
                white-space: nowrap;
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

const FilterContainer = styled.div`
    padding: 10px;
    display: flex;
    ${fontTheme.p}
    & > div + div {
        margin-left: 10px;
    }
    & > button {
        margin-right: 20px;
    }
`

const SortBtn = styled.button`
    ${fontTheme.span}
    color: ${props => props.theme.color.white};
    font-weight: ${props => props.theme.fontWeight.xl};

    position: relative;
    &::before {
        content: '';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        right: -15px;
        top: -1px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 10px solid ${props => props.theme.color.grey};
    }
    &::after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        right: -15px;
        bottom: -1px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 10px solid ${props => props.theme.color.grey};
    }
`

const FilterBtn = styled(TextBtn)`
    padding: 0 10px;
`

const BooleanSvg = styled(FontAwesomeIcon)`
    font-size: ${props => props.theme.fontSize.bodyLarge};
    color: ${props => props.$active ? props.theme.color.success : props.theme.color.alert};
`

const PriceInput = styled.input`
    width: 50px;
`

const Item = ({product}) => {

    const [isOn, setIsOn] = useState(null)
    const [isSale, setIsSale] = useState(null)
    const [priceStandard, setPriceStandard] = useState(NaN)
    const [priceSale, setPriceSale] = useState(NaN)

    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        setIsOn(product.is_on)
        setIsSale(product.is_sale)
        setPriceStandard(product.price_standard || '')
        setPriceSale(product.price_sale || '')
    }, [product])

    const handleInputChange = e => {
        switch (e.target.name) {
            case 'is_on': {
                return setIsOn(e.target.checked)
            }
            case 'is_sale': {
                return setIsSale(e.target.checked)
            }
            case 'price_standard': {
                return setPriceStandard(e.target.value)
            }
            case 'price_sale': {
                return setPriceSale(e.target.value)
            }
            default: break
        }
    }

    const handleIsEditing = e => {
        if(e.target.name === 'edit') return setIsEditing(true)
        if(e.target.name === 'save') {
            return updateProductAPI(product.id, {
                is_on: isOn, 
                is_sale: isSale, 
                price_standard: parseInt(priceStandard), 
                price_sale: parseInt(priceSale)
            }).then(result => {
                if(!result.ok) return console.log(result.message)
                setIsEditing(false)
            })
        }
    }

    return (
        <>
                <tr>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>
                        {isEditing ? (
                            <input 
                                onChange={handleInputChange} 
                                checked={isOn} 
                                type="checkbox" 
                                name="is_on" 
                            />
                        ) : (
                            <BooleanSvg icon={isOn ? faCheck : faTimes} $active={isOn} />
                        )}
                    </td>
                    <td>
                        {isEditing ? (
                            <input 
                                onChange={handleInputChange} 
                                checked={isSale} 
                                type="checkbox" 
                                name="is_sale" 
                            />
                        ) : (
                            <BooleanSvg icon={isSale ? faCheck : faTimes} $active={isSale} />
                        )}
                    </td>
                    <td>
                        {isEditing ? (
                            <PriceInput 
                                onChange={handleInputChange} 
                                value={priceStandard} 
                                type="number" 
                                name="price_standard" 
                                min="0"
                            />
                        ) : (
                            priceStandard || '-'
                        )}
                    </td>
                    <td>
                        {isEditing ? (
                            <PriceInput 
                                onChange={handleInputChange} 
                                value={priceSale} 
                                type="number" 
                                name="price_sale" 
                                min="0"
                            />
                        ) : (
                            priceSale || '-'
                        )}
                    </td>
                    <td>{product.sold}</td>
                    <td>{product.updatedAt}</td>
                    <td>
                        {isEditing ? (
                            <FilterBtn name="save" onClick={handleIsEditing} $white $active>
                                儲存
                            </FilterBtn>
                        ) : (
                            <FilterBtn name="edit" onClick={handleIsEditing} $white $active>
                                編輯
                            </FilterBtn>
                        )}
                    </td>
                    <td>
                        <FilterBtn $white $active>
                            查看
                        </FilterBtn>
                    </td>
                </tr>
        </>
    )
}

export const Price = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.product.products)
    const error = useSelector(state => state.product.error)

    const [isOn, setIsOn] = useState('')
    const [isSale, setIsSale] = useState('')
    const [order, setOrder] = useState('')

    useEffect(() => {
        const search = new URLSearchParams();
        if(isOn !== '') search.set('is_on', isOn)
        if(isSale !== '') search.set('is_sale', isSale)
        if(order !== '') search.set('order', order)
        dispatch(getProducts('', `?${search}`))
    }, [dispatch, isOn, isSale, order])

    const handleSelectChange = e => {
        if(e.target.name === "is_on") return setIsOn(e.target.value)
        if(e.target.name === "is_sale") return setIsSale(e.target.value)
        if(e.target.name === "clearFilter"){
            setIsOn('')
            setIsSale('')
        }
    }

    const handleSort = e => {
        if (e.target.name === 'sold') {
            if(order === 'sold_desc') return setOrder('sold_asc')
            if(order === 'sold_asc') return setOrder('sold_desc')
            setOrder('sold_desc')            
        } else {
            if(order === 'price_desc') return setOrder('price_asc')
            if(order === 'price_asc') return setOrder('price_desc')
            setOrder('price_asc')
        }
    }

    return (
        <>
            <MainContainer>
                <H2>管理商品價格與紀錄</H2>
                <FilterContainer>
                    <FilterBtn name="clearFilter" onClick={handleSelectChange} $white $active>清除篩選</FilterBtn>
                    <div>
                        <select name="is_on" value={isOn} onChange={handleSelectChange}>
                            <option value="">-----</option>
                            <option value="1">已上架</option>
                            <option value="0">未上架</option>
                        </select>
                    </div>
                    <div>
                        <select name="is_sale" value={isSale} onChange={handleSelectChange}>
                            <option value="">-----</option>
                            <option value="1">特價商品</option>
                            <option value="0">原價商品</option>
                        </select>
                    </div>
                </FilterContainer>
                <TableContainer>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>產品名稱</th>
                                <th>上架中</th>
                                <th>特價中</th>
                                <th>
                                    <SortBtn name="price_standard" onClick={handleSort}>原價</SortBtn>
                                </th>
                                <th>
                                    <SortBtn name="price_sale" onClick={handleSort}>特價</SortBtn>
                                </th>
                                <th>
                                    <SortBtn name="sold" onClick={handleSort}>已售出</SortBtn>
                                </th>
                                <th>更新時間</th>
                                <th></th>
                                <th>存貨紀錄</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!error &&  products.length > 0 && products.map(product => (
                                <Item key={product.id} product={product} />
                            ))}
                        </tbody>
                    </table>
                    {error && (
                        <P>{error}</P>
                    )}
                    {products.length === 0 && (
                        <H4>商品載入中......</H4>
                    )}
                </TableContainer>
            </MainContainer>
            {/* {!product.patterns && (
                <>
                    {errorCode !== 'color' && (
                        <Popup type="size" />
                    )}
                    {errorCode !== 'size' && (
                        <Popup type="color" />
                    )}
                </>
            )} */}
        </>
        
    )
}