import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import LoginContainer from './Containers/LoginContainer';
import DashboardContainer from './Containers/DashboardContainer';

const App = () => {
    return (
      <div className="App-Div">
      <Switch>
        <Route exact path='/Dashboard' component={DashboardContainer}/>
        <Route path='/' component={LoginContainer}/>
        </Switch>
      </div>
    );
}

export default App;
