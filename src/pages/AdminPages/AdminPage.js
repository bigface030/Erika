import { Link } from "react-router-dom";
import styled from "styled-components";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom"

import { CrumbNav } from "../../components/CrumbNav";
import { H4, LinkedTag, MEDIA_QUERY, P, PageContainer, PageWrapper } from "../../constants/style";

import AdminProductPage from "./AdminProductPage";


const AsideContainer = styled.aside`
    width: 20%;
    min-width: 250px;

    & > div {
        z-index: 1;
        margin: 10px;
        background-color: ${props => props.theme.color.white};
    }

    ${MEDIA_QUERY.main} {
        position: fixed;
        left: -240px;
        z-index: 200;
        transition: .3s;
    }

`

const AsideBlock = styled.div`
    border: 1px solid ${props => props.theme.color.lightGrey}8;
    & > h4 {
        padding: 10px 15px;
        font-weight: ${props => props.theme.fontWeight.xl};
        background-color: #eee;
    }
    & > div {
        padding: 5px 15px;
    }
`

const AsideContent = styled(P)`
    ${LinkedTag}
    line-height: 2em;
    padding: ${props => props.$active ? '5px 0 7px' : '5px 0'};
    font-weight: ${props => props.$active && props.theme.fontWeight.xl};
    display: inline-block;
    & > a {
        color: ${props => props.theme.color.black};
    }
`



export default function AdminPage () {

    let { path, url } = useRouteMatch();

    const { pathname } = useLocation();
    const subPath = pathname.split('/').slice(2, 4)
    const pathArr = ['', 'admin']
    if(subPath) subPath.map(path => pathArr.push(path))


    return (
        <>
            <CrumbNav pathArr={pathArr} />
            <PageWrapper>
                <PageContainer>
                    <AsideContainer>
                        <AsideBlock>
                            <H4>商品管理</H4>
                            <div>
                                <AsideContent $active={subPath[1] === 'information'}>
                                    {subPath[1] === 'information' ? (
                                        <>新增及管理產品資訊</>
                                    ) : (
                                        <Link to={`${url}/product/information`}>新增及管理產品資訊</Link>
                                    )}
                                </AsideContent>
                                <AsideContent $active={subPath[1] === 'quantity'}>
                                    {subPath[1] === 'quantity' ? (
                                        <>管理存貨數量與紀錄</>
                                    ) : (
                                        <Link to={`${url}/product/quantity`}>管理存貨數量與紀錄</Link>
                                    )}
                                </AsideContent>
                                <AsideContent $active={subPath[1] === 'price'}>
                                    {subPath[1] === 'price' ? (
                                        <>管理商品價格與紀錄</>
                                    ) : (
                                        <Link to={`${url}/product/price`}>管理商品價格與紀錄</Link>
                                    )}
                                </AsideContent>
                            </div>
                        </AsideBlock>
                        <AsideBlock>
                            <H4>訂單管理</H4>
                            <div>
                                <AsideContent $active={subPath[0] === 'order'}>
                                    {subPath[0] === 'order' ? (
                                        <>管理所有訂單</>
                                    ) : (
                                        <Link to={`${url}/order`}>管理所有訂單</Link>
                                    )}
                                </AsideContent>
                            </div>
                        </AsideBlock>
                        <AsideBlock>
                            <H4>用戶管理</H4>
                            <div>
                                <AsideContent $active={subPath[0] === 'user'}>
                                    {subPath[0] === 'user' ? (
                                        <>管理所有用戶</>
                                    ) : (
                                        <Link to={`${url}/user`}>管理所有用戶</Link>
                                    )}
                                </AsideContent>
                            </div>
                        </AsideBlock>
                    </AsideContainer>

                    <Switch>
                        <Route path={`${path}/product`}>
                            <AdminProductPage />
                        </Route>
                        {/* <Route path={`${path}/order`}>
                            <AdminProductPage />
                        </Route>
                        <Route path={`${path}/user`}>
                            <AdminProductPage />
                        </Route> */}
                    </Switch>

                </PageContainer>
            </PageWrapper>
        </>
    )
}