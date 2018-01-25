import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert } from 'react-bootstrap';
import Toast from './Toast.jsx';

// export default class IssueEdit extends React.Component{
//     render(){
//         return(
//             <div>
//                 <p>This is a placeholder for editing issue{this.props.match.params.id} .</p> 
//                 <Link to="/issues">Back to issue list</Link>
//             </div>
//         );
//     }
// }

// IssueEdit.propTypes = {
//     match: PropTypes.shape({
//         params: PropTypes.object.isRequired,
// })
// }

/* export default class IssueEdit extends React.Component{
    render(){
        
        return(
            <div>
                <p>This is a placeholder for editing issue{this.props.match.params.id} .</p> 
                <Link to="/issues">Back to issue list</Link>
            </div>
        );
    }
}

IssueEdit.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired,
})
}
*/

export default class IssueEdit extends React.Component {
    
    constructor(){
        super();
        this.state = {
            issue: {
                _id: '', title: '', status: '', owner: '', effort: null,
                completionDate: null, created: null,
            },
            invalidFields: {}, 
            showingValidation: false,                                  //Bootstrap validation
            toastVisible: false, toastMessage: '', toastType: 'success',
        };
        this.onChange = this.onChange.bind(this);
        this.onValidityChange = this.onValidityChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.dismissValidation = this.dismissValidation.bind(this);   //Bootstrap validation
        this.showValidation = this.showValidation.bind(this);         //Bootstrap validation
        this.showSuccess = this.showSuccess.bind(this);
        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
    }
    
    componentDidMount(){
        this.loadData();
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.loadData();
        }
    }

    onValidityChange(event, valid) {
        const invalidFields = Object.assign({}, this.state.invalidFields);
        // console.log("in OnvalidityChange ... event.target.name  and  valid", event.target.name,valid)
        if (!valid) {
            invalidFields[event.target.name] = true;
        } else {
            delete invalidFields[event.target.name];
        }
        // console.log("in OnvalidityChange exit ...invalid Fields[] ", invalidFields)        
        this.setState({ invalidFields });
    }

    onChange(event,convvertedValue){
        // console.log("in Parent's OnChange ... event.target.value  and  convertedValue", event.target.value,convvertedValue)        
        const issue = Object.assign({}, this.state.issue);
        const value = (convvertedValue !== undefined) ? convvertedValue :event.target.value;
        //issue[event.target.name] = event.target.value;
        issue[event.target.name] = value;
        this.setState({ issue });
       // console.log("In parent onChange() setting state => ", this.state.issue);
    }

    showValidation() {
        this.setState({ showingValidation: true });
    }
    
    dismissValidation() {
        this.setState({ showingValidation: false });
    }

    onSubmit(event){
        event.preventDefault();
        this.showValidation();          //Bootstrap validation

        if(Object.keys(this.state.invalidFields).length !== 0){
                return;
        }

        fetch(`/api/issues/${this.props.match.params.id}`,{
            method : 'PUT',
            headers : { 'Content-Type' : 'application/json'},
            body: JSON.stringify(this.state.issue),
        }).then (response => {
            if(response.ok) {
                response.json().then(updatedIssue => {
                    updatedIssue.created = new Date(updatedIssue.created);
                    if (updatedIssue.completionDate) {
                        updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                    }
                    this.setState({issue : updatedIssue});
                    // alert('Updated issue successfully');
                    this.showSuccess('Updated issue successfully.');
                });
            } else {
                response.json().then( error => {
                    // alert(`Failed to update issue: ${error.message}`);
                    this.showError(`Failed to update issue: ${error.message}`);
                });
            }
        }).catch(err => {
            // alert(`Error in sending data to server: ${err.message}`);
            this.showError(`Error in sending data to server: ${err.message}`);
        });
    }

    loadData(){
        fetch(`/api/issues/${this.props.match.params.id}`).then( response => {
          if (response.ok) {
              response.json().then( issue =>{
                  issue.created = new Date(issue.created);
                  issue.completionDate=issue.completionDate != null ? new Date(issue.completionDate) : null;
                  //issue.effort = issue.effort != null ? issue.effort.toString() : '';
                  this.setState({ issue });
              });
          } else {
              response.json().then (error => {
                //   alert(`Failed to fetch issue: ${error.message}`);
                this.showError(`Failed to fetch issue: ${error.message}`);
              });
          }
        }).catch(err => {
            // alert(`Error in fetching data from server; ${err.message}`);
            this.showError(`Error in fetching data from server: ${err.message}`);
        });
    }

    showSuccess(message) {
            this.setState({ toastVisible: true, toastMessage: message, toastType: 'success' });
    }

    showError(message) {
            this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
    }

    dismissToast() {
            this.setState({ toastVisible: false });
    }

    render(){
        //const issue = this.state.issue;
        // console.log("In Parent render () check invalidFileds[] ==> ", this.state.invalidFields);
        
        // const validationMessage = Object.keys(this.state.invalidFields). length === 0 ? null
        // : (<div className="error">Please correct invalid fields before submitting.</div>);

        // return(  w/o Bootstrap
        //   <div>
        //     <form onSubmit={this.onSubmit}>
        //         ID: {issue._id}
        //         <br />
        //         Created : {issue.created ? issue.created.toDateString() : ''}
        //         <br />
        //         Status: 
        //             <select name="status" value={issue.status} onChange={this.onChange}>
        //             <option value="New">New</option>
        //             <option value="Open">Open</option>
        //             <option value="Assigned">Assigned</option>
        //             <option value="Fixed">Fixed</option>
        //             <option value="Verified">Verified</option>
        //             <option value="Closed">Closed</option>
        //             </select>
        //         <br />
        //         Owner:
        //             <input name="owner" value={issue.owner} onChange={this.onChange} />
        //         <br />
        //         Effort:
        //             <NumInput size={5} name="effort" value={issue.effort} onChange={this.onChange} />
        //         <br />
        //         Completion Date: 
        //             <DateInput name = "completionDate" value={issue.completionDate} onChange={this.onChange} onValidityChange={this.onValidityChange}/>
        //         <br />
        //         Title: 
        //             <input name="title" size={50} value={issue.title} onChange={this.onChange} />
        //         <br />
        //         {validationMessage}
        //         <button type="submit">Submit</button>
        //         <br />
        //         <Link to="/issues">Back to issue list</Link>
        //     </form>
        //   </div>
        // );

        const issue = this.state.issue;
        let validationMessage = null;
        if (Object.keys(this.state.invalidFields).length !== 0 && this.state.showingValidation) {
                validationMessage = (
                    <Alert bsStyle="danger" onDismiss={this.dismissValidation}>
                        Please correct invalid fields before submitting.
                    </Alert>
                );
        }

        return( 
          <Panel header="Edit Issue">
            <Form horizontal onSubmit={this.onSubmit}>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>ID</Col>
                    <Col sm={9}>
                        <FormControl.Static>{issue._id}</FormControl.Static>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>Created</Col>
                    <Col sm={9}>
                        <FormControl.Static>{issue.created ? issue.created.toDateString() : ''}</FormControl.Static>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>Status</Col>
                    <Col sm={9}>
                        <FormControl componentClass="select" name="status" value={issue.status} onChange={this.onChange}
                        >
                            <option value="New">New</option>
                            <option value="Open">Open</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Verified">Verified</option>
                            <option value="Closed">Closed</option>
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>Owner</Col>
                    <Col sm={9}>
                        < FormControl name="owner" value={issue.owner} onChange={this.onChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                        <Col componentClass={ControlLabel} sm={3}>Effort</Col>
                        <Col sm={9}>
                            < FormControl componentClass={NumInput} name="effort" value={issue.effort} 
                            onChange={this.onChange} />
                        </Col>
                </FormGroup>
                <FormGroup validationState={this.state.invalidFields.completionDate ? 'error' : null}>
                    <Col componentClass={ControlLabel} sm={3}>Completion Date</Col>
                    <Col sm={9}>
                        <FormControl
                            componentClass={DateInput} name="completionDate" value={issue.completionDate} onChange={this.onChange}
                            onValidityChange={this.onValidityChange} />
                        <FormControl.Feedback />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>Title</Col>
                    <Col sm={9}>
                        < FormControl name="title" value={issue.title} onChange={this.onChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={3} sm={6}>
                        <ButtonToolbar>
                            <Button bsStyle="primary" type="submit">Submit</Button>
                            <Link to="/issues">
                                <Button bsStyle="link">Back</Button>
                            </Link>
                        </ButtonToolbar>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={3} sm={9}>{validationMessage}</Col>
                </FormGroup>
            </Form>
                {/* {validationMessage} */}
                <Toast
                    showing={this.state.toastVisible} 
                    message={this.state.toastMessage}
                    onDismiss={this.dismissToast} bsStyle={this.state.toastType}
                />
         </Panel>
        );
        
    }
}

IssueEdit.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired,
})
}