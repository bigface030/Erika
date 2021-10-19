import styled from "styled-components"
import { theme } from "./theme"

export const MEDIA_QUERY = {
    main: "@media (max-width: 1024px)",
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