import { Link } from "react-router-dom";
import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MEDIA_QUERY, Btn, LinkedUL, H5 } from "../../constants/style"

import { Logo } from '../Logo'
import { LinkItem } from '../LinkItem'



const FooterWrapper = styled.div`
  background-color: #eee5;
`

const FooterContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  ${MEDIA_QUERY.s} {
    display: block;
  }
`

const BottomWrapper = styled.div`
  background-color: #222;
`

const BottomContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  & h5 {
    text-align: center;
    color: ${props => props.theme.color.white};
    padding: 10px 0;
  }
`

const FooterLeft = styled(LinkedUL)`
  display: flex;
  justify-content: center;
  ${MEDIA_QUERY.xs} {
    display: block;
  }
`

const FooterRight = styled.div``

const LinkBtn = styled(Btn)``

const LinkBtnGroup = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  & button + button {
    margin-left: 20px;
  }
`

const LinkedList = styled.li`
  & + li {
    margin-left: 40px;
  }
  ${MEDIA_QUERY.xs} {
    & + li {
      margin: 0;
    }
  }

  & > a {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    display: flex;
    & > h4 {
      font-weight: ${props => props.theme.fontWeight.xl};
      padding: 5px 5px;
    }
  }
  & > ul {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    & > li {
      & p {
        padding: 5px 5px;
      }
    }
  }
`

export default function Footer() {

  return (
    <footer>
      <FooterWrapper>
        <FooterContainer>
          <FooterRight>
            <Logo/>
            <LinkBtnGroup>
              <LinkBtn>
                <Link to="#"><FontAwesomeIcon icon={['fab', 'facebook']}/></Link>
              </LinkBtn>
              <LinkBtn>
                <Link to="#"><FontAwesomeIcon icon={['fab', 'instagram']}/></Link>
              </LinkBtn>
              <LinkBtn>
                <Link to="#"><FontAwesomeIcon icon={['fab', 'twitter']}/></Link>
              </LinkBtn>
            </LinkBtnGroup>
          </FooterRight>
          <FooterLeft>
            <LinkedList>
              <LinkItem to="#" name="會員中心" size="H4" />
              <ul>
                <li><LinkItem to="#" name="會員資料管理" size="P" /></li>
                <li><LinkItem to="#" name="歷史訂單" size="P" /></li>
                <li><LinkItem to="#" name="願望清單" size="P" /></li>
              </ul>
            </LinkedList>
            <LinkedList>
              <LinkItem to="#" name="關於我們" size="H4" />
              <ul>
                <li><LinkItem to="#" name="隱私權條款" size="P" /></li>
                <li><LinkItem to="#" name="免責聲明" size="P" /></li>
                <li><LinkItem to="#" name="退貨政策" size="P" /></li>
                <li><LinkItem to="#" name="FAQ" size="P" /></li>
              </ul>
            </LinkedList>
          </FooterLeft>
        </FooterContainer>
      </FooterWrapper>
      <BottomWrapper>
        <BottomContainer>
          <H5>Copyright © 2021 TPdidilong All Rights Reserved</H5>
        </BottomContainer>
      </BottomWrapper>
    </footer>
  );
}