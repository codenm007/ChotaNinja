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
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/calendar">
            <Calendar />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route  path="/">
            <Redirect />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
