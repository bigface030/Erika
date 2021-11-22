import { Link } from "react-router-dom";
import styled from "styled-components"
import { useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faThLarge, faChevronDown, faAlignJustify } from '@fortawesome/free-solid-svg-icons'

import { Span } from "../../constants/style"
import { MEDIA_QUERY, Btn } from "../../constants/style"

const SortContainer = styled.div`
  margin: 0 10px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.color.lightGrey}3;
`

const GalleryBtnGroup = styled.div`
  z-index: 1;
  ${MEDIA_QUERY.s} {
    display: none;
  }
`

const GalleryBtn = styled(Btn)`
  padding: 5px;
  & svg {
    font-size: ${props => props.theme.fontSize.btn};
  }
  ${MEDIA_QUERY.m} {
    ${props => props.$four && 'display: none;'}
  }
`

const GalleryRadio = styled.input`
  display: none;
  &:checked {
    & ~ div {
      & section {
        width: ${props => props.$two && 'calc(100%/2)'};
        width: ${props => props.$three && 'calc(100%/3)'};
        width: ${props => props.$four && 'calc(100%/4)'};
      }
    }
  }
`

const MenuContainer = styled.div`
  width: 150px;
  position: relative;
  & span {
    display: block;
    font-weight: ${props => props.theme.fontWeight.l};
  }
  & > input {
    display: none;
    &:checked {
      & ~ ul {
        display: block;
      }
      & + label {
        display: block;
      }
    }
  }
`
const Menu = styled.div`
  z-index: 1;
  background-color: ${props => props.theme.color.white};
  border: 1px solid ${props => props.theme.color.lightGrey}8;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  position: relative;
  & span {
    color: ${props => props.theme.color.lightGrey};
  }
  & button {
    & svg {
      font-size: ${props => props.theme.fontSize.bodyLarge};
    }
  }
  & label {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const SubMenu = styled.ul`
  width: 100%;
  position: absolute;
  top: 33px;
  background-color: #fff;
  z-index: 2;
  box-shadow: 1px 0px 5px ${props => props.theme.color.lightGrey};
  display: none;
  & li:hover {
    background-color: ${props => props.theme.color.grey};
    & span {
    color: ${props => props.theme.color.light_primary};
    }
  }
  & span {
    padding: 5px 10px;
    color: ${props => props.theme.color.grey};
  }
`

const Cover = styled.label`
  z-index: 0;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  display: none;
`

const SortMenu = ({path, search}) => {

    search = new URLSearchParams(search);
    const param = search.get('order');
  
    const sortMap = {
      sold_desc: '熱門度優先', 
      price_desc: '價格 (高至低)', 
      price_asc: '價格 (低至高)',
    };
    let sort = sortMap.sold_desc;
    
    if (param) {
      sort = sortMap[param];
    }
    
    const SortSelect = ({order}) => {
      
      const newSearch = new URLSearchParams(search);
      if (param) {
        newSearch.set('order', order)
      } else {
        newSearch.append('order', order)
      }
      const url = `${path}?${newSearch}`
  
      return (
        <Link to={url}>
          <Span>{sortMap[order]}</Span>
        </Link>
      )
    }
  
    useEffect(() => {
      document.querySelector('#sort-menu').checked = false
    }, [search])
  
    return (
      <MenuContainer>
        <Menu>
          <label htmlFor="sort-menu" />
          <Span>{sort}</Span>
          <Btn><FontAwesomeIcon icon={faChevronDown}/></Btn>
        </Menu>
        <input id="sort-menu" type="checkbox" />
        <Cover htmlFor="sort-menu"/>
        <SubMenu>
          {Object.keys(sortMap).map(order => (
            <li key={order}>
              <SortSelect order={order}/>
            </li>
          ))}
        </SubMenu>
      </MenuContainer>
    )
}

export const Sort = ({pathname, search}) => {
    return (
        <>
            <SortContainer>
              <GalleryBtnGroup>
                <GalleryBtn>
                  <label htmlFor="two-columns">
                    <FontAwesomeIcon icon={faThLarge}/>
                  </label>
                </GalleryBtn>
                <GalleryBtn>
                  <label htmlFor="three-columns">
                    <FontAwesomeIcon icon={faTh}/>
                  </label>
                </GalleryBtn>
                <GalleryBtn $four>
                  <label htmlFor="four-columns">
                    <FontAwesomeIcon icon={faAlignJustify} transform={{ rotate: 90 }}/>
                  </label>
                </GalleryBtn>
              </GalleryBtnGroup>
              <SortMenu path={pathname} search={search} />
            </SortContainer>
            <GalleryRadio $two id="two-columns" name="gallery" type="radio" />
            <GalleryRadio $three id="three-columns" name="gallery" type="radio" />
            <GalleryRadio $four id="four-columns" name="gallery" type="radio" />
        </>
    )
}