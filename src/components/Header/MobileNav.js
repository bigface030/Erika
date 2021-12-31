import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import { LinkedUL, MEDIA_QUERY, Btn } from "../../constants/style"

import { LinkItem } from "../LinkItem"


const MobileMenuNav = styled.nav`
  display: none;
  ${MEDIA_QUERY.main} {
    display: block;
  }
`

const MobileMenu = styled(LinkedUL)`

  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
  width: 75%;
  max-width: 360px;
  height: 100vh;
  padding: 0 10px;
  background-color: #fff;
  box-shadow: 1px 0px 5px #aaa;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & li {
    & a {
      position: relative;
      width: 100%;
      & h4, p {
        position: absolute;
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  & > div {
    & > li {
      & > a {
        height: 60px;
        & > h4 {
          line-height: 2em;
        }
      }
      & > ul {
        margin-left: 30px;
        display: none;
        & > li {
          & > a {
            height: 50px;
          }
          & > ul {
            display: none; 
            margin-left: 30px;
            & > li {
              & > a {
                height: 40px;
              }
            }
          }
        }
      }
    }
  }

`

const ToggleBtn = styled(Btn)`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  z-index: 21;
  & svg {
    font-size: ${props => props.theme.fontSize.h4};
  }
`


const ToggleInput = styled.input`
  position: absolute;
  right: 0;
  opacity: 0;
  z-index: -1;
  &:checked ~ ul {
    display: block;
  }
  &:checked + button {
    & svg {
      color: ${props => props.theme.color.grey};
      transform: rotate(0.5turn);
    }
  }
`

const CheckBox = ({id}) => {
  return (
    <>
      <ToggleInput id={id} type="checkbox"/>
      <ToggleBtn>
        <label htmlFor={id}>
            <FontAwesomeIcon icon={faChevronDown}/>
        </label>
      </ToggleBtn>
    </>
  )
}

export default function MobileNav() {
  return (
    <MobileMenuNav>
      <MobileMenu>
        <div>
          <li><LinkItem to="#" name="新品上市" size="H4" /></li>
          <li>
            <CheckBox id="collection"/>
            <LinkItem to="/collection" name="商品一覽" size="H4" />
            <ul>
              <li>
                <CheckBox id="collection-men" />
                <LinkItem to="/collection/men" name="男裝" size="H4" />
                <ul>
                  <li><LinkItem to="/collection/men/tops" name="上衣類" size="P" /></li>
                  <li><LinkItem to="/collection/men/shirts" name="襯衫類" size="P" /></li>
                  <li><LinkItem to="/collection/men/knit" name="針織衫 / 毛衣" size="P" /></li>
                  <li><LinkItem to="/collection/men/bottoms" name="褲裝類" size="P" /></li>
                  <li><LinkItem to="/collection/men/outer" name="外套類" size="P" /></li>
                  <li><LinkItem to="/collection/men/general" name="配件類" size="P" /></li>
                </ul>
              </li>
              <li>
                <CheckBox id="collection-women" />
                <LinkItem to="/collection/women" name="女裝" size="H4" />
                <ul>
                  <li><LinkItem to="/collection/women/tops" name="上衣 / 襯衫" size="P" /></li>
                  <li><LinkItem to="/collection/women/knit" name="針織衫 / 毛衣" size="P" /></li>
                  <li><LinkItem to="/collection/women/bottoms" name="褲裝類" size="P" /></li>
                  <li><LinkItem to="/collection/women/skirts" name="裙子類" size="P" /></li>
                  <li><LinkItem to="/collection/women/one_piece" name="洋裝類" size="P" /></li>
                  <li><LinkItem to="/collection/women/outer" name="外套類" size="P" /></li>
                  <li><LinkItem to="/collection/women/general" name="配件類" size="P" /></li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <CheckBox id="on-sale" />
            <LinkItem to="#" name="特價專區" size="H4" />
            <ul>
              <li><LinkItem to="#" name="秋冬女裝新品_7折起" size="H4" /></li>
              <li><LinkItem to="#" name="秋冬男裝新品_7折起" size="H4" /></li>
              <li><LinkItem to="#" name="春夏商品出清_3折起" size="H4" /></li>
            </ul>
          </li>
          <li><LinkItem to="#" name="關於我們" size="H4" /></li>
        </div>
        <div>
          <li><LinkItem to="#" name="登入" size="H4" /></li>
          <li><LinkItem to="#" name="願望清單" size="H4" /></li>
        </div>
      </MobileMenu>
    </MobileMenuNav>
  );
}