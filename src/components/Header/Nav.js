import styled from "styled-components"

import { LinkedUL, MEDIA_QUERY } from "../../constants/style"

import { LinkItem } from "../LinkItem"

const MenuNav = styled.nav`
  ${MEDIA_QUERY.main} {
    display: none;
  }
`

const Menu = styled(LinkedUL)`
  margin: 0 20px;
  display: flex;

  & > li {
    margin: 0 5px;
    padding: 16px 0;
    position: relative;
    & h4 {
      padding: 0 10px;
      line-height: 2em;
    }
    & > div {
      display: none;
      position: absolute;
    }
    &:hover > div {
      display: flex;
    }
  }
`

const SubMenu = styled.div`
  top: 71px;
  box-shadow: 1px 1px 5px #aaa;
  background-color: #fff;
  & > div {
    margin: 20px 30px;
    & > a {
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      display: flex;
      & h4 {
        font-weight: ${props => props.theme.fontWeight.xl};
        padding: 5px 5px;
      }
    }
    & ul {
      & > li {
        & p {
          padding: 5px 5px;
        }
      }
    }
  }
`

const SubMenuListFlex = styled.div`
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

const SubMenuListBlock = styled.div`
  width: 180px;
  & ul {
    text-align: center;
    & li {
      display: inline-block;
    }
  }
`

export default function Nav() {
  return (
    <MenuNav>
      <Menu>
        <li><LinkItem to="#" name="新品上市" size="H4" /></li>
        <li>
          <LinkItem to="/collection" name="商品一覽" size="H4" />
          <SubMenu>
            <SubMenuListFlex>
              <LinkItem to="/collection/men" name="男裝" size="H4" />
              <ul>
                <li><LinkItem to="/collection/men/tops" name="上衣類" size="P" /></li>
                <li><LinkItem to="/collection/men/shirts" name="襯衫類" size="P" /></li>
                <li><LinkItem to="/collection/men/knit" name="針織衫 / 毛衣" size="P" /></li>
                <li><LinkItem to="/collection/men/bottoms" name="褲裝類" size="P" /></li>
                <li><LinkItem to="/collection/men/outer" name="外套類" size="P" /></li>
                <li><LinkItem to="/collection/men/general" name="配件類" size="P" /></li>
              </ul>
            </SubMenuListFlex>
            <SubMenuListFlex>
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
            </SubMenuListFlex>
          </SubMenu>
        </li>
        <li>
          <LinkItem to="#" name="特價專區" size="H4" />
          <SubMenu>
            <SubMenuListBlock>
              <ul>
                <li><LinkItem to="#" name="秋冬女裝新品_7折起" size="P" /></li>
                <li><LinkItem to="#" name="秋冬男裝新品_7折起" size="P" /></li>
                <li><LinkItem to="#" name="春夏商品出清_3折起" size="P" /></li>
              </ul>
            </SubMenuListBlock>
          </SubMenu>
        </li>
        <li><LinkItem to="#" name="關於我們" size="H4" /></li>
      </Menu>
    </MenuNav>
  );
}