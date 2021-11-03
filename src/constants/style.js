import styled from "styled-components"
import { theme } from "./theme"

export const MEDIA_QUERY = {
    main: "@media (max-width: 1024px)",
    m: "@media (max-width: 768px)",
    footer: "@media (max-width: 512px)",
    xs: "@media (max-width: 256px)",
}

export const LinkedUL = styled.ul`
    & a {
        display: block;
        text-decoration: none;
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
    font-weight: ${theme.fontWeight.m};
    color: ${theme.color.black};
    line-height: 1.5em;
`