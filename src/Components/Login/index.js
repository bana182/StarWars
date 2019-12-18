import React, { Component } from 'react';
import './login.css';
import axios from 'axios';
class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      error:"",
      userName:"",
      password:"",
    }
  }

  onChangeUserName = (e) => {
    const { target: { value }} = e
    this.setState({userName:value});
  }
  onChangePassword = (e) => {
    const { target: { value }} = e
    this.setState({password:value});
  }
  checkForUserAuthentication = (userName, password) => {
    const { gotoDashboard } = this.props;
    const userurl="https://swapi.co/api/people/?search="+userName;
    axios.get(userurl)
    .then(function (response) {
      const { data: { results } } = response;
      if(results.length !== 0) {
        if(password === results[0].birth_year) {
          gotoDashboard();
        }else {
          this.setState({error:"Invalid password"});
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { userName } = this.state;
    const { password } = this.state;
    if(userName === "" || password === "") {
      this.setState({error:"Fields should not be empty"});
    }else{
      this.checkForUserAuthentication(userName,password);
    }
  }
  render(){
    let option = {
      name: {
        label: "Username",
        placeholder: "Username"
      },
      password: {
        label: "Password",
        placeholder: "Password"
      },
      submitButton: {
        text: "Submit"
      }
    };
    const { options } = this.props;
    const { error } = this.state;
    option = Object.assign(option, options || {});
    const { name: { label, placeholder }, password, submitButton: { text } } = option
    return( <div className="LoginPage">
    <div className="loginFormDiv">
    <form>
    <div className="form-group">
    <label>{label}</label>
    <input type="text" onChange={this.onChangeUserName} className="form-control" placeholder={placeholder} />
    </div>
    <div className="form-group">
    <label>{password.label}</label>
    <input type="password" onChange={this.onChangePassword}  className="form-control" placeholder={password.placeholder} />
    </div>
    {error!=""?<div className="error"><span>{error}</span></div>:""}
    <button type="submit" onClick={this.onSubmit} className="btn btn-default">{text}</button>
    </form>
    </div>
    </div>);
  }
}
export default Login;
