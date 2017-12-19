import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import LoginContainer from './Containers/LoginContainer';
import DashboardContainer from './Containers/DashboardContainer';


var nodedata;
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/Dashboard' component={DashboardContainer}/>
        <Route path='/' component={LoginContainer}/>
        </Switch>
    );
  }
}

export default App;
