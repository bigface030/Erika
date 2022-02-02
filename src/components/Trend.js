import styled from "styled-components"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { H4, P, Span } from "../constants/style"
import { MEDIA_QUERY } from "../constants/style"

import useProduct from "../hooks/useProduct";
import { getProductsAPI } from "../webAPI/productAPI";
import { Img } from "./Img";


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
  }
`

const TrendImage = styled.div`
  z-index: 1;
  width: 60%;
  display: flex;
  align-items: center;
  position: relative;
  & img {
    width: 100%;
  }
`

const TrendInfo = styled.div`
  width: 40%;
  & p {
    padding: 5px 0;
  }
  & span {
    display: block;
    font-weight: ${props => props.theme.fontWeight.l};
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
      <TrendImage>
        <Link to="/products">
          <Img image={trend.Images[0]} />
          {/* <img src={trend.Images[0].src} alt={trend.Images[0].alt} /> */}
        </Link>
      </TrendImage>
      <TrendInfo>
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
      </TrendInfo>
    </TrendCard>
  )
}

export const Trend = () => {

  const [trends, setTrends] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const search = '?is_on=1&order=sold_desc'
    getProductsAPI('', search)
    .then(result => {
      if(!result.ok) return setError(result.message)
      setTrends(result.data.slice(0, 4))
    })
  }, [])

  return (
    <TrendContainer>
      <H4>熱賣商品</H4>
      {!trends && (
        error ? (
          <P>{error}</P>
        ) : (
          <P>商品載入中...</P>
        )
      )}
      {trends && !error && (
        trends.length > 0 ? (
          trends.map(trend => (
            <TrendItem key={trend.id} trend={trend} />
          ))
        ) : (
          <P>查無商品</P>
        )
      )}
    </TrendContainer>
  )
}