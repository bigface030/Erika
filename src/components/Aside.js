import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { MEDIA_QUERY } from '../constants/style';

import { Filter } from '../pages/ListPage/Filter';
import { Img } from './Img';
import { Trend } from './Trend';

const Cover = styled.label`
    z-index: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    display: none;
    // background-color: #aaaa;
`;

const PictureContainer = styled.div`
    position: relative;
    aspect-ratio: 0.75;
    & img {
        width: 100%;
        aspect-ratio: 0.75;
    }
    & a {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    ${MEDIA_QUERY.main} {
        display: none;
    }
`;

const AsideContainer = styled.aside`
    width: 20%;
    min-width: 250px;
    & > div {
        z-index: 1;
        margin: 10px;
        background-color: ${props => props.theme.color.white};
    }
    ${MEDIA_QUERY.main} {
        position: fixed;
        left: -240px;
        z-index: 9;
        transition: 0.3s;
    }
`;

const Controller = styled.input`
    display: none;
    &:checked {
        & ~ aside {
            left: -10px;
        }
        & + label {
            display: block;
        }
    }
`;

export const Aside = ({ filter }) => {
    return (
        <>
            {filter && (
                <>
                    <Controller id="filter" type="checkbox" />
                    <Cover htmlFor="filter" />
                </>
            )}
            <AsideContainer>
                <PictureContainer>
                    <Link to="/products" />
                    <Img
                        image={{
                            src: 'https://picsum.photos/200/300',
                            alt: 'aside_img',
                        }}
                    />
                </PictureContainer>
                {filter && <Filter />}
                <Trend />
            </AsideContainer>
        </>
    );
};
