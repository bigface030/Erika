import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { MEDIA_QUERY, H2, H3, P } from '../../constants/style';

import { getProductsAPI } from '../../webAPI/productAPI';
import { TestProductCards } from '../../components/TestProductCards';
import { ProductItem } from '../../components/ProductItem';

const TrendingWrapper = styled.div``;
const TrendingContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    padding: 40px 0;
    text-align: center;
    ${MEDIA_QUERY.s} {
        width: 100%;
    }
    & h2,
    div {
        text-align: center;
    }
    & input {
        display: none;
        &:checked + div {
            display: flex;
        }
    }
    & > p {
        padding: 20px;
    }
`;

const Subtitle = styled(H3)`
    display: flex;
    justify-content: center;
    padding: 10px 0;
    & span::after {
        content: '';
        display: block;
        width: 0%;
        height: 2px;
        background-color: ${props => props.theme.color.black};
        transition: width 0.4s;
    }
    & label {
        padding: 0 5px;
        &:hover {
            cursor: pointer;
            & span::after {
                width: 100%;
            }
        }
    }
`;

const ProductContainer = styled.div`
    display: none;
    justify-content: flex-start;
    flex-wrap: wrap;
    & > section {
        width: calc(100% / 4);
        &:nth-child(n + 9) {
            display: none;
        }
        ${MEDIA_QUERY.main} {
            width: calc(100% / 3);
            &:nth-child(n + 7) {
                display: none;
            }
        }
        ${MEDIA_QUERY.m} {
            width: 50%;
            &:nth-child(n + 5) {
                display: none;
            }
        }
        ${MEDIA_QUERY.xs} {
            width: 100%;
        }
    }
`;

const GenderBlock = ({ gender, trends }) => {
    return (
        <>
            <input
                id={gender}
                type="radio"
                name="subtitle"
                defaultChecked={gender === 'female'}
            />
            {trends.length > 0 ? (
                <ProductContainer>
                    {trends &&
                        trends.map(trend => (
                            <ProductItem key={trend.id} product={trend} />
                        ))}
                    <TestProductCards />
                </ProductContainer>
            ) : (
                <ProductContainer>
                    <P>查無商品</P>
                </ProductContainer>
            )}
        </>
    );
};

export const Trend = () => {
    const [trends, setTrends] = useState({ male: '', female: '' });
    const [error, setError] = useState();

    useEffect(() => {
        const search = '?is_on=1&order=sold_desc';
        getProductsAPI('', search).then(result => {
            if (!result.ok) return setError(result.message);
            setTrends({
                male: result.data.filter(trend => trend.gender === 'M'),
                female: result.data.filter(trend => trend.gender === 'F'),
            });
        });
    }, []);

    return (
        <TrendingWrapper>
            <TrendingContainer>
                <H2>熱賣商品</H2>
                <Subtitle>
                    <label htmlFor="female">
                        <span>女裝</span>
                    </label>
                    /
                    <label htmlFor="male">
                        <span>男裝</span>
                    </label>
                </Subtitle>
                {!trends.male &&
                    !trends.female &&
                    (error ? <P>{error}</P> : <P>商品載入中...</P>)}
                {trends.male && trends.female && !error && (
                    <div>
                        <GenderBlock gender="female" trends={trends.female} />
                        <GenderBlock gender="male" trends={trends.male} />
                    </div>
                )}
            </TrendingContainer>
        </TrendingWrapper>
    );
};
