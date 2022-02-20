import { Link } from "react-router-dom"
import { useContext } from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import { MEDIA_QUERY } from "../../constants/style"

import { LocationContext } from "./ListPage"


const PageContainer = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  & button + button {
    margin-left: 5px;
  }
`

const PageBtn = styled.button`
  width: 30px;
  height: 30px;
  transition: .2s;
  box-shadow: 1px 0px 5px ${props => props.theme.color.lightGrey}5;
  background-color: ${props => props.$selected ? props.theme.color.lightGrey : props.theme.color.white};
  &:hover {
    background-color: ${props => props.theme.color.black};
    & a, svg {
        color: ${props => props.theme.color.white};
    }
  }
  position: relative;
  & a {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    line-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: ${props => props.theme.fontWeight.xl};
    color: ${props => props.$selected ? props.theme.color.white : props.theme.color.black};
  }
`

const Result = styled.div`
    ${MEDIA_QUERY.s} {
        opacity: 0;
    }
`

const PageSelect = ({ page }) => {

    const { pathname, search } = useContext(LocationContext);
    const newSearch = new URLSearchParams(search);
    const currentPage = parseInt(newSearch.get('page')) || 1;

    newSearch.set('page', page)
    const selected = (currentPage === page) ? true : false

    const url = `${pathname}?${newSearch}`

    return (
        <PageBtn $selected={selected}>
            <Link to={url}>{page}</Link>
        </PageBtn>
    )
}

const Page = ({ page_count }) => {

    const { pathname, search } = useContext(LocationContext);
    const newSearch = new URLSearchParams(search);
    const currentPage = parseInt(newSearch.get('page')) || 1;

    let n = 1
    const arr = []
    while (n <= page_count) {
        arr.push(n)
        n++
    }

    if (currentPage !== arr[0]) {
        newSearch.set('page', currentPage - 1)
    }
    if (currentPage !== arr[arr.length - 1]) {
        newSearch.set('page', currentPage + 1)
    }

    const url = `${pathname}?${newSearch}`

    return (
        <PageContainer>
            {arr.length > 0 && (currentPage !== arr[0]) && (
                <PageBtn>
                    <Link to={url}>
                        <FontAwesomeIcon icon={faChevronDown} transform={{ rotate: 90 }} />
                    </Link>
                </PageBtn>
            )}
            {arr.map(page => (
                <PageSelect
                    key={page}
                    page={page}
                />
            ))}
            {arr.length > 0 && (currentPage !== arr[arr.length - 1]) && (
                <PageBtn>
                    <Link to={url}>
                        <FontAwesomeIcon icon={faChevronDown} transform={{ rotate: -90 }} />
                    </Link>
                </PageBtn>
            )}
        </PageContainer>
    )
}

export const Pagination = ({ products }) => {

    const { count, per_page, page, page_count } = products;

    const number_start = page ? (page - 1) * per_page + 1 : 0
    const number_end = !page ? 0 : (page === page_count) ? (
        number_start + count - (page - 1) * per_page - 1
    ) : (
        number_start + per_page - 1
    )

    return (
        <>
            <Result>
                <p>{number_start} ~ {number_end}，共 {count} 筆資料</p>
            </Result>
            <Page {...{ page_count }} />
        </>
    )
}