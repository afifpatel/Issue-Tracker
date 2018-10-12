import React from 'react';
import 'whatwg-fetch'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import  qs from 'query-string';
import { parse } from 'query-string';
import { Button, Glyphicon, Table, Panel} from 'react-bootstrap';

// import IssueAdd from './IssueAdd.jsx';
// import IssueFilter from './IssueFilter';
// import Toast from './Toast';


function IssueTable(props){
    const issueRows= props.issues_prop.map( i => <IssueRow key={i._id} row_value={i} deleteLandmark={props.deleteLandmark}/>)
    return(
            // <table className="bordered-table">
            <Table bordered condensed hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Owner</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Text</th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>{issueRows}</tbody>
            {/* </table> */}
            </Table>
            )

}

const IssueRow = (props) => {

    function onDeleteClick(){
        props.deleteLandmark(props.row_value._id);
    }

    return(
    <tr>
    <td><Link to={`/landmark/${props.row_value._id}`}>{props.row_value._id.substr(-4)} </Link></td>
    <td>{props.row_value.owner}</td>
    <td>{props.row_value.location}</td>
    <td>{props.row_value.date ? props.row_value.date.toDateString() : '' }</td>
    <td>{props.row_value.text}</td>
    {/* <td><button onClick={onDeleteClick}>Delete</button></td> */}
    {/* <td><Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="trash" /></Button></td> */}
</tr>
    );
};

export default class LandmarkList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
             landmarks_state : [] ,
             toastVisible: false, toastMessage: '', toastType: 'success', 
        };

        // this.createIssue=this.createIssue.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.deleteIssue=this.deleteLandmark.bind(this);
        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
        }

showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
}
dismissToast() {
    this.setState({ toastVisible: false });
}

    deleteLandmark(id) {
        fetch(`/api/landmark/${id}`, { method : 'delete' }).then(response => {
            if(!response.ok) console.log("Not ok");
            else this.loadData();
        }).catch(err => {
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

    // // loadData(){
    //     setTimeout( () => {
    //     this.setState( { issues_state : issues} )
    // }, 500 );
    // }

    loadData(){
        fetch(`/api/landmarks`).then(response =>{
            if(response.ok){
                response.json().then(data => {
                console.log("total count of recordsssss :",data._metadata.total_count);
                data.records.forEach( landmark => {
                if (landmark.date)
                    landmark.date=new Date(landmark.date);
                landmark.location = "lat:" + landmark.location.lat + " long: " + landmark.location.lng
        });
            this.setState({ landmarks_state : data.records});
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

    render(){
        // const query = parse(this.props.location.search);
        console.log("Landmark list state",this.state.landmarks_state)

        return(
            <div>
                {/* <h1>Issue Tracker</h1> */}
                {/* <Panel>
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
                </Panel> */}
                <IssueTable issues_prop={this.state.landmarks_state} deleteLandmark={this.deleteLandmark}/>
                {/* <IssueAdd createIssue={this.createIssue}/> */}
                {/* <Toast
                    showing={this.state.toastVisible} 
                    message={this.state.toastMessage}
                    onDismiss={this.dismissToast} bsStyle={this.state.toastType}
                /> */}
            </div>
        );
    }
}

