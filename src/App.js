import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
