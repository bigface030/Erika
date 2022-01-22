import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import ScrollRestoration from 'react-scroll-restoration'
import styled from "styled-components"

import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ListPage from './pages/ListPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import AdminProductPage from './pages/AdminPages/AdminProductPage'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import AdminPage from './pages/AdminPages/AdminPage';

library.add(fab)

const Layout = styled.div``

function App() {

  return (
    <Router>
      <Layout>
        <ScrollRestoration />
        <Header/>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/collection">
            <ListPage />
          </Route>
          <Route path="/product/:id">
            <ProductPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
        </Switch>
        <Footer/>
      </Layout>
    </Router>
  );
}

export default App;
