import { Fragment } from 'react';
import {useSelector} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/header';
import Calendar from './components/calendar';
import Home from './components/home';
import Redirect from './components/redirect';


export default function App() {
  return (
    <Router>
      <Header />
      <div>
        <Switch>
          <Route exact path="/calendar">
            <Calendar />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route  path="/">
            <Redirect />
          </Route> */}
        </Switch>
      </div>
      
    </Router>
  );
}
