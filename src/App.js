import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMapReact from 'google-map-react';
//import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentLatLng: {
        lat: undefined,
        lng: undefined,
      },
      isMarkerShown: false
    }
  }

  componentWillUpdate(){
    this.getGeoLocation()
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getGeoLocation()
      this.setState({ isMarkerShown: true })
    }, 5000)
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.coords);
                this.setState(prevState => ({
                    currentLatLng: {
                        ...prevState.currentLatLng,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }))
            }
        )
    }
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
           {this.state.currentLatLng.lng}
          </a>
        </header>      
           <MapGoogle
           currentLocation={this.state.currentLatLng}
          />     
      </div>
    );
  }
}

function MapGoogle(props){
  const LatLng= Object.assign({}, props.currentLocation);
  const defaultProps = {
    center: {
      lat:  LatLng.lat,
      lng:  LatLng.lng
    },
    zoom: 15
  };
  
 console.log("pasa por aqui", props.currentLocation.lat.toFixed(2))
  const AnyReactComponent = ({ text, img }) => 
   <div>
    <img src={img} alt='icono' style={{width: 24, height: 24} }/>
      {text}
   </div>;
   
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAPTJjD3TVFQ0oK-gwMkfEuCOxM3RPv_1M' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={ props.currentLocation.lat}
            lng={ props.currentLocation.lng}
            text={'Aqui esto ubicado'}
            img={'https://image.flaticon.com/icons/svg/67/67347.svg'}
          />
        </GoogleMapReact>
      </div>
    );
  
}

export default App;
