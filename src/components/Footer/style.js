import styled from "styled-components"
import { MEDIA_QUERY, Btn } from "../../constants/style"

export const FooterWrapper = styled.div`
  background-color: #eee5;
`

export const FooterContainer = styled.div`
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

export const BottomWrapper = styled.div`
  background-color: #222;
`

export const BottomContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  & p {
    text-align: center;
    font-size: ${props => props.theme.fontSize.bodySmall};
    font-weight: ${props => props.theme.fontWeight.s};
    color: ${props => props.theme.color.white};
    line-height: 1.5em;
    padding: 10px 0;
  }
`

export const FooterLeft = styled.div`
  display: flex;
  justify-content: center;
  ${MEDIA_QUERY.xs} {
    display: block;
  }
`

export const FooterRight = styled.div``

export const LinkBtn = styled(Btn)``

export const LinkBtnGroup = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  & button + button {
    margin-left: 20px;
  }
`

export const LinkedSection = styled.section`
  & + section {
    margin-left: 40px;
  }
  ${MEDIA_QUERY.xs} {
    & + section {
      margin: 0;
    }
  }
  & a {
    display: block;
    text-decoration: none;
    color: ${props => props.theme.color.black};
    & span::after {
      content: '';
      display: block;
      width: 0%;
      height: 2px;
      background-color: ${props => props.theme.color.black};
      transition: width .4s;
    }
    &:hover span::after {
      width: 100%
    }
  }
  & > h4 {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    display: flex;
    & > a {
      font-size: ${props => props.theme.fontSize.h4};
      font-weight: ${props => props.theme.fontWeight.xl};
      color: ${props => props.theme.color.black};
      padding: 5px 5px;
      line-height: 1.5em;
    }
  }
  & > ul {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    & > li {
      & > a {
        font-size: ${props => props.theme.fontSize.bodyLarge};
        font-weight: ${props => props.theme.fontWeight.l};
        color: ${props => props.theme.color.black};
        padding: 5px 5px;
        line-height: 1.5em;
      }
    }
  }
`