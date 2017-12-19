import React, { Component } from 'react';
import './header.css';
class Header extends Component{
  logOut(){
    this.props.logOut();
  }
  render(){
    return(
      <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Star Wars</a>
      </div>
      {this.props.pageActive==="dashboard"?<ul class="nav navbar-nav">
        <li class="active"><a href="#">Home</a></li>
      </ul>:""}
      {this.props.pageActive==="dashboard"?<ul class="nav navbar-nav navbar-right">
        <li><a href="#" onClick={this.logOut.bind(this)}><span class="glyphicon glyphicon-log-in"></span> LogOut</a></li>
      </ul>:""}
    </div>
  </nav>
    );
  }
}
export default Header;
