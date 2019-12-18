import React from 'react';
import Login from ".././Components/Login";
import Header from ".././Components/Header";

const LoginContainer = (props) => {
  const gotoDashboard = () => {
    const { history } = props
    history.push("/Dashboard");
  }
  return(
      <React.Fragment>
      <Header pageActive="login"/>
      <Login gotoDashboard={gotoDashboard}/>
      </React.Fragment>
    );
}
export default LoginContainer;
