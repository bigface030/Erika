import styled from "styled-components"
import { LinkedUL, MEDIA_QUERY } from "../../constants/style"

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 1px 0px 5px #aaa;
`

export const HeaderContainer = styled.div`
  height: 70px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  & > div {
    display: flex;
    align-items: center;
  }
  & > h1 {
    display: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    ${MEDIA_QUERY.main} {
      display: block;
    }
  }
`

export const HeaderLeft = styled.div`
  ${MEDIA_QUERY.main} {
    & h1 {
      display: none;
    }
  }
`

export const HeaderRight = styled.div`
`

export const Logo = styled.h1`
  display: block;
  height: 70px;
  & img {
    vertical-align: middle;
  }
`

export const Menu = styled(LinkedUL)`
  margin: 0 20px;
  display: flex;

  & > li {
    margin: 0 5px;
    padding: 16px 0;
    position: relative;
    & > a {
      font-size: ${props => props.theme.fontSize.h4};
      font-weight: ${props => props.theme.fontWeight.l};
      padding: 0 10px;
      line-height: 2em;
    }
    &:hover > div {
      display: flex;
    }
  }
`

export const SubMenu = styled.div`
  position: absolute;
  display: none;
  top: 71px;
  box-shadow: 1px 1px 5px #aaa;
  & > div {
    margin: 20px 30px;
    & h4 {
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      display: flex;
      & > a {
        font-size: ${props => props.theme.fontSize.h4};
        font-weight: ${props => props.theme.fontWeight.xl};
        padding: 5px 5px;
        line-height: 1.5em;
      }
    }
    & ul {
      & > li {
        & > a {
          font-size: ${props => props.theme.fontSize.bodyLarge};
          font-weight: ${props => props.theme.fontWeight.l};
          padding: 5px 5px;
          line-height: 1.5em;
        }
      }
    }
  }
`

export const SubMenuListFlex = styled.div`
  width: 240px;
  & ul {
    height: 150px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
  }
`

export const SubMenuListBlock = styled.div`
  width: 180px;
  & ul {
    text-align: center;
    & li {
      display: inline-block;
    }
  }
`

export const MobileMenu = styled(LinkedUL)`

  position: fixed;
  left: 0;
  top: 0;
  z-index: 200;
  width: 360px;
  height: 100vh;
  padding: 0 10px;
  background-color: #fff;
  box-shadow: 1px 0px 5px #aaa;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::before {
    content:
  }

  & li {
    & a {
      position: relative;
      width: 100%;
      & span {
        position: absolute;
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  & div {

    & > li {
      & > a {
        height: 60px;
        & > span {
          font-size: ${props => props.theme.fontSize.h4};
          font-weight: ${props => props.theme.fontWeight.l};
          line-height: 2em;
        }
      }
      & > ul {
        margin-left: 30px;
        display: none;
        & > li {
          & > a {
            height: 50px;
            & > span {
              font-size: ${props => props.theme.fontSize.h4};
              font-weight: ${props => props.theme.fontWeight.l};
              line-height: 2em;
            }
          }
          & > ul {
            display: none; 
            margin-left: 30px;
            & > li {
              & > a {
                height: 40px;
                & > span {
                  font-size: ${props => props.theme.fontSize.bodyLarge};
                  font-weight: ${props => props.theme.fontWeight.l};
                  line-height: 1.5em;
                }
              }
            }
          }
        }
      }
    }
  }

`

// &::after {
//   content: "";
//   width: 100%;
//   height: 100vh;
//   position: fixed;
//   left: 0;
//   top: 0;
//   z-index: 100;
//   background: rgba(0,0,0,0.7);
// }

export const BtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 160px;
  & div + div {
    margin-left: 30px;
  }
`

export const Btn = styled.div`
  & svg {
    font-size: ${props => props.theme.fontSize.svg};
    color: ${props => props.theme.color.lightGrey};
    transition: .2s;
    &:hover {
      color: ${props => props.theme.color.Grey};
    }
  }
`

export const ToggleBtn = styled(Btn)`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  z-index: 700;
  &:hover {
    cursor: pointer;
    & svg {
      color: ${props => props.theme.color.Grey};
    }
  }
  & svg {
    font-size: ${props => props.theme.fontSize.h4};
  }

`

export const MenuBtn = styled(Btn)`
${MEDIA_QUERY.main} {
    display: none;
  }
`

export const BurgerBtn = styled(Btn)`
  display: none;
  ${MEDIA_QUERY.main} {
    display: block;
    &:hover {
      cursor: pointer;
    }
  }
`

export const Input = styled.input`
  &[type="checkbox"] {
    position: absolute;
    right: 0;
    opacity: 0;
    z-index: -1;
    &:checked ~ ul {
      display: block;
    }
    &:checked + label {
      & > div {
        & > svg {
          color: ${props => props.theme.color.Grey};
          transform: rotate(0.5turn);
        }
      }
    }
  }
`

export const BurgerInput = styled.input`
  &[type="checkbox"] {
    ${MEDIA_QUERY.main} {
      display: block;
    }
    position: absolute;
    left: 0;
    display: none;
    opacity: 0;
    z-index: -1;
    :checked ~ nav {
      & ul {
        left: 0;
      }
    }
    :checked + label {
      & div {
        display: block;
      }
    }
  }
`

export const MenuNav = styled.nav`
  ${MEDIA_QUERY.main} {
    display: none;
  }
`
export const MobileMenuNav = styled.nav`
  display: none;
  ${MEDIA_QUERY.main} {
    display: block;
    & ul {
      left: -380px;
      transition: .25s;
    }
  }
`

export const Mask = styled.div`
  display: none;
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background: rgba(0,0,0,0.7);
`