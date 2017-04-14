import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Root from "./Root"


var request = new Request('https://fcctop100.herokuapp.com/api/fccusers/top/recent', {
    method: 'GET'});

    fetch(request).then(function (response) {
        return response.json();
}).then(function (data) {
        console.log(data);
    });
ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
