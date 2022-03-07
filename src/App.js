import { Fragment } from 'react';
import {useSelector} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/header';

import Home from './components/home';
import PageNotFound from './components/404.js';
import Login from './components/login';
import SecureRedirect from "./components/Secure_redirect";

export default function App() {
  return (
    <Router>
      <Header />
      <div>
        <Switch>
          <Route exact path="/404">
            <PageNotFound />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route  path="/secure">
            <SecureRedirect />
          </Route>
        </Switch>
      </div>
      
    </Router>
  );
}
