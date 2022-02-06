import { Link } from "react-router-dom";
import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MEDIA_QUERY, Btn, H5, fontTheme, LinkedTag } from "../../constants/style"

import { Logo } from '../Logo'


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

const FooterLeft = styled.ul`
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

  & > ul {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  & a {
    color: ${props => props.theme.color.black};
  }

  ${LinkedTag}
`

const ListTitle = styled(Link)`
  ${fontTheme.h4}
  font-weight: ${props => props.theme.fontWeight.xl};
  display: inline-block;
  padding: 15px 5px;
  border-bottom: 1px solid #ddd;
`

const ListItem = styled(Link)`
  ${fontTheme.p}
  display: inline-block;
  padding: 5px 5px;
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
                <Link to="#">
                  <FontAwesomeIcon icon={['fab', 'facebook']}/>
                </Link>
              </LinkBtn>
              <LinkBtn>
                <Link to="#">
                  <FontAwesomeIcon icon={['fab', 'instagram']}/>
                </Link>
              </LinkBtn>
              <LinkBtn>
                <Link to="#">
                  <FontAwesomeIcon icon={['fab', 'twitter']}/>
                </Link>
              </LinkBtn>
            </LinkBtnGroup>
          </FooterRight>
          <FooterLeft>
            <LinkedList>
              <ListTitle to="#">會員中心</ListTitle>
              <ul>
                <li>
                  <ListItem to="#">會員資料管理</ListItem>
                </li>
                <li>
                  <ListItem to="#">歷史訂單</ListItem>
                </li>
                <li>
                  <ListItem to="#">願望清單</ListItem>
                </li>
              </ul>
            </LinkedList>
            <LinkedList>
              <ListTitle to="#">關於我們</ListTitle>
              <ul>
                <li>
                  <ListItem to="#">隱私權條款</ListItem>
                </li>
                <li>
                  <ListItem to="#">免責聲明</ListItem>
                </li>
                <li>
                  <ListItem to="#">退貨政策</ListItem>
                </li>
                <li>
                  <ListItem to="#">FAQ</ListItem>
                </li>
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