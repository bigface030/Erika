import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components"

import { MEDIA_QUERY, PageWrapper, PageContainer, H4, fontTheme } from "../../constants/style"

import { CrumbNav } from "../../components/CrumbNav";
import { Aside } from "../../components/Aside";
import { Popup } from "../../components/Popup";
import { Feed } from "../../components/Feed";

import { getProduct, setProduct } from "../../features/product/productSlice";

import { Image } from "./Image";
import { Content } from "./Content";
import { Detail } from "./Detail";

const Msg = styled(H4)`
  margin: 0 auto;
  padding: 20px;
`

const MainContainer = styled.main`
  width: 80%;
  flex-grow: 1;
  position: relative;
`

const ItemContainer = styled.div`
  display: flex;
  & > div {
    width: 50%;
    padding: 10px;
  }
  ${MEDIA_QUERY.m} {
    display: block;
    & > div {
      width: 90%;
      margin: 0 auto;
    }
  }
`

const OffMessage = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.color.white}a;
  z-index: 1;
  & > div {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 40px;
    border-radius: .25em;
    background-color: ${props => props.theme.color.lightGrey}c;
    color: ${props => props.theme.color.black};
    white-space: nowrap;
    ${MEDIA_QUERY.s} {
      ${fontTheme.p}
      padding: 10px 20px;
      top: 10%;
    }
    ${fontTheme.h4}
  }
`


const BreadCrumb = ({product}) => {
  const [path, setPath] = useState(['', 'collection'])
  useEffect(() => {
    if(!product) return
    const gender = product.gender === 'M' ? 'men' : 'women';
    const category = product.Category.name;
    setPath(['', 'collection', gender, category])
    // return () => {
    //   setPath(['', 'collection'])
    // }
  }, [product])
  return (
    <CrumbNav pathArr={path} name={product?.name} />   
  )
}

export default function ProductPage () {

    const { id } = useParams()

    const product = useSelector(state => state.product.product)
    const error = useSelector(state => state.product.error)
    const popupCode = useSelector(state => state.general.popupCode)
    const dispatch = useDispatch()

    const group = product?.product?.Category?.group.slice(0, -1)

    useEffect(() => {
      dispatch(getProduct(id))
      return () => {
        dispatch(setProduct(''))
      }
    }, [id, dispatch])

    return (
        <>
          <BreadCrumb product={product?.product}/>
          <PageWrapper>
            <PageContainer>
              <Aside />
              {!product && (
                error ? (
                  <Msg>{error}</Msg>
                ) : (
                  <Msg>商品載入中...</Msg>
                )
              )}
              {product && !error && (
                <MainContainer>
                  <ItemContainer>
                    <Image images={product.product.Images} />
                    <Content product={product} group={group} />
                  </ItemContainer>
                  <Detail product={product} group={group} />
                  {!product.product.is_on && (
                    <OffMessage>
                      <div>此商品目前未上架!</div>
                    </OffMessage>
                  )}
                </MainContainer>
              )}
            </PageContainer>
          </PageWrapper>
          {process.env.NODE_ENV === 'production' && (
            <Feed />
          )}
          {popupCode !== 'cart' && (
            <Popup type="login" />
          )}
          {product && popupCode !== 'login' && (
            <Popup type="cart" />
          )}
        </>
    )
}