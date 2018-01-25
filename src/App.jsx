
import React from 'react'               //import npm installed libs...replacement to html script includes
import ReactDOM from 'react-dom';
//import { Router, Route, hashHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch, Redirect, browserHistory, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import IssueAddNavItem from './IssueAddNavItem.jsx';

const contentNode = document.getElementById('contents');

const NoMatch = () => <p>Page Not Found</p>;

const Header = () => (
<Navbar fluid>
    <Navbar.Header>
        <Navbar.Brand>Issue Tracker</Navbar.Brand>
    </Navbar.Header>
    <Nav>
        <LinkContainer to="/issues">
            <NavItem>Issues</NavItem>
        </LinkContainer>
        <LinkContainer to="/reports">
            <NavItem>Reports</NavItem>
        </LinkContainer>
    </Nav>
    <Nav pullRight>
        {/* <NavItem><Glyphicon glyph="plus" /> Create Issue</NavItem> */}
        <NavItem><IssueAddNavItem /></NavItem>
        <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
            <MenuItem>Logout</MenuItem>
        </NavDropdown>
    </Nav>
</Navbar>
);

const App = (props) => (
    <div>
        <Header />
        <div className="container-fluid">
            {props.children}
            <hr />
            <h5><small>
            Full source code available at this <a href = "https://github.com/vasanr/pro-mern-stack">
            GitHub repistory</a>
            </small></h5>
        </div>
    </div>
);

App.propTypes = {
    children: PropTypes.object.isRequired,
};
// const RoutedApp = () => (
//     <Router >
//         <Route exact path="/" component={IssueList} />
//         <Route path="/issueEdit" component={IssueEdit} />
//         <Route path="*" component={NoMatch} />
//     </Router>
// );

//ReactDOM.render(<RoutedApp />, contentNode);

ReactDOM.render((
    <Router history={browserHistory}>
        <App>
        <Switch>
            <Route exact path="/issues" component={withRouter(IssueList)} />
            <Route exact path="/issues/:id" component={IssueEdit} />
            {/* <Redirect from="/" to="/issues" /> */}
            <Route path="*" component={NoMatch} />
        </Switch>
        </App>
    </Router>
), contentNode);

if (module.hot) {           //for module refresh only on change, rather than whole browser
    module.hot.accept();
}

// // var contentNode = document.getElementById('contents');
// //     var component = <h1>Hello World</h1>;        // A simple component, written in JSX
// //     ReactDOM.render(component, contentNode);      // Render the component inside the content Node

// // const contentNode = document.getElementById('contents');

// // const continents = ['Africa','America','Asia','Australia','Europe'];

// // const message = continents.map(c => `Hello ${c}!`).join(' ');

// // const component = <p>{message}</p>; // A simple JSX component

// // ReactDOM.render(component, contentNode);    // Render the component inside the content Node


// // var contentNode = document.getElementById('contents');
   
// // class IssueList extends React.Component {

// //     render(){
// //         return(
// //             <div>This is a placeholder for the issue list.</div>
// //         );
// //     }

// // }

// // ReactDOM.render(<IssueList />, contentNode);      // Render the component inside the content Node

// // const contentNode = document.getElementById('contents');

// // class IssueFilter extends React.Component{
// //     render(){
// //         return(
// //             <div>This is a placeholder for the Issue Filter.</div>
// //         )
// //     }
// // }

// // class IssueTable extends React.Component{
// //     render(){
// //         return(
// //             <div>This is a placeholder for a table of Issues.</div>
// //         )
// //     }
// // }

// // class IssueAdd extends React.Component{
// //     render(){
// //         return(
// //             <div>This is a placeholder for an Issue Add entry form.</div>
// //         )
// //     }
// // }

// // class IssueList extends React.Component{
// //     render(){
// //         return(
// //             <div>
// //                 <h1>Issue Tracker</h1>
// //                 <IssueFilter />
// //                 <hr />
// //                 <IssueTable />
// //                 <hr />
// //                 <IssueAdd />
// //             </div>
// //         );
// //     }
// // }



// // ReactDOM.render(<IssueList />, contentNode); 

// import IssueAdd from './IssueAdd.jsx';
// const contentNode = document.getElementById('contents');

// // const issues = [
// //     {
// //         id: 1, status: 'Open', owner: 'Ravan',
// //         created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
// //         title: 'Error in console when clicking Add',
// //     },
// //     {
// //         id: 2, status: 'Assigned', owner: 'Eddie',
// //         created: new Date('2016-08-16'), effort: 14,
// //         completionDate: new Date('2016-08-30'),
// //         title: 'Missing bottom border on panel',
// //     },
// //     ];


// // class IssueFilter extends React.Component{
// //     render(){
// //         return(
// //             <div>This is a placeholder for the Issue Filter.</div>
// //         )
// //     }
// // }

// // class IssueTable extends React.Component{
// //     render(){
// //         const issueRows= this.props.issues_prop.map( i => <IssueRow key={i.id} row_value={i}/>)
// //         return(
// //             <table className="bordered-table">
// //                 <thead>
// //                     <tr>
// //                         <th>Id</th>
// //                         <th>Status</th>
// //                         <th>Owner</th>
// //                         <th>Created</th>
// //                         <th>Effort</th>
// //                         <th>Completion Date</th>
// //                         <th>Title</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>{issueRows}</tbody>
// //             </table>
// //             )
// //     }
// // }

// // class IssueRow extends React.Component {
// //     render(){
// //         const borderedStyle = {border: "1px solid silver", padding: 4};
// //         const issue=this.props.row_value;
// //         return(
// //             <tr>
// //                 <td>{issue.id}</td>
// //                 <td>{issue.status}</td>
// //                 <td>{issue.owner}</td>
// //                 <td>{issue.created.toDateString()}</td>
// //                 <td>{issue.effort}</td>
// //                 <td>{issue.completionDate ? issue.completionDate.toDateString() : '' }</td>
// //                 <td>{issue.title}</td>
// //             </tr>
// //         )
// //     }
// // }

// // function IssueTable(props){
// //     const issueRows= props.issues_prop.map( i => <IssueRow key={i._id} row_value={i}/>)
// //     return(
// //             <table className="bordered-table">
// //                 <thead>
// //                     <tr>
// //                         <th>Id</th>
// //                         <th>Status</th>
// //                         <th>Owner</th>
// //                         <th>Created</th>
// //                         <th>Effort</th>
// //                         <th>Completion Date</th>
// //                         <th>Title</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>{issueRows}</tbody>
// //             </table>
// //             )

// // }

// // const IssueRow = (props) => (
// //     <tr>
// //     <td>{props.row_value._id}</td>
// //     <td>{props.row_value.status}</td>
// //     <td>{props.row_value.owner}</td>
// //     <td>{props.row_value.created.toDateString()}</td>
// //     <td>{props.row_value.effort}</td>
// //     <td>{props.row_value.completionDate ? props.row_value.completionDate.toDateString() : '' }</td>
// //     <td>{props.row_value.title}</td>
// // </tr>
// // )

// // class IssueList extends React.Component{

// //     constructor(){
// //         super();
// //         this.state = { issues_state : [] };

// //         this.createIssue=this.createIssue.bind(this);
// //         }

// //     componentDidMount(){
// //         this.loadData();
// //     }

// //     // loadData(){
// //     //     setTimeout( () => {
// //     //     this.setState( { issues_state : issues} )
// //     // }, 500 );
// //     // }

// //     loadData(){
// //         fetch('/api/issues').then(response =>{
// //             if(response.ok){
// //                 response.json().then(data => {
// //                 console.log("total count of records :",data._metadata.total_count);
// //                 data.records.forEach( issue => {
// //                 issue.created=new Date(issue.created);
// //                 if (issue.completionDate)
// //                     issue.completionDate=new Date(issue.completionDate);
// //         });
// //             this.setState({ issues_state : data.records});
// //             });
// //         } else {
// //                 respons.json().then( err =>{
// //                     alert("Failed to fetch issues:" + error.message)
// //                 });
// //             }
// //         }).catch(err => {
// //             alert("Error in fetching data from server:", err);
// //         });
// //     }

// //     // createIssue(new_issue){
// //     //     const newIssues = this.state.issues_state.slice();
// //     //     new_issue.id = this.state.issues_state.length+1;
// //     //     newIssues.push(new_issue);
// //     //     this.setState({ issues_state : newIssues});
// //     // }

// //     createIssue(newIssue){
// //         fetch('/api/issues',{
// //             method: 'POST',
// //             headers: { 'Content-Type' : 'application/json'},
// //             body: JSON.stringify(newIssue),
// //             }).then( response => {
// //                 if(response.ok){            
// //                 response.json().then( updatedIssue => {
// //                     console.log("total count of recordssss :",updatedIssue._metadata);
// //                     updatedIssue.new_issue.created=new Date(updatedIssue.new_issue.created);
// //                     if(updatedIssue.new_issue.completionDate)
// //                         updatedIssue.new_issue.completionDate=new Date(updatedIssue.new_issue.completionDate);
// //                     const newIssues = this.state.issues_state.concat(updatedIssue.new_issue);
// //                     this.setState({issues_state : newIssues});
// //                     });
// //                 } else{
// //                 response.json().then( error => {
// //                      alert("Failed to add issue:" + error.message)
// //                     });
// //                 }
// //                 }).catch(err =>{
// //                 alert("Error in sending data to server:" + err.message);
// //             }); 
// //     }

// //     render(){
// //         return(
// //             <div>
// //                 <h1>Issue Tracker</h1>
// //                 <IssueFilter />
// //                 <hr />
// //                 <IssueTable issues_prop={this.state.issues_state}/>
// //                 <hr />
// //                 <IssueAdd createIssue={this.createIssue}/>
// //             </div>
// //         );
// //     }
// // }



// ReactDOM.render(<IssueList />, contentNode); 