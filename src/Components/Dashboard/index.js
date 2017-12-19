import React, { Component } from 'react';
import './dashboard.css';
import Modal from '.././Util'

class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      planetData:this.props.planetData,
      planetName:"",
      openDetailPopUp:false,
      selectedPlanet:{}
    }
  }
  searchText(e){
    this.setState({planetName:e.target.value});
  }
  showPlanetDetails(item){
    console.log("item selected",item);
    this.setState({openDetailPopUp:true,selectedPlanet:item});
  }
  handleClose(){
    this.setState({openDetailPopUp:false,selectedPlanet:{}});
  }
  generateFilteredList(){
    let searchText=this.state.planetName;
    let data=this.state.planetData.filter(function(item,index){
          if(item.name.startsWith(searchText)){
            return item;
          }
    });
    let desOrderPlanetData=this.arrangeInDesc(data);
    let _this=this;
    let res=[];
    desOrderPlanetData.filter(function(item,index){
          res.push(<div className="planet" id={index} onClick={_this.showPlanetDetails.bind(_this,item,index)}>
                <span>{item.name}</span>
                </div>);
    });
    return res;
  }
  arrangeInDesc(data){
      return data.sort(function(a, b){
                  let populationA=parseInt(a.population)
                  let populationB=parseInt(b.population)
                  return populationB-populationA
            });
  }
  render(){
    return(
        <div className="dashboard">
          <div className="searchDiv">
            <span>Search: </span>
            <input type="text" placeholder="planet search" onChange={this.searchText.bind(this)}/>
          </div>
          <div className="content">
            {this.state.planetName!==""?this.generateFilteredList():<div style={{"text-align":"center"}}><span>search planet for generating the list</span></div>}
          </div>
          {this.state.openDetailPopUp===true?<Modal isOpen={this.state.openDetailPopUp} onClose={() => this.handleClose()}>
            <div style={{"border-bottom":"1px solid lightgrey","font-weight":"bold","font-size":"14px"}}><span>{this.state.selectedPlanet.name}</span></div>
            <div className="modalChild">
            <ul style={{"list-style":"none"}}>
              <li><span>Climate: </span><span>{this.state.selectedPlanet.climate}</span></li>
              <li><span>Diameter: </span><span>{this.state.selectedPlanet.diameter}</span></li>
              <li><span>Gravity: </span><span>{this.state.selectedPlanet.gravity}</span></li>
              <li><span>Orbital period: </span><span>{this.state.selectedPlanet.orbital_period}</span></li>
              <li><span>Population: </span><span>{this.state.selectedPlanet.population}</span></li>
              <li><span>Rotation period: </span><span>{this.state.selectedPlanet.rotation_period}</span></li>
              <li><span>Surface water: </span><span>{this.state.selectedPlanet.surface_water}</span></li>
            </ul>
            </div>
            <p><button onClick={() => this.handleClose()}>Close</button></p>
          </Modal>:""}
        </div>
    );
  }
}
export default Login;
