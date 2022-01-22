import styled from "styled-components"
import { useSelector } from "react-redux";

import { Btn, H3 } from "../constants/style"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import useProduct from "../hooks/useProduct";

import { CartPopup } from "../pages/ProductPage/CartPopup";
import { LoginPopup } from "./LoginPopup"
import { SizePopup, ColorPopup, EditPopup, DeletePopup } from "../pages/AdminPages/AdminProductPage/InfoPopup";


const PopupCover = styled.div`
    opacity: ${props => props.$isOpened ? '1' : '0'};
    visibility: ${props => props.$isOpened ? 'visible' : 'hidden'};
    transition: .2s;

    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 11;
`

const PopupWrapper = styled.div`
    width: 90%;
    height: 100%;
    margin: auto;
    position: relative;
    & > label {
        background-color: transparent;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }
`

const PopupContainer = styled.div`
    transform: ${props => props.$isOpened ? 'translateY(0%)' : 'translateY(-50%)'};
    opacity: ${props => props.$isOpened ? '1' : '0'};
    transition: .2s;
    width: 100%;
    max-width: ${props => props.$type === 'edit' ? '768px' : '512px'};
    max-height: calc(100vh - 80px);
    position: absolute;
    left: 0;
    right: 0;
    margin: 40px auto;
    background-color: ${props => props.theme.color.white};
    border: 1px solid ${props => props.theme.color.lightGrey};
    & > div {
        padding: 10px;
    }
`

const PopupHeader = styled.div`
    border-bottom: 1px solid ${props => props.theme.color.lightGrey};
    position: relative;
    & > button {
        & svg {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            right: 10px;
        }
    }
    ${props => props.$cart && 'display: flex;'}
`

const PopupTitle = styled(H3)`
    & > svg {
        color: ${props => props.theme.color.success};
        margin-right: 5px;
    }
`

const PopupContent = styled.div`
    max-height: calc(100vh - 145px);
    overflow: auto;
`


export const Popup = ({type}) => {

    const isOpened = useSelector(state => state.general.isOpened)
    
    const {
        handleClosePopup
    } = useProduct()
  
    return (
        <PopupCover $isOpened={isOpened}>
            <PopupWrapper>
                <label onClick={handleClosePopup(type)} />
                <PopupContainer $isOpened={isOpened} $type={type}>
                    <PopupHeader $cart={type === 'cart'}>
                        {type === 'cart' && (
                            <PopupTitle>
                                <FontAwesomeIcon icon={faCheck} />
                                已成功加入至購物車
                            </PopupTitle>
                        )}
                        <Btn onClick={handleClosePopup(type)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Btn>
                    </PopupHeader>
                    <PopupContent>
                        {type === 'login' && (
                            <LoginPopup />
                        )}
                        {type === 'cart' && (
                            <CartPopup />
                        )}
                        {type === 'size' && (
                            <SizePopup />
                        )}
                        {type === 'color' && (
                            <ColorPopup />
                        )}
                        {type === 'edit' && (
                            <EditPopup />
                        )}
                        {type === 'delete' && (
                            <DeletePopup />
                        )}
                    </PopupContent>
                </PopupContainer>
            </PopupWrapper>
        </PopupCover>
    )
}