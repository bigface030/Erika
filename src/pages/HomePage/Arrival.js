import { Link } from 'react-router-dom';
import styled from 'styled-components';
import arrival_female_img from '../../assets/arrival_female.jpeg';
import arrival_male_img from '../../assets/arrival_male.jpeg';
import { MEDIA_QUERY } from '../../constants/style';

const ArrivalWrapper = styled.div``;
const ArrivalContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
    ${MEDIA_QUERY.s} {
        flex-direction: column;
        & > div {
            margin: 10px 0;
        }
    }
`;

const ArrivalItem = styled.div`
    width: 50%;
    box-sizing: border-box;
    margin: 10px;
    background-color: ${props => props.theme.color.lightGrey};
    box-shadow: 1px 1px 5px ${props => props.theme.color.lightGrey};
    position: relative;
    overflow: hidden;

    &:hover img {
        transform: scale(1.1);
    }
    & img {
        width: 100%;
        transition: 0.5s;
    }
    ${MEDIA_QUERY.s} {
        width: 100%;
    }
`;

const TitleWrapper = styled.div`
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const TitleContainer = styled.div`
    text-align: center;
    & hr {
        margin: 15px 0;
        border: 1px solid ${props => props.theme.color.lightGrey};
    }
    & h4 {
        font-size: ${props => props.theme.fontSize.bannerLarge};
        font-family: impact;
        color: ${props => props.theme.color.black};
    }
    & p {
        font-size: ${props => props.theme.fontSize.svgLarge};
        font-weight: ${props => props.theme.fontWeight.xxl};
        color: ${props => props.theme.color.black};
        line-height: 1.5em;
    }
    ${MEDIA_QUERY.main} {
        & hr {
            margin: 7px 0;
        }
        & h4 {
            font-size: ${props => props.theme.fontSize.bannerMedium};
        }
        & p {
            font-size: ${props => props.theme.fontSize.svg};
        }
    }
    ${MEDIA_QUERY.m} {
        & hr {
            margin: 5px 0;
        }
        & h4 {
            font-size: ${props => props.theme.fontSize.h2};
        }
        & p {
            font-size: ${props => props.theme.fontSize.h3};
        }
    }
    ${MEDIA_QUERY.xs} {
        & hr {
            margin: 5px 0;
        }
        & h4 {
            font-size: ${props => props.theme.fontSize.h3};
        }
        & p {
            font-size: ${props => props.theme.fontSize.body};
        }
    }
`;

export const Arrival = () => {
    return (
        <ArrivalWrapper>
            <ArrivalContainer>
                <ArrivalItem>
                    <Link to="#">
                        <TitleWrapper>
                            <TitleContainer>
                                <div>
                                    <h4>New</h4>
                                    <h4>Arrival</h4>
                                </div>
                                <hr />
                                <p>女裝新品</p>
                            </TitleContainer>
                        </TitleWrapper>
                        <img
                            src={arrival_female_img}
                            alt="arrival_female_img"
                        />
                    </Link>
                </ArrivalItem>
                <ArrivalItem>
                    <Link to="#">
                        <TitleWrapper>
                            <TitleContainer>
                                <div>
                                    <h4>New</h4>
                                    <h4>Arrival</h4>
                                </div>
                                <hr />
                                <p>男裝新品</p>
                            </TitleContainer>
                        </TitleWrapper>
                        <img src={arrival_male_img} alt="arrival_male_img" />
                    </Link>
                </ArrivalItem>
            </ArrivalContainer>
        </ArrivalWrapper>
    );
};
