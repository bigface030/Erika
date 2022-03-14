import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import useProduct from '../../hooks/useProduct';

import { MEDIA_QUERY } from '../../constants/style';
import { H4, P, Span } from '../../constants/style';

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
`;

const PopupBtnGroup = styled.div`
    text-align: center;
    padding: 10px 0 20px;
    & a {
        margin-left: 5px;
    }
`;
const PopupBtn = styled.button`
    padding: 5px 15px;
    border-radius: 0.25em;
    border: 1px solid
        ${props =>
            props.$checked
                ? props.theme.color.black
                : props.theme.color.lightGrey};
    transition: 0.4s;
    background-color: ${props =>
        props.$checked ? props.theme.color.black : props.theme.color.white};
    & span {
        font-size: ${props => props.theme.fontSize.bodyLarge};
        font-weight: ${props => props.theme.fontWeight.l};
        color: ${props =>
            props.$checked ? props.theme.color.white : props.theme.color.black};
    }
    &:hover {
        background-color: ${props => props.theme.color.black};
        border-color: ${props => props.theme.color.black};
        & span {
            color: ${props => props.theme.color.white};
        }
    }
`;

export const CartPopup = () => {
    const product = useSelector(state => state.product.product);
    const spec = useSelector(state => state.product.spec);

    const mainImg = product.product.Images.find(img => img.is_main);
    const price = product.product.is_sale
        ? product.product.price_sale
        : product.product.price_standard;

    const { handleClosePopup } = useProduct();

    return (
        <>
            <PopupItem>
                <div>
                    <img src={mainImg.src} alt={mainImg.alt} />
                </div>
                <div>
                    <H4>{product.product.name}</H4>
                    <P>價格: {price}</P>
                    <P>
                        尺寸: {spec.size}, 顏色: {spec.color}
                    </P>
                    <P>數量: {spec.qty}</P>
                </div>
            </PopupItem>
            <PopupBtnGroup>
                <PopupBtn onClick={handleClosePopup()}>
                    <Span>繼續選購</Span>
                </PopupBtn>
                <Link to="/cart" onClick={handleClosePopup()}>
                    <PopupBtn>
                        <Span>前往結帳</Span>
                    </PopupBtn>
                </Link>
            </PopupBtnGroup>
        </>
    );
};
