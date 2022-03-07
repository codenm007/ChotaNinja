import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
//importing our redux store
import store from "./store/index";
axios.defaults.baseURL = "https://chota.ninja";
ReactDOM.render(
 <Provider store = {store}> 
<App />
 </Provider>, 
 
 document.getElementById('root')
 );
