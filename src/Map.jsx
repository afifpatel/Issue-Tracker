import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const evtNames = ['ready','click','dragend'];


export const camelize = function(str) {
  return str.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}

export default class Map extends React.Component {

  constructor(props) {
    super(props);
    console.log("IN Constructor props", this.props)

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }
  }


  componentDidMount() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            },
            (error) => console.log(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
)
        }

    
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (this.props.center !== prevProps.center) {
      this.setState({
        currentLocation: this.props.center
      })
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

recenterMap() {
    const map = this.map;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = this.state.currentLocation;
      if (!(center instanceof google.maps.LatLng)) {
        center = new google.maps.LatLng(center.lat, center.lng);
      }
      // map.panTo(center)
      map.setCenter(center);
  }
}
  
loadMap() {
      console.log("in maps")
        if (this.props && this.props.google) {
            // google is available
            console.log("Google Api available", this.props)

            const {google} = this.props;
            const maps = google.maps;
      
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
      
            // let zoom = 14;
            // let lat = 17.0507;
            // let lng = 54.1066;

        const curr = this.state.currentLocation;
        let center = new maps.LatLng(curr.lat, curr.lng)

        let mapConfig = Object.assign({}, {
          center,
          zoom: this.props.zoom
        });
        
        this.map = new maps.Map(node, mapConfig);

        evtNames.forEach(e => {
          console.log("Event",e)
          this.map.addListener(e, this.handleEvent(e));
        });

        maps.event.trigger(this.map, 'ready')
          }
    }
    handleEvent(evtName) {
      let timeout;
      const handlerName = `on${camelize(evtName)}`;
  
      return (e) => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        timeout = setTimeout(() => {
          if (this.props[handlerName]) {
            this.props[handlerName](this.props, this.map, e);
          }
        }, 0);
      }
    }
  

render() {
        // console.log("in maps")
        const style = {
          width: '100%',
          height: '100%'
        }
        return (
            <div style={style} ref='map' >
              Loading map...
              {this.renderChildren()}
            </div>
          )
    }

  renderChildren(){
    const {children} = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    })
  }
  }

  Map.propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object,
    onMove: PropTypes.func,

  }

  evtNames.forEach(e => Map.propTypes[camelize(e)] = PropTypes.func)

  Map.defaultProps = {
    zoom: 5,
    // San Francisco, by default
    initialCenter: {
      lat: 37.774929,
      lng: -122.419416
    },
    onMove: function() {}  //default prop
  }