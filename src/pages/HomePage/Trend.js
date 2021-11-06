import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faShoppingCart, faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

import { H2, H3, H4, P } from "../../constants/style"
import { getTrendingProductsAPI } from "../../webAPI/productAPI";
import { MEDIA_QUERY } from "../../constants/style"
import useProduct from "../../hooks/useProduct";

const TrendingWrapper = styled.div`
`
const TrendingContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;
  ${MEDIA_QUERY.s} {
    width: 100%;
  }
  & h2, div {
    text-align: center;
  }
  & input {
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
        width: 100%;
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
  & img {
    width: 100%;
    height: 100%;
  }
  & h4 {
    padding: 10px 0;
  }

  ${MEDIA_QUERY.main} {
    width: 33%;
    &:nth-child(n+7) {
      display: none;
    }
  }
  ${MEDIA_QUERY.m} {
    width: 50%;
    &:nth-child(n+5) {
      display: none;
    }
  }
  ${MEDIA_QUERY.xs} {
    width: 100%;
  }
`

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  & a {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  &:hover > div:last-child {
    background-color: ${props => props.theme.color.black}5;
    & > button {
      &:nth-child(1) {
        left: -80px;
      }
      &:nth-child(2) {
        right: -80px;
      }
    }
  }
`

const ImageMask = styled.div`
  background-color: transparent;
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
`

const Btn = styled.button`
  width: 60px;
  height: 60px;
  background-color: ${props => props.theme.color.lightGrey}a;
  border-radius: 50%;
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
    font-size: ${props => props.theme.fontSize.svgLarge};
    color: ${props => props.theme.color.grey};
  }
`

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
`

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
`

const ProductReminderSale = styled.span`
  background-color: ${props => props.theme.color.alert};
`
const ProductReminderNew = styled.span`
  background-color: ${props => props.theme.color.black};
`

const ProductItem = ({trend}) => {

  const { addCommaToPrice } = useProduct();

  return (
    <ProductCard>
      <div>
        <ImageContainer>
          <Link to="#"/>
          <img src={trend.Images[0].src} alt={trend.Images[0].alt}/>
          <ProductReminder>
            {trend.is_sale && (
              <ProductReminderSale>SALE</ProductReminderSale>
            )}
            <ProductReminderNew>NEW</ProductReminderNew>
          </ProductReminder>
          <ImageMask>
            <Btn>
              <FontAwesomeIcon icon={faShoppingCart}/>
            </Btn>
            <Btn>
              <FontAwesomeIcon icon={faHeart}/>
            </Btn>
          </ImageMask>
        </ImageContainer>
        <Link to="#">
          <H4>{trend.name}</H4>
        </Link>
      </div>
      {
        trend.is_sale ? (
          <ProductPrice>
            <span>NT ${addCommaToPrice(trend.price_standard)}</span>
            <span>NT ${addCommaToPrice(trend.price_sale)}</span>
          </ProductPrice>
        ) : (
          <P>NT ${addCommaToPrice(trend.price_standard)}</P>
        )
      }
    </ProductCard>
  )
}

export const Trend = () => {

  const [trends, setTrends] = useState(() => (
    {male: null, female: null}
  ))

  useEffect(() => {
    getTrendingProductsAPI('F').then(data => {
      setTrends(trends => ({...trends, female: data}))
    }).then(() => {
      getTrendingProductsAPI('M').then(data => {
        setTrends(trends => ({...trends, male: data}))
      })
    })
  }, [])

  return (
    <TrendingWrapper>
      <TrendingContainer>
        <H2>熱賣商品</H2>
        <Subtitle>
          <label htmlFor="female"><span>女裝</span></label>
          /
          <label htmlFor="male"><span>男裝</span></label>
        </Subtitle>
        <input id="female" type="radio" name="subtitle" defaultChecked/>
        <ProductContainer>
          {
            trends.female && trends.female.map(trend => {
              return (
                <ProductItem key={trend.id} trend={trend} />
              )
            })
          }
          <ProductCard>
            <div>
              <ImageContainer>
                <Link to="#"/>
                <img src="https://picsum.photos/280/280?random=1" alt="001"/>
                <ProductReminder>
                  <ProductReminderSale>SALE</ProductReminderSale>
                  <ProductReminderNew>NEW</ProductReminderNew>
                </ProductReminder>
                <ImageMask>
                  <Btn>
                    <FontAwesomeIcon icon={faCartPlus}/>
                  </Btn>
                  <Btn>
                    <FontAwesomeIcon icon={fasHeart}/>
                  </Btn>
                </ImageMask>
              </ImageContainer>
              <Link to="#">
                <H4>商品001</H4>
              </Link>
            </div>
            <ProductPrice>
              <span>NT $1,450</span>
              <span>NT $1,150</span>
            </ProductPrice>
          </ProductCard>
          <ProductCard>
            <div>
              <ImageContainer>
                <Link to="#"/>
                <img src="https://picsum.photos/280/280?random=1" alt="001"/>
                <ImageMask>
                  <Btn>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                  </Btn>
                  <Btn>
                    <FontAwesomeIcon icon={faHeart}/>
                  </Btn>
                </ImageMask>
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
          {
            trends.male && trends.male.map(trend => {
              return (
                <ProductItem key={trend.id} trend={trend} />
              )
            })
          }
          <ProductCard>
            <div>
              <ImageContainer>
                <Link to="#"/>
                <img src="https://picsum.photos/280/280?random=2" alt="002"/>
                <ProductReminder>
                  <ProductReminderSale>SALE</ProductReminderSale>
                  <ProductReminderNew>NEW</ProductReminderNew>
                </ProductReminder>
                <ImageMask>
                  <Btn>
                    <FontAwesomeIcon icon={faCartPlus}/>
                  </Btn>
                  <Btn>
                    <FontAwesomeIcon icon={fasHeart}/>
                  </Btn>
                </ImageMask>
              </ImageContainer>
              <Link to="#">
                <H4>商品002</H4>
              </Link>
            </div>
            <ProductPrice>
              <span>NT $2,222</span>
              <span>NT $1,111</span>
            </ProductPrice>
          </ProductCard>
          <ProductCard>
            <div>
              <ImageContainer>
                <Link to="#"/>
                <img src="https://picsum.photos/280/280?random=2" alt="002"/>
                <ImageMask>
                  <Btn>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                  </Btn>
                  <Btn>
                    <FontAwesomeIcon icon={faHeart}/>
                  </Btn>
                </ImageMask>
              </ImageContainer>
              <Link to="#">
                <H4>商品002</H4>
              </Link>
            </div>
            <P>NT $2,222</P>
          </ProductCard>
        </ProductContainer>
      </TrendingContainer>
    </TrendingWrapper>
  );
}