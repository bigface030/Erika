import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components"

import { crumbMap } from "../constants/mapping";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'



const CrumbWrapper = styled.nav``
const CrumbContainer = styled.div`
  width: 90%;
  margin: 20px auto 10px;
  & ol {
    display: flex;
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



export const CrumbNav = ({pathArr}) => {

    const history = useHistory()
    
    useEffect(() => {
      const currentPath = pathArr[pathArr.length-1]
      const currentTitle = crumbMap[pathArr.length-2][currentPath]
      if(!currentTitle){
        const previousPath = pathArr.slice(0, pathArr.length-1).join('/')
        history.push(previousPath)
      }
    }, [history, pathArr])
  
    return (
      <CrumbWrapper>
        <CrumbContainer>
          <ol>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome}/>
              </Link>
            </li>
            {pathArr.slice(1).map(path => {
              const pathIndex = pathArr.indexOf(path)
              return (
                <li key={pathIndex}>
                  <Link to={pathArr.slice(0, pathIndex+1).join('/')}>
                    <span>{crumbMap[pathIndex-1][path]}</span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </CrumbContainer>
      </CrumbWrapper>
    )
  }