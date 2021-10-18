import styled from 'styled-components'
// import './reset.css'
import { HashRouter as Router, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import logo from '../../Logo.png'

const HeaderWrapper = styled.div`
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 1px 0px 5px #aaa;
`

const HeaderContainer = styled.div`
  width: 90%;
  height: 70px;
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
    @media (max-width: 1024px) {
      display: block;
    }
  }
`

const HeaderLeft = styled.div`
  position: relative;
  & > div:first-child {
    display: none;
    @media (max-width: 1024px) {
      display: block;
    }
  }
  @media (max-width: 1024px) {
    & h1, ul {
      display: none;
    }
  }
`

const HeaderRight = styled.div`
`

const Logo = styled.h1`
  display: block;
  height: 70px;
  & img {
    vertical-align: middle;
  }
`

const Menu = styled.ul`
  margin: 0 20px;
  display: flex;
  & a {
    display: block;
    text-decoration: none;
    color: #333;
    & span::after {
      content: '';
      display: block;
      width: 0%;
      height: 2px;
      background-color: #333;
      transition: width .4s;
    }
    &:hover span::after {
      width: 100%
    }
  }

  & > li {
    margin: 0 5px;
    padding: 16px 0;
    position: relative;
    & > a {
      font-size: 18px;
      font-weight: 500;
      padding: 0 10px;
      line-height: 2em;
    }
    &:hover > div {
      display: flex;
    }
  }
`

const SubMenu = styled.div`
  position: absolute;
  top: 71px;
  display: none;
  box-shadow: 1px 1px 5px #aaa;
  & > div {
    margin: 20px 30px;
    & h4 {
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      display: flex;
      & > a {
        font-size: 18px;
        font-weight: 700;
        padding: 5px 5px;
      }
    }
    & ul {
      & > li {
        & > a {
          font-size: 16px;
          font-weight: 500;
          padding: 5px 5px;
          line-height: 1.5em;
        }
      }
    }
  }
`

const ListContainerM = styled.div`
  width: 240px;
  & ul {
    max-height: 150px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
  }
`

const ListContainerS = styled.div`
  width: 180px;
  & ul {
    text-align: center;
    & li {
      display: inline-block;
    }
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 160px;
  & div + div {
    margin-left: 30px;
  }
`

const Button = styled.div`
  & > a {
    font-size: 28px;
    & > svg {
      color: #aaa;
      transition: .2s;
      &:hover {
        color: #555;
      }
    }
  }
`

const MenuButton = styled(Button)`
  @media (max-width: 1024px) {
    display: none;
  }
`

export default function Header() {
  return (
    <Router>
      <header>
        <HeaderWrapper>
          <HeaderContainer>
            <HeaderLeft>
              <Button>
                <Link to="#"><FontAwesomeIcon icon={faBars}/></Link>
              </Button>
              <Logo>
                <Link to="/">
                  <img src={logo} width="240px" alt="logo"/>
                </Link>
              </Logo>
              <nav>
                <Menu>
                  <li><Link to="#"><span>新品上市</span></Link></li>
                  <li>
                    <Link to="#"><span>商品一覽</span></Link>
                    <SubMenu>
                      <ListContainerM>
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
                      </ListContainerM>
                      <ListContainerM>
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
                      </ListContainerM>
                    </SubMenu>
                  </li>
                  <li>
                    <Link to="#"><span>特價專區</span></Link>
                    <SubMenu>
                      <ListContainerS>
                        <ul>
                          <li><Link to="#"><span>秋冬女裝新品_7折起</span></Link></li>
                          <li><Link to="#"><span>秋冬男裝新品_7折起</span></Link></li>
                          <li><Link to="#"><span>春夏商品出清_3折起</span></Link></li>
                        </ul>
                      </ListContainerS>
                    </SubMenu>
                  </li>
                  <li><Link to="#"><span>關於我們</span></Link></li>
                </Menu>
              </nav>
            </HeaderLeft>
            <Logo>
              <Link to="/">
                <img src={logo} width="240px" alt="logo"/>
              </Link>
            </Logo>
            <HeaderRight>
              <ButtonGroup>
                <MenuButton>
                  <Link to="#"><FontAwesomeIcon icon={faUser}/></Link>
                </MenuButton>
                <MenuButton>
                  <Link to="#"><FontAwesomeIcon icon={faHeart}/></Link>
                </MenuButton>
                <Button>
                  <Link to="#"><FontAwesomeIcon icon={faShoppingCart}/></Link>
                </Button>
              </ButtonGroup>
            </HeaderRight>
          </HeaderContainer>
        </HeaderWrapper>
      </header>
    </Router>
  );
}