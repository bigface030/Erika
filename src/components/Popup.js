import styled from "styled-components"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { P, Btn, Span } from "../constants/style"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import useProduct from "../hooks/useProduct";


const PopupCover = styled.div`
    opacity: ${props => (props.$isOpened && props.$error) ? '1' : '0'};
    visibility: ${props => (props.$isOpened && props.$error) ? 'visible' : 'hidden'};
    transition: .2s;

    background: rgba(0,0,0,0.5);
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
    max-width: 512px;
    position: absolute;
    left: 0;
    right: 0;
    margin: 40px auto;
    background-color: #fff;
    border: 1px solid #aaa;
    & > div {
        padding: 10px;
    }
`

const PopupHeader = styled.div`
    border-bottom: 1px solid #aaa;
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
`

const PopupContent = styled.div`
    display: flex;
    justify-content: space-between;
    & a {
        text-decoration: underline ${props => props.theme.color.black};
    }
    & span {
        font-weight: ${props => props.theme.fontWeight.xl}
    }
`

export const ErrorPopup = () => {

    const isOpened = useSelector(state => state.general.isOpened)
    const errorCode = useSelector(state => state.general.errorCode)
    
    const {
        handleClosePopup
    } = useProduct()
  
    return (
        <PopupCover $isOpened={isOpened} $error={errorCode}>
            <PopupWrapper>
                <label onClick={handleClosePopup} />
                <PopupContainer $isOpened={isOpened}>
                    <PopupHeader>
                        <Btn onClick={handleClosePopup}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Btn>
                    </PopupHeader>
                    <PopupContent>
                        <P>請先登入！</P>
                        <Link to="/">
                            <Span>點我登入</Span>
                        </Link>
                    </PopupContent>
                </PopupContainer>
            </PopupWrapper>
        </PopupCover>
    )
}