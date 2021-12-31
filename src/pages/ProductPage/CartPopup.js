import styled from "styled-components"
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import useProduct from "../../hooks/useProduct"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import { MEDIA_QUERY } from "../../constants/style";
import { H3, H4, P, Span, Btn } from "../../constants/style"

const PopupCover = styled.div`
    opacity: ${props => (props.$isOpened && !props.$error) ? '1' : '0'};
    visibility: ${props => (props.$isOpened && !props.$error) ? 'visible' : 'hidden'};
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
    position: relative;
    border-bottom: 1px solid #aaa;
    & > button {
        & svg {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            right: 10px;
        }
    }
    
    display: flex;
`

const PopupTitle = styled(H3)`
    & > svg {
        color: #40a85f;
        margin-right: 5px;
    }
`

const PopupContent = styled.div`
`

const PopupItem = styled.div`
    display: flex;
    & > div {
        padding: 20px;
        width: 50%;
        & img {
            width: 100%;
        }
    }
    ${MEDIA_QUERY.s} {
        display: block;
        & > div {
            padding: 10px 0;
            margin: 0 auto;
            width: 80%;
        }
    }
`

const PopupBtnGroup = styled.div`
  text-align: center;
  padding: 10px 0 20px;
  & a {
    margin-left: 5px;
  }
`
const PopupBtn = styled.button`
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
  }
`


export const CartPopup = ({product}) => {

    const mainImg = product.product.Images.find(img => img.is_main)
    const price = product.product.is_sale ? product.product.price_sale : product.product.price_standard
  
    const spec = useSelector(state => state.product.spec)

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
                    <PopupTitle>
                        <FontAwesomeIcon icon={faCheck} />
                        已成功加入至購物車
                    </PopupTitle>
                    <Btn onClick={handleClosePopup}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Btn>
                </PopupHeader>
                <PopupContent>
                  <PopupItem>
                      <div>
                        <img src={mainImg.src} alt={mainImg.alt}/>
                      </div>
                      <div>
                        <H4>{product.product.name}</H4>
                        <P>價格: {price}</P>
                        <P>尺寸: {spec.size}, 顏色: {spec.color}</P>
                        <P>數量: {spec.qty}</P>
                      </div>
                  </PopupItem>
                  <PopupBtnGroup>
                    <PopupBtn onClick={handleClosePopup}>
                      <Span>繼續選購</Span>
                    </PopupBtn>
                    <Link to="/cart">
                      <PopupBtn>
                        <Span>前往結帳</Span>
                      </PopupBtn>
                    </Link>
                  </PopupBtnGroup>
                </PopupContent>
            </PopupContainer>
        </PopupWrapper>
      </PopupCover>
    )
  }