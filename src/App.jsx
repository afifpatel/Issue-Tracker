
import React from 'react'               //import npm installed libs...replacement to html script includes
import ReactDOM from 'react-dom';
//import { Router, Route, hashHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch, Redirect, browserHistory, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store.jsx';
import { Provider } from 'react-redux';

import  RoutedApp  from './RoutedApp.jsx';
import LandmarkAddNavItem from './LandmarkAddNavItem.jsx';
import Logout from './Logout.jsx';

const contentNode = document.getElementById('contents');

const NoMatch = () => <p>Page Not Found</p>;

const Header = () => (
<Navbar fluid>
    <Navbar.Header>
        <Navbar.Brand>Landmark Remark</Navbar.Brand>
    </Navbar.Header>
    <Nav>
        <LinkContainer to="/landmarks">
            <NavItem>Landmarks</NavItem>
        </LinkContainer>
        <LinkContainer to="/reports">
            <NavItem>Reports</NavItem>
        </LinkContainer>
    </Nav>
    <Nav pullRight>
        <NavItem><LandmarkAddNavItem /></NavItem>
        <LinkContainer to="/logout">
            <NavItem><i className="fas fa-sign-out-alt fa-lg"></i>Logout</NavItem>
        </LinkContainer>
    </Nav>
</Navbar>
);

export default function App(props){

    return(
        <div>
        <Header />
        <div className="container-fluid">
            {props.children}
            <hr />
            <h5><small>
            Full source code available at this <a href = "https://github.com/afifpatel/Landmark-Remark">
            GitHub repistory</a>
            </small></h5>
        </div>
        </div>
    )
};

App.propTypes = {
    children: PropTypes.object.isRequired,
};

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RoutedApp />
        </PersistGate>
    </Provider>, contentNode);

if (module.hot) {           //for module refresh only on change, rather than whole browser
    module.hot.accept();
}

