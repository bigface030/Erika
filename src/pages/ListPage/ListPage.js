import { useEffect, createContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components"

import { H2, PageWrapper, PageContainer } from "../../constants/style"
import { crumbMap } from "../../constants/mapping";

import { Feed } from "../../components/Feed";
import { CrumbNav } from "../../components/CrumbNav";
import { Aside } from "../../components/Aside"

import { Sort } from "./Sort"
import { ProductList } from "./ProductList";
import { Popup } from "../../components/Popup";



const MainContainer = styled.main`
  width: 80%;
  flex-grow: 1;
  & h2 {
    padding: 0 10px;
  }
`


export const LocationContext = createContext();

export default function ListPage() {

  const { pathname, search } = useLocation();
  const pathArr = pathname.split('/')
  const currentPath = pathArr[pathArr.length-1]
  const currentTitle = crumbMap[pathArr.length-2] ? crumbMap[pathArr.length-2][currentPath] : 0

  const history = useHistory()
    
  useEffect(() => {
    if(!currentTitle){
      const previousPath = pathArr.slice(0, pathArr.length-1).join('/')
      history.push(previousPath)
    }
  }, [history, pathArr, currentTitle])

  return (
    <LocationContext.Provider value={{pathname, search}} >
      <>
        {currentTitle && (
          <CrumbNav pathArr={pathArr}/>
        )}
        <PageWrapper>
          <PageContainer>
            <Aside filter />
            <MainContainer>
              <H2>{currentTitle}</H2>
              <Sort />
              <ProductList />
            </MainContainer>
          </PageContainer>
        </PageWrapper>
        {process.env.NODE_ENV === 'production' && (
          <Feed />
        )}
        <Popup type="login" />
      </>
    </LocationContext.Provider>
  );
}