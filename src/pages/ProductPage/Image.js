import { useEffect } from 'react';
import styled from 'styled-components';
import { Img } from '../../components/Img';
import { MEDIA_QUERY } from '../../constants/style';
import useProduct from '../../hooks/useProduct';

const ImageContainer = styled.div`
    & img {
        width: 100%;
        height: 100%;
    }
`;

const ImageMain = styled.div`
    aspect-ratio: 1;
    border: 1px solid #aaa;
    margin-bottom: 5px;
    overflow: hidden;
    position: relative;
    @media (min-width: 512px) {
        &:hover {
            cursor: crosshair;
            & > img:last-child {
                opacity: 0;
            }
        }
    }
    & > img:first-child {
        z-index: -1;
        transform: scale(2);
        transform-origin: top left;
        position: absolute;
        top: -50%;
        left: -50%;
    }
    background-color: ${props => props.$isLoading && '#f00'};
`;

const ImageCarousel = styled.div`
    padding: 5px;
    display: flex;
    & > div {
        position: relative;
        aspect-ratio: 1;
        width: calc(100% / 3);
        border: 1px solid #aaa;
        margin: 5px;
        &:nth-child(n + 5) {
            display: none;
        }
    }
    ${MEDIA_QUERY.l} {
        & > div:nth-child(4) {
            display: none;
        }
    }
    ${MEDIA_QUERY.m} {
        & > div:nth-child(4) {
            display: block;
        }
    }
    ${MEDIA_QUERY.s} {
        & > div:nth-child(4) {
            display: none;
        }
    }
`;

export const Image = ({ images }) => {
    const { handleMouseMove, handleImgClick, mainImg, setMainImg, scaledImg } =
        useProduct();

    useEffect(() => {
        const img = images.find(img => img.is_main === true);
        setMainImg({ src: img.src, alt: img.alt });
    }, [images, setMainImg]);

    return (
        <ImageContainer>
            <ImageMain onMouseMove={handleMouseMove}>
                <img src={mainImg.src} alt={mainImg.alt} ref={scaledImg} />
                <Img image={mainImg} />
            </ImageMain>
            <ImageCarousel onClick={handleImgClick}>
                {images.slice(0, 4).map(image => (
                    <div key={image.id}>
                        <Img image={image} />
                    </div>
                ))}
                <div>
                    <Img
                        image={{
                            src: 'https://images.unsplash.com/photo-1631410744690-3cc75aaea4df?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fG9uZSUyMHBpZWNlJTIwZHJlc3N8ZW58MHwyfDJ8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                            alt: '02',
                        }}
                    />
                </div>
                <div>
                    <Img
                        image={{
                            src: 'https://images.unsplash.com/photo-1601460588655-109bd38204db?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fGRyZXNzJTIwb25lJTIwcGllY2V8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                            alt: '03',
                        }}
                    />
                </div>
                <div>
                    <Img
                        image={{
                            src: 'https://images.unsplash.com/photo-1623052760790-9605a8579730?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fHNoaXJ0c3xlbnwwfDJ8Mnx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                            alt: '04',
                        }}
                    />
                </div>
            </ImageCarousel>
        </ImageContainer>
    );
};
