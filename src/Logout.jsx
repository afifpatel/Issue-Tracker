import React from 'react';
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Checkbox,
    Panel, Form, Row, Col, Alert, Image, PageHeader, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loggedOut }  from './action.jsx';

@connect( store => {
    return {
        isLoggedIn : store.isLoggedIn,
    };
})
class Logout extends React.Component {

componentWillMount(){
    console.log("in logout component did mount");
    this.logout()
}

logout(){
    console.log("LOG OUT PLSSSSSSSSS")
    this.props.dispatch(loggedOut());
}

render(){
    return null
}

}

export default Logout;