import styled from "styled-components";
import { Switch, Route, Link, useRouteMatch, useLocation } from "react-router-dom"

import { H3 } from "../../../constants/style";

import { Information } from "./Information";
import { Quantity } from "./Quantity";
import { Price } from "./Price";
import AddProduct from "./AddProduct";


const MainContainer = styled.main`
    width: 70%;
    flex-grow: 1;
    & h3 {
        padding: 10px;
    }
    & a {
        color: ${props => props.theme.color.black};
    }
`

export default function AdminProductPage () {

    const { path, url } = useRouteMatch();
    const { pathname } = useLocation();

    return (
        <>
            {path === pathname && (
                <MainContainer>
                    <H3>
                        <Link to={`${url}/information`}>新增及管理產品資訊</Link>
                    </H3>
                    <H3>
                        <Link to={`${url}/quantity`}>管理存貨數量與紀錄</Link>
                    </H3>
                    <H3>
                        <Link to={`${url}/price`}>管理商品價格與紀錄</Link>
                    </H3>
                </MainContainer>
            )}
            <Switch>
                <Route path={`${path}/information`}>
                    <Information />
                </Route>
                <Route path={`${path}/quantity`}>
                    <Quantity />
                </Route>
                <Route path={`${path}/price`}>
                    <Price />
                </Route>
                <Route path={`${path}/new`}>
                    <AddProduct />
                </Route>
                <Route path={`${path}/edit/:id`}>
                    <AddProduct />
                </Route>
            </Switch>
        </>
    )
}