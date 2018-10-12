import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';


const evtNames = ['click'];

import { camelize } from './Map.jsx';

export default class InfoWindow extends React.Component {

    componentDidMount() {
        this.renderInfoWindow();
      }

    componentDidUpdate(prevProps, prevState) {
        const {google, map} = this.props;

        if (!google || !map) {
          return;
        }
    
        if (map !== prevProps.map) {
          this.renderInfoWindow();
        }
        if (this.props.children !== prevProps.children) {
            this.updateContent();
          }
        if ((this.props.visible !== prevProps.visible) ||
          (this.props.marker !== prevProps.marker)) {
            this.props.visible ?
            this.openWindow() :
            this.closeWindow();
        }
      }

      updateContent() {
        const content = this.renderChildren();
        this.infowindow.setContent(content);
      }

      renderChildren() {
        const {children} = this.props;
        return ReactDOMServer.renderToString(children);
      }

      renderInfoWindow() {
        let {map, google, mapCenter} = this.props;

        if (!google || !google.maps) {
            return;
          }
    
        const iw = this.infowindow = new google.maps.InfoWindow({
          content: 'Hiii'
        });

        google.maps.event.addListener(iw, 'closeclick', this.onClose.bind(this))
        google.maps.event.addListener(iw, 'domready', this.onOpen.bind(this));
      }
      onOpen() {
        if (this.props.onOpen) {
            this.props.onOpen();
        }
      }
    
      onClose() {
        console.log("In onClose", this.props)
        if (this.props.onClose) {
            this.props.onClose();
        }
      }

      openWindow(){
        this.infowindow.open(this.props.map, this.props.marker);
      }
      closeWindow() {
        console.log("In close Window", this.infowindow)
        this.infowindow.close();
      }
    render() {
      return null;
    }
  }

  InfoWindow.propTypes = {
    children: PropTypes.element.isRequired,
    map: PropTypes.object,
    marker: PropTypes.object,
    visible: PropTypes.bool,
  
    // callbacks
    onClose: PropTypes.func,
    onOpen: PropTypes.func
  }
  
  InfoWindow.defaultProps = {
    visible: false
  }