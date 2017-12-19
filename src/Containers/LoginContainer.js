import React, { Component } from 'react';
import Login from ".././Components/Login";
import Header from ".././Components/Header";
class LoginContainer extends Component{
  constructor(props){
    super(props);
    this.gotoDashboard=this.gotoDashboard.bind(this);
  }
  gotoDashboard(){
    this.props.history.push("/Dashboard");
  }
  render(){
    console.log("this.state",this.state);
    return(
      <div>
      <Header pageActive="login"/>
      <Login gotoDashboard={this.gotoDashboard}/>
      </div>
    );
  }
}
export default LoginContainer;
