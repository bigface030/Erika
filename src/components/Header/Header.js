import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Logo } from '../Logo'
import {
  HeaderWrapper, 
  HeaderContainer, 
  HeaderLeft, 
  HeaderRight, 
  BtnGroup, 
  MenuBtn, 
  BurgerBtn,
  BurgerInput,
} from './style'
import MobileNav from './MobileNav'
import Nav from './Nav'

export default function Header() {
  const style = {
    height: "70px",
  }
  return (
    <header style={style}>
      <HeaderWrapper>
        <HeaderContainer>
          <HeaderLeft>
            <BurgerInput id="nav" type="checkbox"/>
            <label htmlFor="nav">
              <BurgerBtn>
                <FontAwesomeIcon icon={faBars}/>
              </BurgerBtn>
            </label>
            <MobileNav/>
            <Logo/>
            <Nav/>
          </HeaderLeft>
          <Logo/>
          <HeaderRight>
            <BtnGroup>
              <MenuBtn>
                <Link to="#"><FontAwesomeIcon icon={faUser}/></Link>
              </MenuBtn>
              <MenuBtn>
                <Link to="#"><FontAwesomeIcon icon={faHeart}/></Link>
              </MenuBtn>
              <MenuBtn>
                <Link to="#"><FontAwesomeIcon icon={faShoppingCart}/></Link>
              </MenuBtn>
            </BtnGroup>
          </HeaderRight>
        </HeaderContainer>
      </HeaderWrapper>
    </header>
  );
}