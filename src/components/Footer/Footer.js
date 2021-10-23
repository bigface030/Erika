import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Logo } from '../Logo'
import { LinkItem } from '../LinkItem'
import {
  FooterWrapper,
  FooterContainer,
  FooterLeft,
  FooterRight,
  Btn,
  BtnGroup,
  LinkedSection,
  BottomWrapper,
  BottomContainer,
} from './style'


export default function Footer() {
  // const style = {
  //   position: "absolute",
  //   bottom: "0",
  //   left: "0",
  //   right: "0",
  //   zIndex: "-10"
  // }
  return (
    <footer>
      <FooterWrapper>
        <FooterContainer>
          <FooterRight>
            <Logo/>
            <BtnGroup>
              <Btn>
                <Link to="#"><FontAwesomeIcon icon={['fab', 'facebook']}/></Link>
              </Btn>
              <Btn>
                <Link to="#"><FontAwesomeIcon icon={['fab', 'instagram']}/></Link>
              </Btn>
              <Btn>
                <Link to="#"><FontAwesomeIcon icon={['fab', 'twitter']}/></Link>
              </Btn>
            </BtnGroup>
          </FooterRight>
          <FooterLeft>
            <LinkedSection>
              <h4><LinkItem to="#" name="會員中心"/></h4>
              <ul>
                <li><LinkItem to="#" name="會員資料管理"/></li>
                <li><LinkItem to="#" name="歷史訂單"/></li>
                <li><LinkItem to="#" name="願望清單"/></li>
              </ul>
            </LinkedSection>
            <LinkedSection>
              <h4><LinkItem to="#" name="關於我們"/></h4>
              <ul>
                <li><LinkItem to="#" name="隱私權條款"/></li>
                <li><LinkItem to="#" name="免責聲明"/></li>
                <li><LinkItem to="#" name="退貨政策"/></li>
                <li><LinkItem to="#" name="FAQ"/></li>
              </ul>
            </LinkedSection>
          </FooterLeft>
        </FooterContainer>
      </FooterWrapper>
      <BottomWrapper>
        <BottomContainer>
          <p>Copyright © 2021 TPdidilong All Rights Reserved</p>
        </BottomContainer>
      </BottomWrapper>
    </footer>
  );
}