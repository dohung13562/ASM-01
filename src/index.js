import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  <React.StrictMode>    
    {/* <Provider> */}
      <BrowserRouter >  
        <App /> 
      </BrowserRouter>
    {/* </Provider>   */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();