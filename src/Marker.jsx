import React from 'react';
import PropTypes from 'prop-types';


const evtNames = ['click', 'mouseover'];

import { camelize } from './Map.jsx';


export default class Marker extends React.Component {
  
  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
        this.renderMarker();
    }
  }
  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }
  renderMarker() {
    let {
      map, google, position, mapCenter, icon
    } = this.props;
    
    console.log("render Marker ", this.props)
    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);

    const pref = {
      map: map,
      position: position,
      icon : icon
    };
    console.log("In Marker pref ", pref)
    this.marker = new google.maps.Marker(pref);

    evtNames.forEach(e => {
      this.marker.addListener(e, this.handleEvent(e));
    })
}

handleEvent(evt) {
  return (e) => {
    const evtName = `on${camelize(evt)}`
    if (this.props[evtName]) {
      this.props[evtName](this.props, this.marker, e);
    }
  }
}
  
  
  render() {
    return null;
  }
}

Marker.propTypes = {
  position: PropTypes.object,
  map: PropTypes.object
}

evtNames.forEach(e => Marker.propTypes[camelize(e)] = PropTypes.func)

Marker.defaultProps = {
  name: 'Marker'
}
