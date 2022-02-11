import styled from "styled-components"
import { useEffect, useContext } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { getProducts, setProducts } from "../../features/product/productSlice";

import { P, H4 } from "../../constants/style"
import { MEDIA_QUERY } from "../../constants/style"

import { ProductItem } from "../../components/ProductItem";

import { Pagination } from "./Pagination";
import { LocationContext } from "./ListPage";

const ProductContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  text-align: center;
  & > section {
    width: calc(100%/4);
    ${MEDIA_QUERY.l} {
      width: calc(100%/3);
    }
    ${MEDIA_QUERY.m} {
      width: 50%;
    }
    ${MEDIA_QUERY.xs} {
      width: 100%;
    }
  }
  & > p {
    margin: 0 auto;
    padding: 20px;
  }
  & > h4 {
    margin: 0 auto;
    padding: 40px 0;
  }
`

const IndexContainer = styled.div`

  height: 55px;
  box-sizing: border-box;

  margin: 0 10px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.color.lightGrey}3;
`

export const ProductList = () => {

  const { pathname, search } = useContext(LocationContext);

  const products = useSelector(state => state.product.products)
  const error = useSelector(state => state.product.error)
  const dispatch = useDispatch()

  useEffect(() => {    
    const newSearch = new URLSearchParams(search);
    if(!newSearch.has('page')){
      newSearch.set('page', 1)
    }
    const pathArr = pathname.split('/').slice(2, 4)
    dispatch(getProducts(pathArr, `?${newSearch}`))
    return () => {
      dispatch(setProducts(null))
    }
  }, [pathname, search, dispatch])
  
  return (
    <>
      <ProductContainer>
        {!products && (
          error ? (
            <P>{error}</P>
          ) : (
            <H4>商品載入中...</H4>
          )
        )}
        {products?.rows && !error && (
          products.rows.length > 0 ? (
            products.rows.map(product => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <H4>查無商品</H4>
          )
        )}
      </ProductContainer>
      <IndexContainer>
        {products && (
          <Pagination {...{products}} />
        )}
      </IndexContainer>
    </>
  )
}