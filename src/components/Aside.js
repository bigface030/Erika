import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import styled from "styled-components"
import { MEDIA_QUERY } from "../constants/style"

import { Filter } from "../pages/ListPage/Filter"
import { Trend } from "./Trend"

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
  // background-color: #aaaa;

const PictureContainer = styled.div`
  position: relative;
  height: 300px;
  & img {
    position: absolute;
    width: 100%;
  }
  ${MEDIA_QUERY.main} {
    display: none;
  }
`

const AsideContainer = styled.aside`
  width: 20%;
  min-width: 250px;
  & > div {
    z-index: 1;
    margin: 10px;
    background-color: ${props => props.theme.color.white};
  }
  ${MEDIA_QUERY.main} {
    position: fixed;
    left: -240px;
    z-index: 200;
    transition: .3s;
  }
`

const Btn = styled.button`
  & svg {
    font-size: ${props => props.theme.fontSize.h3};
    color: ${props => props.theme.color.lightGrey};
    transition: .2s;
  }
  &:hover svg {
    cursor: pointer;
    color: ${props => props.theme.color.grey};
  }
  & label:checked {
    & svg {
      color: ${props => props.theme.color.grey};
    }
  }
`

const ControllerBtn = styled(Btn)`
  display: none;
  ${MEDIA_QUERY.main} {
    position: absolute;
    right: -30px;
    top: 0;
    bottom: 0;
    margin: auto;
    display: block;
    height: 40px;
    padding-left: 20px;
    border-radius: 5px;
    background-color: #eee;
    box-shadow: 1px 0px 5px ${props => props.theme.color.lightGrey};
    & label {
      & svg {
        padding: 10px;
      }
    }
  }
`

export const Aside = () => {

  return (
      <>
          <input id="filter" type="checkbox" />
          <Cover htmlFor="filter" />
          <AsideContainer>
          <PictureContainer>
              <Link to="/products"><img src="https://picsum.photos/200/250" alt="aside_img" /></Link>
          </PictureContainer>
          <ControllerBtn>
              <label htmlFor="filter">
              <FontAwesomeIcon icon={faFilter}/>
              </label>
          </ControllerBtn>
          <Filter />
          <Trend />
          </AsideContainer>
      </>
  )
}