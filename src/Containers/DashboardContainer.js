import React, { Component } from 'react';
import Dashboard from ".././Components/Dashboard";
import Header from ".././Components/Header";
import axios from 'axios';
import requestAllPages from 'request-all-pages';
import spinner from 'react-spinner';
import ReactLoading from 'react-loading';
class DashboardContainer extends Component{
  constructor(props){
    super(props);
    this.state={
        planetData:[],
        count:-1,
        loading:true
    }
    this.logOut=this.logOut.bind(this);
  }
  componentDidMount(){
    this.getAllData("https://swapi.co/api/planets/");
  }
  getAllData(url){
    let _this=this;

    let allData=this.state.planetData;
      axios.get(url)
    .then(function (response) {
      for(let i=0;i<response.data.results.length;i++){
        allData.push(response.data.results[i]);
      }
      if(allData.length!==_this.state.count){
        _this.setState({planetData:allData,count:response.data.count});
      }else{
        _this.setState({planetData:allData,count:response.data.count,loading:false});
      }

      if(response.data.next){
        _this.getAllData(response.data.next)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  logOut(){
    this.props.history.push("/");
  }
  render(){
    return(
        <div>
          <Header pageActive="dashboard" logOut={this.logOut}/>
          {this.state.planetData.length===this.state.count?<div><Dashboard planetData={this.state.planetData}/></div>:""}
          {this.state.loading===true?<center><div className="loadingIcon"><ReactLoading type="bars" color="#444"/></div></center>:""}
        </div>
    );
  }
}
export default DashboardContainer;
