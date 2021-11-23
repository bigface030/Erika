import { useLocation } from "react-router-dom";
import styled from "styled-components"
import { useState, useEffect, createContext } from "react";

import { H2, P } from "../../constants/style"
import { MEDIA_QUERY } from "../../constants/style"
import { crumbMap } from "../../constants/mapping";

import { TestProductCards } from "../../components/TestProductCards";
import { ProductItem } from "../../components/ProductItem";
import { Feed } from "../../components/Feed";
import { CrumbNav } from "../../components/CrumbNav";
import { Aside } from "../../components/Aside"
import { Sort } from "./Sort"

import { getProductsAPI } from "../../webAPI/productAPI";
import { Pagination } from "./Pagination";



const CollectionWrapper = styled.div``
const CollectionContainer = styled.div`
  width: 90%;
  ${MEDIA_QUERY.s} {
    width: 100%;
  }
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  & > input {
    display: none;
    &:checked {
      & ~ aside {
        left: -10px;
      }
      & + label {
        display: block;
      }
    }
  }
`

const MainContainer = styled.main`
  width: 80%;
  flex-grow: 1;
  & h2 {
    padding: 0 10px;
  }
`


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


const Main = styled.div`
  position: relative;
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


export const LocationContext = createContext();

export default function ListPage() {
  console.log('ListPage render')

  const { pathname, search } = useLocation();
  const pathArr = pathname.split('/')
  const currentPath = pathArr[pathArr.length-1]
  const currentTitle = crumbMap[pathArr.length-2][currentPath]

  const [products, setProducts] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductsAPI(pathname, search)
    .then(data => {
      // console.log(data)
      if(!data.ok) {
        setProducts()
        return setError(data.message)
      }
      setProducts(data.data)
      setError()
    })
  }, [pathname, search])

  return (
    <LocationContext.Provider value={{pathname, search}} >
      <Main>
        <CrumbNav pathArr={pathArr}/>
        <CollectionWrapper>
          <CollectionContainer>
            <Aside />
            <MainContainer>
              <H2>{currentTitle}</H2>
              <Sort />
              <ProductContainer>
                {error && (
                  <P>{error}</P>
                )}
                {products && products.data.map(product => {
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
                  <Pagination data={products.pagination} />
                )}
              </IndexContainer>
            </MainContainer>
          </CollectionContainer>
        </CollectionWrapper>
        <Feed />
      </Main>
    </LocationContext.Provider>
  );
}