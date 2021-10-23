import { Link } from "react-router-dom";
import styled from "styled-components"
import logo from '../logo.png'
import { MEDIA_QUERY } from "../constants/style"

const LogoContainer = styled.h1`
  display: block;
  height: 70px;
  text-align: center;
  & img {
    vertical-align: middle;
  }
  ${MEDIA_QUERY.xs} {
    display: none;
  }
`

export const Logo = () => {
    return (
      <LogoContainer>
        <Link to="/">
          <img src={logo} height="70px" alt="logo"/>
        </Link>
      </LogoContainer>
    )
}