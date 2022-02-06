import styled from "styled-components"
import { Link } from "react-router-dom";
import { fontTheme, MEDIA_QUERY, Btn, LinkedTag } from "../../constants/style"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'


const MenuNav = styled.nav`
  ${MEDIA_QUERY.main} {
    display: none;
  }
`

const Menu = styled.ul`
  margin: 0 20px;
  display: flex;
  ${LinkedTag}

  & > li {
    & > a {
      display: block;
    }
    margin: 0 5px;
    padding: 16px 0;
    position: relative;
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
  }
  & li > a {
    display: block;
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

const MenuLink = styled(Link)`
  ${fontTheme.h4};
  ${props => props.$small && fontTheme.p};
  padding: 0 20px;
  ${props => !props.$small && 'line-height: 2em'};
  color: ${props => props.theme.color.black};

  ${MEDIA_QUERY.main} {
    height: ${props => props.$large && '60px'};
    height: ${props => props.$medium && '50px'};
    height: ${props => props.$small && '40px'};
    display: table-cell;
    vertical-align: middle;
  }
`

const SubMenuLink = styled(Link)`
  ${fontTheme.p}
  color: ${props => props.theme.color.black};
  padding: 5px 5px;
`

const SubMenuTitle = styled(MenuLink)`
  display: inline-block;
  padding-bottom: 10px;
  font-weight: ${props => props.theme.fontWeight.xl};
  padding: 5px 5px;
  & + ul {
    border-top: 1px solid #ddd;
  }
`

const MobileMenuNav = styled.nav`
  display: none;
  ${MEDIA_QUERY.main} {
    display: block;
  }
`

const MobileMenu = styled.ul`

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
    & > a {
      display: block;
      color: ${props => props.theme.color.black};
      ${LinkedTag}
    }
  }

  & > div {
    & > li {
      width: 100%;
      display: block;
      & > ul {
        margin-left: 30px;
        display: none;
        & > li {
          & > ul {
            display: none; 
            margin-left: 30px;
          }
        }
      }
    }
  }

`

const ToggleBtn = styled(Btn)`
  width: 60px;
  height: ${props => props.$size === 'large' ? '60px' : '50px'};
  position: absolute;
  right: 0;
  z-index: 21;
  & label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
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

const CheckBox = ({id, $size}) => {
  return (
    <>
      <ToggleInput id={id} type="checkbox"/>
      <ToggleBtn {...{$size}}>
        <label htmlFor={id}>
            <FontAwesomeIcon icon={faChevronDown}/>
        </label>
      </ToggleBtn>
    </>
  )
}

export const MobileNav = () => {
  return (
    <MobileMenuNav>
      <MobileMenu>
        <div>
          <li>
            <Link to="#">
              <MenuLink to="#" $large>新品上市</MenuLink>
            </Link>
          </li>
          <li>
            <CheckBox id="collection" $size='large' />
            <Link to="/collection">
              <MenuLink to="/collection" $large>商品一覽</MenuLink>
            </Link>
            <ul>
              <li>
                <CheckBox id="collection-men" />
                <Link to="/collection/men">
                  <MenuLink to="/collection/men" $medium>男裝</MenuLink>
                </Link>
                <ul>
                  <li>
                    <Link to="/collection/men/tops">
                      <MenuLink to="/collection/men/tops" $small>上衣類</MenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection/men/shirts">
                      <MenuLink to="/collection/men/shirts" $small>襯衫類</MenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection/men/knit">
                      <MenuLink to="/collection/men/knit" $small>針織衫 / 毛衣</MenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection/men/bottoms">
                      <MenuLink to="/collection/men/bottoms" $small>褲裝類</MenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection/men/outer">
                      <MenuLink to="/collection/men/outer" $small>外套類</MenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection/men/general">
                      <MenuLink to="/collection/men/general" $small>配件類</MenuLink>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <CheckBox id="collection-women" />
                <Link to="/collection/women">
                  <MenuLink to="/collection/women" $medium>女裝</MenuLink>
                </Link>
                <ul>
                  <li>
                    <Link to="/collection/women/tops">
                      <MenuLink to="/collection/women/tops" $small>上衣 / 襯衫</MenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection/women/knit">
                      <MenuLink to="/collection/women/knit" $small>針織衫 / 毛衣</MenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection/women/bottoms">
                      <MenuLink to="/collection/women/bottoms" $small>褲裝類</MenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection/women/skirts">
                      <MenuLink to="/collection/women/skirts" $small>裙子類</MenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection/women/one_piece">
                      <MenuLink to="/collection/women/one_piece" $small>洋裝類</MenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection/women/outer">
                      <MenuLink to="/collection/women/outer" $small>外套類</MenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection/women/general">
                      <MenuLink to="/collection/women/general" $small>配件類</MenuLink>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <CheckBox id="on-sale" $size='large' />
            <Link to="#">
              <MenuLink to="#" $large>特價專區</MenuLink>
            </Link>
            <ul>
              <li>
                <Link to="#">
                  <MenuLink to="#" $medium>秋冬女裝新品_7折起</MenuLink>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <MenuLink to="#" $medium>秋冬男裝新品_7折起</MenuLink>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <MenuLink to="#" $medium>春夏商品出清_3折起</MenuLink>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#">
              <MenuLink to="#" $large>關於我們</MenuLink>
            </Link>
          </li>
        </div>
        <div>
          <li>
            <Link to="#">
              <MenuLink to="#" $large>登入</MenuLink>
            </Link>
          </li>
          <li>
            <Link to="#">
              <MenuLink to="#" $large>願望清單</MenuLink>
            </Link>
          </li>
        </div>
      </MobileMenu>
    </MobileMenuNav>
  );
}

export const Nav = () => {
  return (
    <MenuNav>
      <Menu>
        <li>
          <MenuLink to="#">新品上市</MenuLink>
        </li>
        <li>
          <MenuLink to="/collection">商品一覽</MenuLink>
          <SubMenu>
            <SubMenuListFlex>
              <SubMenuTitle to="/collection/men">男裝</SubMenuTitle>
              <ul>
                <li>
                  <SubMenuLink to="/collection/men/tops">上衣類</SubMenuLink>
                </li>
                <li>
                  <SubMenuLink to="/collection/men/shirts">襯衫類</SubMenuLink>
                </li>
                <li>
                  <SubMenuLink to="/collection/men/knit">針織衫 / 毛衣</SubMenuLink>
                </li>
                <li>
                  <SubMenuLink to="/collection/men/bottoms">褲裝類</SubMenuLink>
                </li>
                <li>
                  <SubMenuLink to="/collection/men/outer">外套類</SubMenuLink>
                </li>
                <li>
                  <SubMenuLink to="/collection/men/general">配件類</SubMenuLink>
                </li>
              </ul>
            </SubMenuListFlex>
            <SubMenuListFlex>
              <SubMenuTitle to="/collection/women">女裝</SubMenuTitle>
              <ul>
                <li>
                  <SubMenuLink to="/collection/women/tops">上衣 / 襯衫</SubMenuLink>
                </li>
                <li>
                  <SubMenuLink to="/collection/women/knit">針織衫 / 毛衣</SubMenuLink>
                </li>
                <li>
                  <SubMenuLink to="/collection/women/bottoms">褲裝類</SubMenuLink>
                </li>
                <li>
                  <SubMenuLink to="/collection/women/skirts">裙子類</SubMenuLink>
                </li>
                <li>
                  <SubMenuLink to="/collection/women/one_piece">洋裝類</SubMenuLink>
                </li>
                <li>
                  <SubMenuLink to="/collection/women/outer">外套類</SubMenuLink>
                </li>
                <li>
                  <SubMenuLink to="/collection/women/general">配件類</SubMenuLink>
                </li>
              </ul>
            </SubMenuListFlex>
          </SubMenu>
        </li>
        <li>
          <MenuLink to="#">特價專區</MenuLink>
          <SubMenu>
            <SubMenuListBlock>
              <ul>
                <li>
                  <SubMenuLink to="#">秋冬女裝新品_7折起</SubMenuLink>
                </li>
                <li>
                  <SubMenuLink to="#">秋冬男裝新品_7折起</SubMenuLink>
                </li>
                <li>
                  <SubMenuLink to="#">春夏商品出清_3折起</SubMenuLink>
                </li>
              </ul>
            </SubMenuListBlock>
          </SubMenu>
        </li>
        <li>
          <MenuLink to="#">關於我們</MenuLink>
        </li>
      </Menu>
    </MenuNav>
  );
}