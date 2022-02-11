import { Link } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import { H4, P } from "../../constants/style"
import { MEDIA_QUERY, Btn } from "../../constants/style"

import useProduct from "../../hooks/useProduct";
import usePriceFilter from "../../hooks/usePriceFilter";

import { LocationContext } from "./ListPage";


const ControllerBtn = styled(Btn)`
  display: none;
  height: 40px;
  padding-left: 20px;
  border-radius: 5px;
  background-color: #eee;
  box-shadow: 1px 0px 5px ${props => props.theme.color.lightGrey};
  & svg {
    padding: 10px;
    font-size: ${props => props.theme.fontSize.h3};
  }
  ${MEDIA_QUERY.main} {
    display: block;
    position: absolute;
    right: -30px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
`

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

const FilterContainer = styled(AsideBlock)`
  ${MEDIA_QUERY.main} {
    position: relative;
    border: none;
    box-shadow: 1px 0px 5px ${props => props.theme.color.lightGrey};
  }
  & section {
    padding: 10px 15px 0;
    &:last-child {
      padding-bottom: 10px;
    }
    & ul {
      padding: 5px 10px;
    }
  }
`

const SizeFilter = styled.section`
  & li {
    display: flex;
  }
  & a {
    z-index: 1;
    width: 100%;
    & > svg {
      font-size: ${props => props.theme.fontSize.h4};
      color: ${props => props.theme.color.grey};
    }
    & > span {
      padding: 0 5px;
      line-height: 2em;
    }
  }
`

const ColorFilter = styled.section`
  & ul {
    display: flex;
    & li {
      z-index: 1;
      & + li {
        margin-left: 5px;
      }
    }
  }
`

const ColorSpan = styled.span`
  display: block;
  box-sizing: border-box;
  border: 1px solid #aaa8;
  border: ${props => (props.$border || (props.$color === 'black')) && 'thin solid #333'};
  border: ${props => (props.$border && (props.$color === 'black')) && 'medium double #eee'};
  width: 30px;
  height: 30px;
  background-color: ${props => props.theme.color[props.$color]};
`

const PriceFilter = styled.section`
`

const PriceTag = styled(P)`
  font-weight: ${props => props.theme.fontWeight.m};
  & span {
    &:last-child {
      &::before {
        content: '-';
        margin: 0 5px;
      }
    }
  }
`

const PriceBar = styled.div`
  margin: 10px auto;
  padding: 0 15px;
  background-color: ${props => props.theme.color.lightGrey};
  & > div {
    z-index: 1;
    width: 100%;
    height: 5px;
    position: relative;
    & > div {
      position: absolute;
      top: 0;
      bottom: 0;
      background-color: ${props => props.theme.color.grey};
    }
  }
`

const PriceKnob = styled.span`
  display: block;
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.color.grey};
  background-color: ${props => props.theme.color.light_primary};
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
`

const Cover = styled.label`
  z-index: 2;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
`

const ClearBtn = styled(Btn)`
  background-color: ${props => props.theme.color.black};
  padding: 3px 10px;
  margin: 10px 15px 0;
  border-radius: 1em;
  & span {
    color: ${props => props.theme.color.white};
    font-size: ${props => props.theme.fontSize.bodyLarge};
    font-weight: ${props => props.theme.fontWeight.l};
  }
`


const SizeSelect = ({size}) => {

  const { pathname, search } = useContext(LocationContext);
  const newSearch = new URLSearchParams(search);
  const param = newSearch.get('size');
  let icon = faSquare;

  if (param) {
    if (!param.includes(size)) {
      newSearch.set('size', `${param} ${size}`)
    } else if (param === size) {
      newSearch.delete('size')
      icon = faCheckSquare;
    } else {
      const newParam = param.split(' ' + size).join('').split(size + ' ').join('')
      newSearch.set('size', newParam)
      icon = faCheckSquare;
    }
  } else {
    newSearch.append('size', size)
  }

  if (newSearch.has('page')) {
    newSearch.delete('page')
  }

  const url = `${pathname}?${newSearch}`

  return (
    <Link to={url}>
      <FontAwesomeIcon icon={icon}/>
      <span>{size}</span>
    </Link>
  )
}

const ColorSelect = ({color}) => {

  const colors = {
    white: 'light_primary',
    black: 'black',
    grey: 'lightGrey',
    yellow: 'yellow',
    brown: 'brown',
  }
  
  const { pathname, search } = useContext(LocationContext);
  const newSearch = new URLSearchParams(search);
  const param = newSearch.get('color');
  let border = false;

  if (param) {
    if (!param.includes(color)) {
      newSearch.set('color', `${param} ${color}`)
    } else if (param === color) {
      newSearch.delete('color')
      border = true;
    } else {
      const newParam = param.split(' ' + color).join('').split(color + ' ').join('')
      newSearch.set('color', newParam)
      border = true;
    }
  } else {
    newSearch.append('color', color)
  }

  if (newSearch.has('page')) {
    newSearch.delete('page')
  }

  const url = `${pathname}?${newSearch}`

  return (
    <Link to={url}>
      <ColorSpan $border={border} $color={colors[color]}/>
    </Link>
  )
}

const PriceSelect = () => {

  const rightStyle = {
    left: "100%"
  }
  const leftStyle = {
    right: "100%"
  }
  const barStyle = {
    left: "0%",
    right: "0%"
  }

  const { addCommaToPrice } = useProduct()
  
  const {
    bar,
    barSelected,
    knobLeft,
    knobRight,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    min,
    max,
    isDragging
  } = usePriceFilter();

  return (
    <div>
      <PriceTag>
        <span>${addCommaToPrice(min)}</span>
        <span>${addCommaToPrice(max)}</span>
      </PriceTag>
      <PriceBar>
        <div ref={bar}>
          <div ref={barSelected} style={barStyle} />
            <PriceKnob ref={knobLeft} $left style={leftStyle} onMouseDown={handleMouseDown} />
            <PriceKnob ref={knobRight} $right style={rightStyle} onMouseDown={handleMouseDown} />
        </div>
      </PriceBar>
      {isDragging && (
        <Cover
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  )
}

export const Filter = () => {
  
  const sizes = ['S', 'M', 'L']
  const colors = ['brown', 'yellow', 'white', 'grey', 'black']

  const { pathname, search } = useContext(LocationContext);
  const newSearch = new URLSearchParams(search)

  const clearedSearch = newSearch.has('order') ? new URLSearchParams({order: newSearch.get('order')}) : null

  const clearURL = clearedSearch ? `${pathname}?${clearedSearch}` : pathname
  
  return (
    <>
      <ControllerBtn>
        <label htmlFor="filter">
          <FontAwesomeIcon icon={faFilter}/>
        </label>
      </ControllerBtn>
      <FilterContainer>
        <H4>商品篩選</H4>
        {(newSearch.has('size') || newSearch.has('color') || newSearch.has('price')) && (
          <ClearBtn>
            <Link to={clearURL}>
              <span>清除篩選</span>
            </Link>
          </ClearBtn>
        )}
        <SizeFilter>
          <P>尺寸</P>
          <ul>
            {sizes.map(size => (
              <li key={size}>
                <SizeSelect {...{size}} />
              </li>
            ))}
          </ul>
        </SizeFilter>
        <ColorFilter>
          <P>顏色</P>
          <ul>
            {colors.map(color => (
              <li key={color}>
                <ColorSelect {...{color}} />
              </li>
            ))}
          </ul>
        </ColorFilter>
        <PriceFilter>
          <P>價格</P>
          <PriceSelect />
        </PriceFilter>
      </FilterContainer>
    </>
  )
}