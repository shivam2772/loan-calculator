import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import  App from './App';

axios.interceptors.request.use( request => {
  const baseURL = 'https://ftl-frontend-test.herokuapp.com';
  request.url = baseURL.concat(request.url);
  return request;
});

ReactDOM.render(<App/>, document.getElementById('app'));
