import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Logo } from '../Logo'
import {
  HeaderWrapper, 
  HeaderContainer, 
  HeaderLeft, 
  HeaderRight, 
  MenuBtnGroup, 
  MenuBtn, 
  BurgerBtn,
  BurgerInput,
} from './style'
import MobileNav from './MobileNav'
import Nav from './Nav'

export default function Header() {
  const style = {
    height: "70px",
    position: "relative",
    zIndex: "1000"
  }
  return (
    <header style={style}>
      <HeaderWrapper>
        <HeaderContainer>
          <HeaderLeft>
            <BurgerInput id="nav" type="checkbox"/>
            <BurgerBtn>
              <label htmlFor="nav">
                  <FontAwesomeIcon icon={faBars}/>
              </label>
            </BurgerBtn>
            <MobileNav/>
            <Logo/>
            <Nav/>
          </HeaderLeft>
          <Logo/>
          <HeaderRight>
            <MenuBtnGroup>
              <MenuBtn>
                <Link to="#"><FontAwesomeIcon icon={faUser}/></Link>
              </MenuBtn>
              <MenuBtn>
                <Link to="#"><FontAwesomeIcon icon={faHeart}/></Link>
              </MenuBtn>
              <MenuBtn $fixed>
                <Link to="#"><FontAwesomeIcon icon={faShoppingCart}/></Link>
              </MenuBtn>
            </MenuBtnGroup>
          </HeaderRight>
        </HeaderContainer>
      </HeaderWrapper>
    </header>
  );
}