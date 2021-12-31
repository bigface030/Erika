import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import ScrollRestoration from 'react-scroll-restoration'

import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ListPage from './pages/ListPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

function App() {
  return (
    <Router>
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
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
