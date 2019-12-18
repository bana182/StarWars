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
  searchText = (e) => {
    const { target: { value }} = e
    this.setState({planetName:value});
  }
  showPlanetDetails = (item) => {
    this.setState({openDetailPopUp:true,selectedPlanet:item});
  }
  handleClose = () => {
    this.setState({openDetailPopUp:false,selectedPlanet:{}});
  }
  generateFilteredList = () => {
    const { planetName, planetData } = this.state;
    let searchText= planetName.toLowerCase();
    let data = planetData.filter( (item,index) => {
        const { name } = item;
        return name.toLowerCase().startsWith(searchText) && item;
    });
    let desOrderPlanetData=this.arrangeInDesc(data);
    let res=[];
    desOrderPlanetData.forEach( (item,index) => {
      if(index === 0) {
        res.push(
        <div class="col-sm-3">
        <div className="card text-white bg-primary mb-3" style={{"width": "18rem"}}>
          <blockquote class="blockquote text-white mb-0 card-body">
            <h5 className="card-title">{item.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Terrain: {item.terrain}</h6>
            <p className="card-text"><h5>Population: {item.population}</h5></p>
            <div className="card-footer">
            <small className="text-muted">To see other details
              <cite title="Show Detail">
                <a href="#" className="card-link" onClick={ () => { this.showPlanetDetails(item,index) }}>Click here</a>
              </cite>
            </small>
            </div>
          </blockquote>
        </div>
        </div>
        )
      } else {
        res.push(
        <div class="col-sm-3">
        <div className="card restCards" style={{"width": "18rem"}}>
          <blockquote class="blockquote mb-0 card-body">
            <h5 className="card-title">{item.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Terrain: {item.terrain}</h6>
            <p className="card-text"><h5>Population: {item.population}</h5></p>
            <div className="card-footer">
            <small className="text-muted">To see other details
              <cite title="Show Detail">
                <a href="#" className="card-link" onClick={ () => { this.showPlanetDetails(item,index) }}>Click here</a>
              </cite>
            </small>
            </div>
          </blockquote>
        </div>
        </div>
        )
      }
    });
    return res;
  }
  arrangeInDesc = (data) => {
      return data.sort(function(a, b){
                  let populationA = parseInt(a.population)
                  let populationB = parseInt(b.population)
                  return populationB-populationA
            });
  }

  render(){
    const { planetName, openDetailPopUp, selectedPlanet } = this.state;

    return(
        <div className="dashboard">
          <div className="searchDiv">
            <span>Search: </span>
            <input type="text" placeholder="planet search" onChange={this.searchText}/>
          </div>
          <div className="content">
            {
              planetName!==""
            ?
            <div className="container">
              <div className="row">
                {this.generateFilteredList()}
              </div>
            </div>
            :
            <div style={{"text-align":"center"}}><span>search planet for generating the list</span></div>
          }
          </div>
          {openDetailPopUp===true?<Modal isOpen={openDetailPopUp} onClose={this.handleClose}>
            <div style={{"border-bottom":"1px solid lightgrey","font-weight":"bold","font-size":"14px"}}><span>{selectedPlanet.name}</span></div>
            <div className="modalChild">
            <ul style={{"list-style":"none"}}>
              <li><span>Climate: </span><span>{selectedPlanet.climate}</span></li>
              <li><span>Diameter: </span><span>{selectedPlanet.diameter}</span></li>
              <li><span>Gravity: </span><span>{selectedPlanet.gravity}</span></li>
              <li><span>Orbital period: </span><span>{selectedPlanet.orbital_period}</span></li>
              <li><span>Population: </span><span>{selectedPlanet.population}</span></li>
              <li><span>Rotation period: </span><span>{selectedPlanet.rotation_period}</span></li>
              <li><span>Surface water: </span><span>{selectedPlanet.surface_water}</span></li>
            </ul>
            </div>
            <p><button onClick={this.handleClose}>Close</button></p>
          </Modal>:""}
        </div>
    );
  }
}
export default Login;
