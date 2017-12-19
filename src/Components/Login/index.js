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

  onChangeUserName(e){
    this.setState({userName:e.target.value});
  }
  onChangePassword(e){
    this.setState({password:e.target.value});
  }
  checkForUserAuthentication(userName,password){
    let value=-1;
    let _this=this;
    let userurl="https://swapi.co/api/people/?search="+userName;
    axios.get(userurl)
  .then(function (response) {
    console.log(response);
    if(response.data.results.length!=0){
      if(password===response.data.results[0].birth_year){
        _this.props.gotoDashboard();
      }else{
        _this.setState({error:"Invalid password"});
      }

    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
  onSubmit(e){
       e.preventDefault();
       let userName=this.state.userName;
       let password=this.state.password;
       if(userName==="" || password===""){
         this.setState({error:"Fields should not be empty"});
       }else{
         this.checkForUserAuthentication(userName,password);
       }
  }
  render(){
    let options = {
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
       options = Object.assign(options, this.props.options || {});
       return( <div className="LoginPage">
              <div className="loginlabel"><span>Login</span></div>
              <div className="loginFormDiv">
          <form>
            <div className="form-group">
              <label>{options.name.label}</label>
              <input type="text" onChange={this.onChangeUserName.bind(this)} className="form-control" placeholder={options.name.placeholder} />
            </div>
            <div className="form-group">
              <label>{options.password.label}</label>
              <input type="password" onChange={this.onChangePassword.bind(this)}  className="form-control" placeholder={options.password.placeholder} />
            </div>
              {this.state.error!=""?<div className="error"><span>{this.state.error}</span></div>:""}
            <button type="submit" onClick={this.onSubmit.bind(this)} className="btn btn-default">{options.submitButton.text}</button>
          </form>
          </div>
        </div>);
  }
}
export default Login;
