import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import useCarousel from '../../hooks/useCarousel';

const BannerWrapper = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
`;

const BannerContainer = styled.div`
    display: flex;
    & img {
        width: 100vw;
    }
`;

const MoveBtn = styled.button`
    height: 50px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    z-index: 1;
    & svg {
        padding: 5px 10px;
        font-size: ${props => props.theme.fontSize.svgLarge};
        color: ${props => props.theme.color.light_primary}4;
        transition: 0.2s;
        filter: drop-shadow(
            0px 0px 0.75rem ${props => props.theme.color.black}
        );
        &:hover {
            color: ${props => props.theme.color.light_primary}6;
        }
        &:active ~ div {
            transition: 0.25s;
            transform: translateX(-400vw);
        }
    }
`;

const LeftBtn = styled(MoveBtn)`
    left: 2.5%;
    & svg {
        transform: rotate(90deg);
    }
`;

const RightBtn = styled(MoveBtn)`
    right: 2.5%;
    & svg {
        transform: rotate(270deg);
    }
`;

const DotBtn = styled.button`
    width: 12px;
    height: 12px;
    background-color: ${props => props.theme.color.light_primary}6;
    display: block;
    border-radius: 50%;
    position: relative;
    transition: 0.25s;
`;

const DotContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 1;
    width: 50px;
    & ul {
        margin: 0 10px 10px;
        display: flex;
        justify-content: space-between;
    }
    & input {
        display: none;
        &:checked + button {
            background-color: ${props => props.theme.color.light_primary}d;
        }
    }
`;

const ArrowContainer = styled.div``;

const BannerImage = ({ page, handleClick }) => {
    return (
        <Link to={`#${page}`} onClick={handleClick}>
            <img
                src={`https://picsum.photos/970/250?random=${page}`}
                alt={`BannerImage${page}`}
            />
        </Link>
    );
};

const Dot = ({ currentPage, handleRadioChange, handleRadioClick }) => {
    return (
        <DotContainer>
            <ul>
                {[1, 2].map(page => (
                    <li>
                        <label>
                            <input
                                type="radio"
                                name="banner"
                                value={`page${page}`}
                                checked={currentPage === `page${page}`}
                                onChange={handleRadioChange}
                            />
                            <DotBtn onClick={handleRadioClick(page)} />
                        </label>
                    </li>
                ))}
            </ul>
        </DotContainer>
    );
};

const Arrow = ({ handleButtonClick }) => {
    return (
        <ArrowContainer>
            <LeftBtn onClick={handleButtonClick('backward')}>
                <FontAwesomeIcon icon={faChevronDown} />
            </LeftBtn>
            <RightBtn onClick={handleButtonClick('forward')}>
                <FontAwesomeIcon icon={faChevronDown} />
            </RightBtn>
        </ArrowContainer>
    );
};

const Banner = ({
    banner,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleClick,
}) => {
    const bannerStyle = {
        transform: 'translateX(-200vw)',
        transition: '0s',
    };

    return (
        <BannerContainer
            ref={banner}
            style={bannerStyle}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {Array(3)
                .fill([1, 2])
                .flat()
                .map(page => (
                    <BannerImage {...{ page, handleClick }} />
                ))}
        </BannerContainer>
    );
};

export const Carousel = () => {
    const {
        banner,
        currentPage,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseLeave,
        handleMouseOver,
        handleClick,
        handleButtonClick,
        handleRadioChange,
        handleRadioClick,
    } = useCarousel();

    return (
        <BannerWrapper
            onMouseLeave={handleMouseLeave}
            onMouseOver={handleMouseOver}
        >
            <Dot {...{ currentPage, handleRadioChange, handleRadioClick }} />
            <Arrow {...{ handleButtonClick }} />
            <Banner
                {...{
                    banner,
                    handleMouseDown,
                    handleMouseMove,
                    handleMouseUp,
                    handleClick,
                }}
            />
        </BannerWrapper>
    );
};
