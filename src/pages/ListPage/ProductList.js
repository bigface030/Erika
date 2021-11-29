import styled from "styled-components"
import { useState, useEffect, useContext } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from "../../features/product/productSlice";

import { P } from "../../constants/style"
import { MEDIA_QUERY } from "../../constants/style"

import { TestProductCards } from "../../components/TestProductCards";
import { ProductItem } from "../../components/ProductItem";

import { getProductsAPI } from "../../webAPI/productAPI";
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
  
    // const [products, setProducts] = useState();
    // const [error, setError] = useState();
  
    useEffect(() => {
      window.scrollTo(0, 0);
      // getProductsAPI(pathname, search)
      // .then(data => {
      //   // console.log(data)
      //   if(!data.ok) {
      //     setProducts()
      //     return setError(data.message)
      //   }
      //   setProducts(data.data)
      //   setError()
      // })
      dispatch(getProducts(pathname, search))
    }, [pathname, search, dispatch])
    
    return (
        <>
            <ProductContainer>
                {error && (
                    <P>{error}</P>
                )}
                {products && products.rows.map(product => {
                    return (
                    <ProductItem key={product.id} product={product} />
                    )
                })}
                {/* <TestProductCards />
                <TestProductCards />
                <TestProductCards /> */}
            </ProductContainer>
            <IndexContainer>
                {products && (
                    <Pagination data={products} />
                )}
            </IndexContainer>
        </>
    )
}