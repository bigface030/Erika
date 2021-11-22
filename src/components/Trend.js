import { Link } from "react-router-dom";
import styled from "styled-components"
import { useState, useEffect } from "react";

import { H4, P, Span } from "../constants/style"
import { MEDIA_QUERY } from "../constants/style"

import useProduct from "../hooks/useProduct";

import { getTrendingProductsAPI } from "../webAPI/productAPI";



const AsideBlock = styled.div`
  border: 1px solid ${props => props.theme.color.lightGrey}8;
  & > h4 {
    padding: 10px 15px;
    font-weight: ${props => props.theme.fontWeight.xl};
    background-color: #eee;
  }
  & a {
    color: ${props => props.theme.color.black};
  }
`

const TrendContainer = styled(AsideBlock)`
  ${MEDIA_QUERY.main} {
    display: none;
  }
  & > p {
    text-align: center;
    padding: 20px;
  }
`

const TrendCard = styled.section`
padding: 10px 0;
display: flex;
& > div {
    padding: 0 10px;
    &:nth-child(1) {
      z-index: 1;
      width: 60%;
      & img {
        width: 100%;
      }
    }
    &:nth-child(2) {
      width: 40%;
      & p {
        padding: 5px 0;
      }
      & span {
        display: block;
        font-weight: ${props => props.theme.fontWeight.l};
      }
    }
  }
`

const TrendPrice = styled.div`
  & span {
    &:nth-child(1) {
      color: ${props => props.theme.color.grey};
      text-decoration: line-through;
    }
    &:nth-child(2) {
      color: ${props => props.theme.color.alert};
    }
  }
`

const TrendItem = ({trend}) => {

  const { addCommaToPrice } = useProduct()

  return (
    <TrendCard>
      <div>
        <Link to="/products"><img src={trend.Images[0].src} alt={trend.Images[0].alt} /></Link>
      </div>
      <div>
        <Link to="/products">
          <P>{trend.name}</P>
        </Link>
        {
          trend.is_sale ? (
            <TrendPrice>
              <Span>NT ${addCommaToPrice(trend.price_standard)}</Span>
              <Span>NT ${addCommaToPrice(trend.price_sale)}</Span>
            </TrendPrice>
          ) : (
            <Span>NT ${addCommaToPrice(trend.price_standard)}</Span>
          )
        }
      </div>
    </TrendCard>
  )
}

export const Trend = () => {

  const [trends, setTrends] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    getTrendingProductsAPI().then(data => {
      if(!data.ok) {
        setTrends()
        return setError(data.message)
      }
      setTrends(data.data.slice(0, 4))
      setError()
    })
  }, [])

  return (
    <TrendContainer>
        <H4>熱賣商品</H4>
        {error && <P>{error}</P>}
        {trends && trends.map(trend => {
          return (
            <TrendItem key={trend.id} trend={trend} />
          )
        })}
    </TrendContainer>
  )
}