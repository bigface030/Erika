import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Carousel } from './Carousel'
import arrival_female_img from './arrival_female.jpeg'
import arrival_male_img from './arrival_male.jpeg'
import { H2, H3, H4, P } from "../../constants/style"

const ArrivalWrapper = styled.div`
`
const ArrivalContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 512px) {
    flex-direction: column;
    & > div {
      margin: 10px 0;
    }
  }
`

const ArrivalItem = styled.div`
  width: 50%;
  box-sizing: border-box;
  margin: 10px;
  background-color: #aaa;
  box-shadow: 1px 1px 5px #aaa;
  position: relative;
  overflow: hidden;

  &:hover img{
    transform: scale(1.1);
  }
  & img {
    width: 100%;
    vertical-align: middle;
    transition: .5s;
  }
  @media (max-width: 512px) {
    width: 100%;
  }
`

const TitleWrapper = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`

const TitleContainer = styled.div`
  text-align: center;
  & hr {
    margin: 15px 0;
    border: 1px solid #aaa;
  }
  & h4 {
    font-size: 64px;
    font-family: impact;
    color: #333;
  }
  & p {
    font-size: 40px;
    font-weight: 900;
    color: #333;
    line-height: 1.5em;
  }
  @media (max-width: 1024px) {
    & hr {
      margin: 7px 0;
    }
    & h4 {
      font-size: 48px;
      font-family: impact;
      color: #333;
    }
    & p {
      font-size: 28px;
      font-weight: 900;
      color: #333;
      line-height: 1.5em;
    }
  }
  @media (max-width: 768px) {
    & hr {
      margin: 5px 0;
    }
    & h4 {
      font-size: 32px;
      font-family: impact;
      color: #333;
    }
    & p {
      font-size: 20px;
      font-weight: 900;
      color: #333;
      line-height: 1.5em;
    }
  }
  @media (max-width: 256px) {
    & hr {
      margin: 5px 0;
    }
    & h4 {
      font-size: 20px;
      font-family: impact;
      color: #333;
    }
    & p {
      font-size: 14px;
      font-weight: 900;
      color: #333;
      line-height: 1.5em;
    }
  }
`

const TrendingWrapper = styled.div`
`
const TrendingContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  @media (max-width: 512px) {
    width: 100%;
  }
  padding: 40px 0;
  & h2, div {
    text-align: center;
  }
  & input{
    display: none;
    &:checked + div {
      display: flex;
    }
  }
`

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
    transition: width .4s;
  }
  & label {
    padding: 0 5px;
    &:hover {
      cursor: pointer;
      & span::after {
        width: 100%
      }
    }
  }
`

const ProductContainer = styled.div`
  display: none;
  justify-content: center;
  flex-wrap: wrap;
`
const ProductCard = styled.section`
  padding: 10px;
  width: 25%;
  box-sizing: border-box;
  & a {
    text-decoration: none;
  }
  & > div {
    position: relative;
  }
  & img {
    width: 100%;
    vertical-align: middle;
    position: relative;
  }
  & h4 {
    padding: 10px 0;
  }

  @media (max-width: 1024px) {
    width: 33%;
    &:nth-child(n+7) {
      display: none;
    }
  }
  @media (max-width: 768px) {
    width: 50%;
    &:nth-child(n+5) {
      display: none;
    }
  }
  @media (max-width: 256px) {
    width: 100%;
  }
`

const ImageContainer = styled.div`
  position: relative;
  & a {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  &:hover > div {
    background-color: #0005;
    & > button {
      &:nth-child(1) {
        left: -80px;
      }
      &:nth-child(2) {
        right: -80px;
      }
    }
  }
  & > div {
    background-color: #0000;
    transition: background-color .3s;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    & > button {
      z-index: 2;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      &:nth-child(1) {
        left: -400px;
        transition: left .3s;
      }
      &:nth-child(2) {
        right: -400px;
        transition: right .3s .05s;
      }
    }
  }
`

const Btn = styled.button`
  width: 60px;
  height: 60px;
  background-color: #aaaa;
  border-radius: 50%;
  border: none;
  display: block;

  &:hover {
    bottom: 4px;
  }
  &:active {
    top: 2px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    font-size: 40px;
    color: ${props => props.theme.color.grey};
  }
`

const FeedWrapper = styled.div`
`
const FeedContainer = styled.div`
  padding: 40px 0 0;
  display: flex;
  overflow: hidden;
  & div {
    width: calc(100%/6);
    @media (max-width: 768px) {
      width: calc(100%/4);
    }
    @media (max-width: 512px) {
      width: calc(100%/3);
    }
    @media (max-width: 256px) {
      width: calc(100%/2);
    }
    flex-shrink: 0;
    & img {
      vertical-align: middle;
      width: 100%;
    }
  }
`

export default function HomePage() {
  return (
    <div>
      <Carousel/>
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
                  <hr/>
                  <p>女裝新品</p>
                </TitleContainer>
              </TitleWrapper>
              <img src={arrival_female_img} alt="arrival_female_img"/>
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
                  <hr/>
                  <p>男裝新品</p>
                </TitleContainer>
              </TitleWrapper>
              <img src={arrival_male_img} alt="arrival_male_img"/>
            </Link>
          </ArrivalItem>
        </ArrivalContainer>
      </ArrivalWrapper>
      <TrendingWrapper>
        <TrendingContainer>
          <H2>熱賣商品</H2>
          <Subtitle>
            <label htmlFor="female"><span>女裝</span></label>
            /
            <label htmlFor="male"><span>男裝</span></label>
          </Subtitle>
          <input id="female" type="radio" name="subtitle" checked/>
          <ProductContainer>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=1" alt="001"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品001</H4>
                </Link>
              </div>
              <P>NT $1,450</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=1" alt="001"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品001</H4>
                </Link>
              </div>
              <P>NT $1,450</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=1" alt="001"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品001</H4>
                </Link>
              </div>
              <P>NT $1,450</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=1" alt="001"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品001</H4>
                </Link>
              </div>
              <P>NT $1,450</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=1" alt="001"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品001</H4>
                </Link>
              </div>
              <P>NT $1,450</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=1" alt="001"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品001</H4>
                </Link>
              </div>
              <P>NT $1,450</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=1" alt="001"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品001</H4>
                </Link>
              </div>
              <P>NT $1,450</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=1" alt="001"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品001</H4>
                </Link>
              </div>
              <P>NT $1,450</P>
            </ProductCard>
          </ProductContainer>
          <input id="male" type="radio" name="subtitle"/>
          <ProductContainer>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=2" alt="002"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品002</H4>
                </Link>
              </div>
              <P>NT $5,278</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=2" alt="002"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品002</H4>
                </Link>
              </div>
              <P>NT $5,278</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=2" alt="002"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品002</H4>
                </Link>
              </div>
              <P>NT $5,278</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=2" alt="002"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品002</H4>
                </Link>
              </div>
              <P>NT $5,278</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=2" alt="002"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品002</H4>
                </Link>
              </div>
              <P>NT $5,278</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=2" alt="002"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品002</H4>
                </Link>
              </div>
              <P>NT $5,278</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=2" alt="002"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品002</H4>
                </Link>
              </div>
              <P>NT $5,278</P>
            </ProductCard>
            <ProductCard>
              <div>
                <ImageContainer>
                  <Link to="#"/>
                  <img src="https://picsum.photos/280/280?random=2" alt="002"/>
                  <div>
                    <Btn>
                      <FontAwesomeIcon icon={faCartPlus}/>
                    </Btn>
                    <Btn>
                      <FontAwesomeIcon icon={faHeart}/>
                    </Btn>
                  </div>
                </ImageContainer>
                <Link to="#">
                  <H4>商品002</H4>
                </Link>
              </div>
              <P>NT $5,278</P>
            </ProductCard>
          </ProductContainer>
        </TrendingContainer>
      </TrendingWrapper>
      <FeedWrapper>
        <FeedContainer>
          <div>
            <Link to="#"><img src="https://picsum.photos/120/120?random=1" alt="feed"/></Link>
          </div>
          <div>
            <Link to="#"><img src="https://picsum.photos/120/120?random=1" alt="feed"/></Link>
          </div>
          <div>
            <Link to="#"><img src="https://picsum.photos/120/120?random=1" alt="feed"/></Link>
          </div>
          <div>
            <Link to="#"><img src="https://picsum.photos/120/120?random=1" alt="feed"/></Link>
          </div>
          <div>
            <Link to="#"><img src="https://picsum.photos/120/120?random=1" alt="feed"/></Link>
          </div>
          <div>
            <Link to="#"><img src="https://picsum.photos/120/120?random=1" alt="feed"/></Link>
          </div>
        </FeedContainer>
      </FeedWrapper>
    </div>
  );
}