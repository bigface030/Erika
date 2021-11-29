import styled from "styled-components"
import { theme } from "./theme"

export const MEDIA_QUERY = {
    l: "@media (max-width: 1366px)",
    main: "@media (max-width: 1024px)",
    m: "@media (max-width: 768px)",
    s: "@media (max-width: 512px)",
    xs: "@media (max-width: 256px)",
}

export const LinkedUL = styled.ul`
    & a {
        display: block;
        color: ${theme.color.black};
        & span::after {
            content: '';
            display: block;
            width: 0%;
            height: 2px;
            background-color: ${theme.color.black};
            transition: width .4s;
        }
        &:hover span::after {
            width: 100%
        }
    }
`

export const H2 = styled.h2`
    font-size: ${theme.fontSize.h2};
    font-weight: ${theme.fontWeight.xl};
    color: ${theme.color.black};
    line-height: 2em;
`

export const H3 = styled.h3`
    font-size: ${theme.fontSize.h3};
    font-weight: ${theme.fontWeight.xl};
    color: ${theme.color.black};
    line-height: 1.5em;
`

export const H4 = styled.h4`
    font-size: ${theme.fontSize.h4};
    font-weight: ${theme.fontWeight.l};
    color: ${theme.color.black};
    line-height: 1.5em;
`

export const P = styled.p`
    font-size: ${theme.fontSize.bodyLarge};
    font-weight: ${theme.fontWeight.l};
    color: ${theme.color.black};
    line-height: 1.5em;
`

export const Span = styled.span`
    font-size: ${theme.fontSize.body};
    font-weight: ${theme.fontWeight.m};
    color: ${theme.color.black};
    line-height: 1.5em;
`

export const Btn = styled.button`
    & svg {
        font-size: ${theme.fontSize.svg};
        color: ${theme.color.lightGrey};
        transition: .2s;
    }
    &:hover svg {
        cursor: pointer;
        color: ${theme.color.grey};
    }
`

export const PageWrapper = styled.div``
export const PageContainer = styled.div`
  width: 90%;
  ${MEDIA_QUERY.s} {
    width: 100%;
  }
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
`