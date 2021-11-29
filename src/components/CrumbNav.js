import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components"

import { crumbMap } from "../constants/mapping";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { MEDIA_QUERY } from "../constants/style";



const CrumbWrapper = styled.nav`
  ${MEDIA_QUERY.xs} {
    display: none;
  }
`
const CrumbContainer = styled.div`
  width: 90%;
  margin: 20px auto 10px;
  & ol {
    display: flex;
    flex-wrap: wrap;
    & li {
      & a {
        font-size: ${props => props.theme.fontSize.bodyLarge};
        font-weight: ${props => props.theme.fontWeight.l};
        color: ${props => props.theme.color.black};
        line-height: 1.5em;
        &:last-child {
          font-weight: ${props => props.theme.fontWeight.xl};
        }
      }
      & + li {
        margin-left: 5px;
        &::before {
          content: '>';
          margin-right: 5px;
        }
      }
    }
  }
  & li {
    z-index: 1;
  }
`



export const CrumbNav = ({pathArr, name}) => {
  
    return (
      <CrumbWrapper>
        <CrumbContainer>
          <ol>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome}/>
              </Link>
            </li>
            {pathArr.slice(1).map((path, index) => {
              return (
                <li key={index}>
                  <Link to={pathArr.slice(0, index+2).join('/')}>
                    <span>{crumbMap[index][path]}</span>
                  </Link>
                </li>
              )
            })}
            {name && (
              <li>
                <Link to="#">
                  <span>{name}</span>
                </Link>
              </li>
            )}
          </ol>
        </CrumbContainer>
      </CrumbWrapper>
    )
  }