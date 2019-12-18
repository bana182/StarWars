import React from 'react';
import './header.css';

const Header = (props) => {
  const logOut = () => {
    const { logOut } = props;
    logOut();
  }
  const { pageActive } = props;
    return(
      <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">Star Wars</a>
      </div>
      {pageActive==="dashboard"?<ul className="nav navbar-nav">
        <li className="active"><a href="#">Home</a></li>
      </ul>:""}
      {pageActive==="dashboard"?<ul className="nav navbar-nav navbar-right">
        <li><a href="#" onClick={logOut}><span className="glyphicon glyphicon-log-in"></span> LogOut</a></li>
      </ul>:""}
    </div>
  </nav>
    );
}
export default Header;
