import React from 'react';
import 'whatwg-fetch'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import  qs from 'query-string';
import { parse } from 'query-string';
import { Button, Glyphicon, Table, Panel} from 'react-bootstrap';

// import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFilter.jsx';
import Toast from './Toast.jsx';


function IssueTable(props){
    const issueRows= props.issues_prop.map( i => <IssueRow key={i._id} row_value={i} deleteIssue={props.deleteIssue}/>)
    return(
            // <table className="bordered-table">
            <Table bordered condensed hover responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Completion Date</th>
                        <th>Title</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{issueRows}</tbody>
            {/* </table> */}
            </Table>
            )

}

const IssueRow = (props) => {

    function onDeleteClick(){
        props.deleteIssue(props.row_value._id);
    }

    return(
    <tr>
    <td><Link to={`/issues/${props.row_value._id}`}>{props.row_value._id.substr(-4)} </Link></td>
    <td>{props.row_value.status}</td>
    <td>{props.row_value.owner}</td>
    <td>{props.row_value.created.toDateString()}</td>
    <td>{props.row_value.effort}</td>
    <td>{props.row_value.completionDate ? props.row_value.completionDate.toDateString() : '' }</td>
    <td>{props.row_value.title}</td>
    {/* <td><button onClick={onDeleteClick}>Delete</button></td> */}
    <td><Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="trash" /></Button></td>
</tr>
    );
};

export default class IssueList extends React.Component{

    constructor(){
        super();
        this.state = {
             issues_state : [] ,
             toastVisible: false, toastMessage: '', toastType: 'success', 
        };

        // this.createIssue=this.createIssue.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.deleteIssue=this.deleteIssue.bind(this);
        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
        }

showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
}
dismissToast() {
    this.setState({ toastVisible: false });
}

    deleteIssue(id) {
        fetch(`/api/issues/${id}`, { method : 'delete' }).then(response => {
            if(!response.ok) this.showError(`Failed to delete issue`);
            else this.loadData();
        }).catch(err => {
            this.showError("Error in fetching data from server:", err);
        })
     }

    setFilter(query){
       // console.log(this.props.location.search);

        //console.log(query);
                
        this.props.history.push( {pathname : this.props.location.pathname, search : qs.stringify(query)});
       
    }
        
    componentDidMount(){
        this.loadData();
    }

    componentDidUpdate(prevProps){
       // console.log("location.search",parse(this.props.location.search));
        const oldQuery = parse(prevProps.location.search);
        const newQuery = parse(this.props.location.search);
        if (oldQuery.status === newQuery.status
            && oldQuery.effort_gte === newQuery.effort_gte
            && oldQuery.effort_lte === newQuery.effort_lte
            && oldQuery.owner === newQuery.owner) {
            return;
        }
        this.loadData();
    }
    // loadData(){
    //     setTimeout( () => {
    //     this.setState( { issues_state : issues} )
    // }, 500 );
    // }

    loadData(){
        fetch(`/api/issues${this.props.location.search}`).then(response =>{
            if(response.ok){
                response.json().then(data => {
                console.log("total count of recordsssss :",data._metadata.total_count);
                data.records.forEach( issue => {
                issue.created=new Date(issue.created);
                if (issue.completionDate)
                    issue.completionDate=new Date(issue.completionDate);
        });
            this.setState({ issues_state : data.records});
            });
        } else {
                respons.json().then( err =>{
                    // alert("Failed to fetch issues:" + error.message)
                    this.showError(`Failed to fetch issues ${error.message}`);
                });
            }
        }).catch(err => {
            // alert("Error in fetching data from server:", err);
            this.showError(`Error in fetching data from server: ${err}`);
        });
    }

    // createIssue(new_issue){
    //     const newIssues = this.state.issues_state.slice();
    //     new_issue.id = this.state.issues_state.length+1;
    //     newIssues.push(new_issue);
    //     this.setState({ issues_state : newIssues});
    // }

    // createIssue(newIssue){
    //     fetch('/api/issues',{
    //         method: 'POST',
    //         headers: { 'Content-Type' : 'application/json'},
    //         body: JSON.stringify(newIssue),
    //         }).then( response => {
    //             if(response.ok){            
    //             response.json().then( updatedIssue => {
    //                 console.log("total count of records :",updatedIssue._metadata);
    //                 updatedIssue.new_issue.created=new Date(updatedIssue.new_issue.created);
    //                 if(updatedIssue.new_issue.completionDate)
    //                     updatedIssue.new_issue.completionDate=new Date(updatedIssue.new_issue.completionDate);
    //                 const newIssues = this.state.issues_state.concat(updatedIssue.new_issue);
    //                 this.setState({issues_state : newIssues});
    //                 });
    //             } else{
    //             response.json().then( error => {
    //                 //  alert("Failed to add issue:" + error.message)
    //                     this.showError(`Failed to add issue: ${error.message}`);
    //                 });
    //             }
    //             }).catch(err =>{
    //             // alert("Error in sending data to server:" + err.message);
    //                     this.showError(`Error in sending data to server: ${err.message}`);
    //         }); 
    // }

    render(){
        const query = parse(this.props.location.search);
        return(
            <div>
                {/* <h1>Issue Tracker</h1> */}
                <Panel>
                    <Panel.Heading>
                        <Panel.Title toggle>
							Filter
						</Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <IssueFilter setFilter={this.setFilter} initFilter={query}/>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
                <IssueTable issues_prop={this.state.issues_state} deleteIssue={this.deleteIssue}/>
                {/* <IssueAdd createIssue={this.createIssue}/> */}
                <Toast
                    showing={this.state.toastVisible} 
                    message={this.state.toastMessage}
                    onDismiss={this.dismissToast} bsStyle={this.state.toastType}
                />
            </div>
        );
    }
}

IssueList.propTypes = {
        location : PropTypes.object.isRequired,
        history: PropTypes.object,
    };

IssueRow.propTypes = {
        row_value: PropTypes.object.isRequired,
        deleteIssue: PropTypes.func.isRequired,
    };

IssueTable.propTypes = {
        issues_prop: PropTypes.array.isRequired,
        deleteIssue: PropTypes.func.isRequired,
    };

