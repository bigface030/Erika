import { HashRouter as Router, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronDown, faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import logo from '../../Logo.png'
import {
  HeaderWrapper, 
  HeaderContainer, 
  HeaderLeft, 
  HeaderRight, 
  Logo, 
  Menu, 
  SubMenu, 
  SubMenuListFlex, 
  SubMenuListBlock, 
  MobileMenu, 
  BtnGroup, 
  Btn, 
  MenuBtn, 
  BurgerBtn,
  ToggleBtn,
  Input,
  BurgerInput,
  MobileMenuNav,
  MenuNav,
  Mask
} from './style'



export default function Header() {
  return (
    <Router>
      <header>
        <HeaderWrapper>
          <HeaderContainer>
            <HeaderLeft>
              <BurgerInput id="checkbox11" type="checkbox"/>
              <label htmlFor="checkbox11">
                <Mask/>
              </label>
              <label htmlFor="checkbox11">
                <BurgerBtn>
                  <FontAwesomeIcon icon={faBars}/>
                </BurgerBtn>
              </label>
              <MobileMenuNav>
                <MobileMenu>
                  <div>
                    <li><Link to="#"><span>新品上市</span></Link></li>
                    <li>
                      <Input id="checkbox1" type="checkbox"/>
                      <label htmlFor="checkbox1">
                        <ToggleBtn>
                          <FontAwesomeIcon icon={faChevronDown}/>
                        </ToggleBtn>
                      </label>
                      <Link to="#"><span>商品一覽</span></Link>
                      <ul>
                        <li>
                          <Input id="checkbox2" type="checkbox"/>
                          <label htmlFor="checkbox2">
                            <ToggleBtn>
                              <FontAwesomeIcon icon={faChevronDown}/>
                            </ToggleBtn>
                          </label>
                          <Link to="#"><span>男裝</span></Link>
                          <ul>
                            <li><Link to="#"><span>上衣類</span></Link></li>
                            <li><Link to="#"><span>襯衫類</span></Link></li>
                            <li><Link to="#"><span>針織衫 / 毛衣</span></Link></li>
                            <li><Link to="#"><span>褲裝類</span></Link></li>
                            <li><Link to="#"><span>外套類</span></Link></li>
                            <li><Link to="#"><span>鞋類</span></Link></li>
                            <li><Link to="#"><span>配件類</span></Link></li>
                          </ul>
                        </li>
                        <li>
                          <Input id="checkbox3" type="checkbox"/>
                          <label htmlFor="checkbox3">
                            <ToggleBtn>
                              <FontAwesomeIcon icon={faChevronDown}/>
                            </ToggleBtn>
                          </label>
                          <Link to="#"><span>女裝</span></Link>
                          <ul>
                            <li><Link to="#"><span>上衣 / 襯衫</span></Link></li>
                            <li><Link to="#"><span>針織衫 / 毛衣</span></Link></li>
                            <li><Link to="#"><span>褲裝類</span></Link></li>
                            <li><Link to="#"><span>裙子類</span></Link></li>
                            <li><Link to="#"><span>洋裝類</span></Link></li>
                            <li><Link to="#"><span>外套類</span></Link></li>
                            <li><Link to="#"><span>鞋類</span></Link></li>
                            <li><Link to="#"><span>配件類</span></Link></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Input id="checkbox4" type="checkbox"/>
                      <label htmlFor="checkbox4">
                        <ToggleBtn>
                          <FontAwesomeIcon icon={faChevronDown}/>
                        </ToggleBtn>
                      </label>
                      <Link to="#"><span>特價專區</span></Link>
                      <ul>
                        <li><Link to="#"><span>秋冬女裝新品_7折起</span></Link></li>
                        <li><Link to="#"><span>秋冬男裝新品_7折起</span></Link></li>
                        <li><Link to="#"><span>春夏商品出清_3折起</span></Link></li>
                      </ul>
                    </li>
                    <li><Link to="#"><span>關於我們</span></Link></li>
                  </div>
                  <div>
                    <li><Link to="#"><span>登入</span></Link></li>
                    <li><Link to="#"><span>願望清單</span></Link></li>
                  </div>
                </MobileMenu>
              </MobileMenuNav>
              <Logo>
                <Link to="/">
                  <img src={logo} width="240px" alt="logo"/>
                </Link>
              </Logo>
              <MenuNav>
                <Menu>
                  <li><Link to="#"><span>新品上市</span></Link></li>
                  <li>
                    <Link to="#"><span>商品一覽</span></Link>
                    <SubMenu>
                      <SubMenuListFlex>
                        <h4><Link to="#"><span>男裝</span></Link></h4>
                        <ul>
                          <li><Link to="#"><span>上衣類</span></Link></li>
                          <li><Link to="#"><span>襯衫類</span></Link></li>
                          <li><Link to="#"><span>針織衫 / 毛衣</span></Link></li>
                          <li><Link to="#"><span>褲裝類</span></Link></li>
                          <li><Link to="#"><span>外套類</span></Link></li>
                          <li><Link to="#"><span>鞋類</span></Link></li>
                          <li><Link to="#"><span>配件類</span></Link></li>
                        </ul>
                      </SubMenuListFlex>
                      <SubMenuListFlex>
                        <h4><Link to="#"><span>女裝</span></Link></h4>
                        <ul>
                          <li><Link to="#"><span>上衣 / 襯衫</span></Link></li>
                          <li><Link to="#"><span>針織衫 / 毛衣</span></Link></li>
                          <li><Link to="#"><span>褲裝類</span></Link></li>
                          <li><Link to="#"><span>裙子類</span></Link></li>
                          <li><Link to="#"><span>洋裝類</span></Link></li>
                          <li><Link to="#"><span>外套類</span></Link></li>
                          <li><Link to="#"><span>鞋類</span></Link></li>
                          <li><Link to="#"><span>配件類</span></Link></li>
                        </ul>
                      </SubMenuListFlex>
                    </SubMenu>
                  </li>
                  <li>
                    <Link to="#"><span>特價專區</span></Link>
                    <SubMenu>
                      <SubMenuListBlock>
                        <ul>
                          <li><Link to="#"><span>秋冬女裝新品_7折起</span></Link></li>
                          <li><Link to="#"><span>秋冬男裝新品_7折起</span></Link></li>
                          <li><Link to="#"><span>春夏商品出清_3折起</span></Link></li>
                        </ul>
                      </SubMenuListBlock>
                    </SubMenu>
                  </li>
                  <li><Link to="#"><span>關於我們</span></Link></li>
                </Menu>
              </MenuNav>
            </HeaderLeft>
            <Logo>
              <Link to="/">
                <img src={logo} width="240px" alt="logo"/>
              </Link>
            </Logo>
            <HeaderRight>
              <BtnGroup>
                <MenuBtn>
                  <Link to="#"><FontAwesomeIcon icon={faUser}/></Link>
                </MenuBtn>
                <MenuBtn>
                  <Link to="#"><FontAwesomeIcon icon={faHeart}/></Link>
                </MenuBtn>
                <Btn>
                  <Link to="#"><FontAwesomeIcon icon={faShoppingCart}/></Link>
                </Btn>
              </BtnGroup>
            </HeaderRight>
          </HeaderContainer>
        </HeaderWrapper>
      </header>
    </Router>
  );
}