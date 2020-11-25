import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import { ROUTES } from './routes';
import {Home} from './components/home/home'

function App() {
  return (
  <Router>
    <Switch>
      { ROUTES.map((route, index) => <Route key={ index } { ...route }></Route>) }
    </Switch>
  </Router>
  );
}

export default App;
