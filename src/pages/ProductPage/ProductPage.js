import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components"

import { MEDIA_QUERY, PageWrapper, PageContainer, H4 } from "../../constants/style"

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
                </MainContainer>
              )}
            </PageContainer>
          </PageWrapper>
          <Feed />
          {popupCode !== 'cart' && (
            <Popup type="login" />
          )}
          {product && popupCode !== 'login' && (
            <Popup type="cart" />
          )}
        </>
    )
}