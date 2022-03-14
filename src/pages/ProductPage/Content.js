import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faShoppingCart,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';

import { H3, H4, P, Span, TextBtn } from '../../constants/style';
import useProduct from '../../hooks/useProduct';

import { useSelector } from 'react-redux';
import { QtySelector } from '../../components/QtySelector';

const ContentContainer = styled.div`
    & > div {
        padding-bottom: 20px;
    }
`;

const TitleContainer = styled.div`
    & p {
        font-weight: ${props => props.theme.fontWeight.m};
        line-height: 1.75em;
        padding: 10px 0;
    }
    & h3 {
        padding: 10px 0;
        border-bottom: 1px solid #aaa;
    }
`;

const SpecContainer = styled.div`
    & > div {
        padding: 5px 0;
    }
    & h4 {
        padding: 5px 0;
    }
`;

const ColorSelector = styled.div`
    & ul {
        display: flex;
        & li {
            z-index: 1;
            & + li {
                margin-left: 5px;
            }
        }
    }
`;

const Msg = styled(Span)`
    color: ${props => props.theme.color.alert};
`;

const SizeSelector = styled.div`
    & > div {
        position: relative;
        width: 60px;
        height: 33px;
        & > div {
            display: flex;
            height: 100%;
            box-sizing: border-box;
            border: 1px solid #aaa;
            & span {
                width: 50%;
                padding-left: 5px;
                margin: auto 0;
                font-size: ${props => props.theme.fontSize.body};
            }
        }
        & svg {
            display: block;
            margin: auto;
            color: ${props => props.theme.color.grey};
            font-size: ${props => props.theme.fontSize.bodySmall};
        }
        & select {
            position: absolute;
            top: 0;
            opacity: 0;
            padding: 5px;
            outline: 0;
            border-color: ${props => props.theme.color.lightGrey};
            width: 60px;
        }
    }
`;

const ColorLabel = styled.label`
    & input {
        display: none;
        &:checked + span {
            border: ${props =>
                parseInt(props.$color.slice(1), 16) <= parseInt('777777', 16)
                    ? 'medium double #eee'
                    : 'thin solid #333'};
        }
    }
    & span {
        background-color: ${props => props.$color};
        position: relative;
        overflow: hidden;
        ${props => props.$isNull && 'cursor: not-allowed;'}
        &:before {
            content: '';
            width: 40px;
            position: absolute;
            transform: rotate(45deg);
            transform-origin: top left;
            top: 0;
            left: 0;
            background-color: #aaaa;
            height: 2px;
            display: ${props => (props.$isNull ? 'block' : 'none')};
        }
        &:after {
            content: '';
            width: 40px;
            position: absolute;
            transform: rotate(-45deg);
            transform-origin: top right;
            top: 0;
            right: 0;
            background-color: #aaaa;
            height: 2px;
            display: ${props => (props.$isNull ? 'block' : 'none')};
        }
    }
`;

const ColorSpan = styled.span`
    display: block;
    box-sizing: border-box;
    border: 1px solid #aaa8;
    width: 30px;
    height: 30px;
`;

const PriceIsSale = styled.div`
    & h4 {
        display: inline-block;
        // font-weight: ${props => props.theme.fontWeight.m};
        &:nth-child(1) {
            color: ${props => props.theme.color.grey};
            text-decoration: line-through;
        }
        &:nth-child(2) {
            color: ${props => props.theme.color.alert};
            font-size: ${props => props.theme.fontSize.h3};
        }
        & + h4 {
            padding-left: 10px;
        }
    }
`;

const QtyAndAdd = styled.div`
    display: flex;
`;

const AddBtn = styled(TextBtn)`
    margin-left: 10px;
    padding: 10px 15px;

    & svg {
        font-size: ${props => props.theme.fontSize.bodyLarge};
        color: ${props => props.theme.color.white};
        margin-right: 5px;
    }
`;

const WishList = styled(P)`
    & svg {
        color: ${props => props.theme.color.grey};
        font-size: ${props => props.theme.fontSize.body};
        margin-right: 3px;
    }
    & a > span {
        color: ${props => props.theme.color.grey};
        font-weight: ${props => props.theme.fontWeight.l};
    }
    & > span {
        margin-left: 10px;
    }
`;

const ColorSelect = ({ name, code, total, color, handleColorChange }) => {
    const isNull = !total ? true : false;

    return (
        <ColorLabel $color={code} $isNull={isNull}>
            <input
                type="radio"
                name="color"
                value={name}
                onChange={handleColorChange(isNull)}
                checked={color === name && !isNull}
            />
            <ColorSpan />
        </ColorLabel>
    );
};

export const Content = ({ product, group }) => {
    const spec = useSelector(state => state.product.spec);

    const isOpened = useSelector(state => state.general.isOpened);
    const errorMessage = useSelector(state => state.general.errorMessage);

    const {
        addCommaToPrice,
        handleBtnClick,
        handleSizeChange,
        handleQtyChange,
        handleColorChange,
        handleAddToCart,
        handleAddToWishList,
    } = useProduct(spec, product, group, isOpened);

    return (
        <ContentContainer>
            <TitleContainer>
                <H3>{product.product.name}</H3>
                <P>{product.product.desc}</P>
            </TitleContainer>
            <SpecContainer>
                <SizeSelector>
                    <H4>尺寸</H4>
                    <div>
                        <div>
                            <span>{spec.size}</span>
                            <span>
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    transform={{ rotate: 0 }}
                                />
                            </span>
                        </div>
                        {spec.size && (
                            <select
                                value={spec.size}
                                onChange={handleSizeChange}
                            >
                                {product.product[`${group}s`].map(size => (
                                    <option key={size.id} value={size.size}>
                                        {size.size}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </SizeSelector>
                <ColorSelector>
                    <H4>顏色</H4>
                    <ul>
                        {product.patterns
                            .filter(
                                pattern => pattern[group].size === spec.size
                            )
                            .map((pattern, index) => (
                                <li key={index}>
                                    <ColorSelect
                                        name={pattern.Color.name}
                                        code={pattern.Color.code}
                                        total={pattern.total}
                                        color={spec.color}
                                        handleColorChange={handleColorChange}
                                    />
                                </li>
                            ))}
                    </ul>
                    {spec.size &&
                        spec.color &&
                        product.patterns.find(
                            pattern =>
                                pattern[group].size === spec.size &&
                                pattern.Color.name === spec.color
                        ).total <= 10 && <Msg>庫存數量少</Msg>}
                </ColorSelector>
                {product.product.is_sale ? (
                    <PriceIsSale>
                        <H4>
                            NT $
                            {addCommaToPrice(product.product.price_standard)}
                        </H4>
                        <H4>
                            NT ${addCommaToPrice(product.product.price_sale)}
                        </H4>
                    </PriceIsSale>
                ) : (
                    <div>
                        <H4>
                            NT $
                            {addCommaToPrice(product.product.price_standard)}
                        </H4>
                    </div>
                )}
                {errorMessage && <Msg>{errorMessage}</Msg>}
                <QtyAndAdd>
                    <QtySelector
                        qty={spec.qty}
                        handleQtyChange={handleQtyChange}
                        handleBtnClick={handleBtnClick}
                    />
                    <AddBtn onClick={handleAddToCart} $active>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        加入購物車
                    </AddBtn>
                </QtyAndAdd>
                <WishList>
                    <Link to="#" onClick={handleAddToWishList}>
                        <FontAwesomeIcon icon={faHeart} />
                        <Span>加入願望清單</Span>
                    </Link>
                </WishList>
            </SpecContainer>
        </ContentContainer>
    );
};
