import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import useProduct from "../hooks/useProduct";
import { setCartQty } from "../features/product/productSlice";

const Qty = styled.div`
    width: 60px;
    height: 40px;
    position: relative;
    & > input {
        width: 100%;
        box-sizing: border-box;
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
`

export const QtySelector = ({qty, handleQtyChange, handleBtnClick}) => {

    return (
        <Qty>
            <input
                type="number"
                value={qty}
                min={1}
                onChange={handleQtyChange}
            />
            <div>
                <button onClick={() => handleBtnClick('inc')}>
                    <FontAwesomeIcon icon={faChevronDown} transform={{ rotate: 180 }}/>
                </button>
                <button onClick={() => handleBtnClick('dec')}>
                    <FontAwesomeIcon icon={faChevronDown} transform={{ rotate: 0 }}/>
                </button>
            </div>
        </Qty>
    )
}