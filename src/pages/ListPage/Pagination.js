import { Link } from "react-router-dom";
import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import { MEDIA_QUERY } from "../../constants/style"
import { Span } from "../../constants/style"



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
    & span, svg {
      color: ${props => props.theme.color.white};
    }
  }
  & svg {
    margin: 0 auto;
    font-size: ${props => props.theme.fontSize.body};
    color: ${props => props.theme.color.black};
    display: block;
  }
  & span {
    font-weight: ${props => props.theme.fontWeight.xl};
    color: ${props => props.$selected && props.theme.color.white};
    display: block;
  }
`

const Result = styled.div`
    ${MEDIA_QUERY.s} {
        opacity: 0;
    }
`

const PageSelect = ({page, path, search}) => {

    const newSearch = new URLSearchParams(search);
    const currentPage = newSearch.get('page');
    let selected = false;

    if(currentPage){
        if(parseInt(currentPage) === page){
            selected = true;
        }
        newSearch.set('page', page)
    }else{
        if(page === 1){
            selected = true;
        }
        newSearch.append('page', page)
    }

    const url = `${path}?${newSearch}`

    return (
        <PageBtn $selected={selected}>
            <Link to={url}><Span>{page}</Span></Link>
        </PageBtn>
    )
}

const Page = ({page_count, path, search}) => {

    let n = 1
    const arr = []
    while (n<=page_count){
        arr.push(n)
        n++
    }
  
    const newSearch = new URLSearchParams(search);
    const currentPage = parseInt(newSearch.get('page')) || 1;
  
    if(currentPage !== arr[0]){
        newSearch.set('page', currentPage-1)
    }
    if(currentPage !== arr[arr.length-1]){
        if(newSearch.has('page')){
            newSearch.set('page', currentPage+1)
        }else{
            newSearch.append('page', 2)
        }
    }

    const url = `${path}?${newSearch}`
  
    return (
        <PageContainer>
            {(currentPage !== arr[0]) && (
                <PageBtn>
                    <Link to={url}>
                        <FontAwesomeIcon icon={faChevronDown} transform={{ rotate: 90 }}/>
                    </Link>
                </PageBtn>
            )}
            {arr.map(page => (
                <PageSelect {...{page, path, search}} />
            ))}
            {(currentPage !== arr[arr.length-1]) && (
                <PageBtn>
                    <Link to={url}>
                        <FontAwesomeIcon icon={faChevronDown} transform={{ rotate: -90 }}/>
                    </Link>
                </PageBtn>
            )}
        </PageContainer>
    )
}

export const Pagination = ({data, pathname, search}) => {

    const { page, per_page, total_count, page_count } = data;

    const number_start = (page - 1) * per_page + 1
    const number_end = (page === page_count) ? (
        number_start + total_count - (page - 1) * per_page - 1
    ) : (
        number_start + per_page - 1
    )

    return (
        <>
            <Result>
                <p>{number_start} ~ {number_end}，共 {total_count} 筆資料</p>
            </Result>
            <Page 
                path={pathname} 
                search={search} 
                page_count={page_count} 
            />
        </>
    )
}