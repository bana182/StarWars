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
  }
  componentDidMount = () => {
    this.getAllData("https://swapi.co/api/planets/");
  }
  getAllData = (url) => {
    const { count, planetData } = this.state;
    let allData= planetData;
      axios.get(url)
    .then( (response) => {
      const { data: { results } } = response
      for(let i=0;i<results.length;i++){
        allData.push(results[i]);
      }
      if(allData.length!== count){
        this.setState({planetData:allData,count:response.data.count});
      }else{
        this.setState({planetData:allData,count:response.data.count,loading:false});
      }

      if(response.data.next){
        this.getAllData(response.data.next)
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  logOut = () => {
    const { history } = this.props;
    history.push("/");
  }
  render(){
    const { planetData, loading } = this.state
    return(
        <div>
          <Header pageActive="dashboard" logOut={this.logOut}/>
          {planetData.length===this.state.count ? <div><Dashboard planetData={planetData}/></div> : ""}
          {loading===true?<center><div className="loadingIcon"><ReactLoading type="bars" color="#444"/></div></center>:""}
        </div>
    );
  }
}
export default DashboardContainer;
