import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
    faCartPlus,
    faShoppingCart,
    faHeart as fasHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MEDIA_QUERY, H4, P } from '../constants/style';

import useProduct from '../hooks/useProduct';
import { Img } from './Img';

const ProductCard = styled.section`
    padding: 10px;
    box-sizing: border-box;
    & a {
        text-decoration: none;
    }
    & img {
        width: 100%;
        height: 100%;
    }
    & h4 {
        padding: 10px 0;
    }
`;

const ImageContainer = styled.div`
    position: relative;
    aspect-ratio: 1;
    & > a {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
    &:hover > div:last-child {
        background-color: ${props => props.theme.color.grey}5;
        & button {
            right: 0px;
        }
    }
`;

const ImageMask = styled.div`
    background-color: transparent;
    transition: background-color 0.3s;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
`;

const BtnContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    & > button {
        margin-top: 5px;
    }
`;

const Btn = styled.button`
    width: 40px;
    height: 40px;
    display: block;
    background-color: ${props => props.theme.color.lightGrey}a;
    border-radius: 50%;
    z-index: 2;
    position: relative;
    right: -60px;
    &:nth-child(1) {
        transition: 0.3s;
    }
    &:nth-child(2) {
        transition: 0.3s 0.1s;
    }
    &:hover {
        background-color: ${props => props.theme.color.white}a;
    }

    & svg {
        font-size: ${props => props.theme.fontSize.btn};
        color: ${props => props.theme.color.grey};
    }
`;

const ProductPrice = styled(P)`
    & span {
        padding: 0 5px;
        &:nth-child(1) {
            color: ${props => props.theme.color.grey};
            font-size: ${props => props.theme.fontSize.body};
            text-decoration: line-through;
        }
        &:nth-child(2) {
            color: ${props => props.theme.color.alert};
        }
    }
`;

const ProductReminder = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    & span {
        display: inline-block;
        width: 50px;
        color: ${props => props.theme.color.white};
        font-weight: ${props => props.theme.fontWeight.xl};
        font-size: ${props => props.theme.fontSize.body};
        border-radius: 5px;
        & + span {
            margin-left: 5px;
        }
        ${MEDIA_QUERY.s} {
            width: 40px;
            font-size: ${props => props.theme.fontSize.bodySmall};
        }
    }
`;

const ProductReminderSale = styled.span`
    background-color: ${props => props.theme.color.alert};
`;
const ProductReminderNew = styled.span`
    background-color: ${props => props.theme.color.black};
`;

export const ProductItem = ({ product }) => {
    const { addCommaToPrice, handleAddToWishList } = useProduct();

    const url = `/product/${product.id}`;

    return (
        <ProductCard>
            <div>
                <ImageContainer>
                    <Link to={url} />
                    <Img image={product.Images[0]} />
                    <ProductReminder>
                        {product.is_sale && (
                            <ProductReminderSale>SALE</ProductReminderSale>
                        )}
                        <ProductReminderNew>NEW</ProductReminderNew>
                    </ProductReminder>
                    <ImageMask>
                        <BtnContainer>
                            <Link to={url}>
                                <Btn>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </Btn>
                            </Link>
                            <Btn onClick={handleAddToWishList}>
                                <FontAwesomeIcon icon={faHeart} />
                            </Btn>
                        </BtnContainer>
                    </ImageMask>
                </ImageContainer>
                <Link to={url}>
                    <H4>{product.name}</H4>
                </Link>
            </div>
            {product.is_sale ? (
                <ProductPrice>
                    <span>NT ${addCommaToPrice(product.price_standard)}</span>
                    <span>NT ${addCommaToPrice(product.price_sale)}</span>
                </ProductPrice>
            ) : (
                <P>NT ${addCommaToPrice(product.price_standard)}</P>
            )}
        </ProductCard>
    );
};
