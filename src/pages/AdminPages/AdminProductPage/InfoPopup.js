import { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { sizeMap } from "../../../constants/mapping"
import { fontTheme, H4, P, TextBtn } from "../../../constants/style"

import useAdminProduct from "../../../hooks/useAdminProduct"
import useProduct from "../../../hooks/useProduct"

import { deleteProductAPI } from "../../../webAPI/productAPI"

import { FirstStepInputs, SecondStepInputs } from "./AddProduct"


const TableContainer = styled.div`
    padding: 10px;
    & table {
        width: 100%;
        border: 1px solid ${props => props.theme.color.lightGrey};
        & th, td {
            ${fontTheme.span}
            color: ${props => props.theme.color.black};
            border-top: 1px solid ${props => props.theme.color.lightGrey};
            border-bottom: 1px solid ${props => props.theme.color.lightGrey};
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

const BtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 20px 10px 10px;
    & > button {
        margin: 0px 5px;
    }
`

const PopupContent = styled.div`
    & h4 {
        padding: 10px;
        text-align: center;
    }
    & > div {
        padding: 10px;
        text-align: center;
        & button {
            margin: 5px;
        }
    }
`

export const SizePopup = () => {

    const product = useSelector(state => state.product.product)
    const group = product ? product.product.Category.group : null;

    return (
        <TableContainer>
            {product && group.slice(0, -1) === 'Size_general' ? (
                <P>單一尺寸 One Size</P>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {product ? (
                                Object.keys(sizeMap[group.slice(0, -1)]).map((element, index) => {
                                    const measure = element
                                    .split('_')
                                    .map(word => word[0].toUpperCase() + word.slice(1))
                                    .join(' ')
                                    return (
                                        <th key={index}>
                                            {measure}
                                            <p>{sizeMap[group.slice(0, -1)][element]}</p>
                                        </th>
                                    )
                            })) : null}
                        </tr>
                    </thead>
                    <tbody>
                        {product ? product.product[group].map(i => (
                            <tr key={i.id}>
                                <td>{i.size}</td>
                                {Object.keys(sizeMap[group.slice(0, -1)]).map((j, index) => (
                                    <td key={index}>
                                        {i[j] ? `${i[j]}cm` : '-'}
                                    </td>
                                ))}
                            </tr>
                        )) : null}
                    </tbody>
                </table>
            )}
        </TableContainer>
    )
}

export const ColorPopup = () => {

    const product = useSelector(state => state.product.product)

    return (
        <TableContainer>
            <table>
                <thead>
                    <tr>
                        <th>Color Name</th>
                        <th>HEX Code</th>
                    </tr>
                </thead>
                <tbody>
                    {product ? product.product.Colors.map((color, i) => (
                        <tr key={i}>
                            <td>{color.name}</td>
                            <td>{color.code}</td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </TableContainer>
    )
}

export const EditPopup = () => {

    const product = useSelector(state => state.product.product)

    const top = useRef()

    const {
        name, 
        gender, 
        category, 
        desc, 
        material, 
        washing, 
        images, 
        sizes, 
        colors, 
        handleInputChange, 
        handleAddPattern, 
        handleDeletePattern, 
        handleFormSubmit
    } = useAdminProduct({top})


    return (
        <TableContainer ref={top}>
            {product && product.product.Category.name === category && (
                <form onSubmit={e => e.preventDefault()}>
                    <FirstStepInputs 
                        step={0} 
                        name={name}
                        gender={gender}
                        category={category}
                        desc={desc}
                        material={material}
                        washing={washing}
                        images={images}
                        handleInputChange={handleInputChange}
                    />
                    <SecondStepInputs 
                        step={0}
                        sizes={sizes}
                        colors={colors}
                        handleInputChange={handleInputChange}
                        handleAddPattern={handleAddPattern}
                        handleDeletePattern={handleDeletePattern}
                        group={product?.product.Category.group.slice(0, -1)}
                        sizesLength={product.product[product.product.Category.group].length}
                        colorsLength={product.product.Colors.length}
                    />
                    <BtnContainer>
                        <TextBtn 
                            type="submit" 
                            name="edit"
                            onClick={handleFormSubmit} 
                            $active
                        >
                            送出
                        </TextBtn>
                    </BtnContainer>
                </form>
            )}
        </TableContainer>
    )
}

export const DeletePopup = () => {

    const history = useHistory()

    const product = useSelector(state => state.product.product)

    const { handleClosePopup } = useProduct()

    const handleDeleteProduct = () => {
        deleteProductAPI(product.product.id)
        .then(() => history.go())
    }
  
    return (
        <PopupContent>
            <H4>是否要刪除此商品？</H4>
            <div>
                <TextBtn onClick={handleClosePopup} $active>返回</TextBtn>
                <Link to="#" onClick={handleDeleteProduct}>
                    <TextBtn $active>刪除</TextBtn>
                </Link>
            </div>
        </PopupContent>
    )
}