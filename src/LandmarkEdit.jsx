import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Row,Col, Alert } from 'react-bootstrap';
import Toast from './Toast.jsx';

export default class LandmarkEdit extends React.Component {
    
    constructor(){
        super();
        this.state = {
            landmark_state: {
                _id: '', owner: '', 
                location: {
                    lat: 0,
                    lng:0
                },
                 date: '',
                 text: ''
            },
            invalidFields: {}, 
            showingValidation: false,                                  //Bootstrap validation
            toastVisible: false, toastMessage: '', toastType: 'success',
        };
        this.onChange = this.onChange.bind(this);
        this.onValidityChange = this.onValidityChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteLandmark =this.deleteLandmark.bind(this);
        this.dismissValidation = this.dismissValidation.bind(this);   //Bootstrap validation
        this.showValidation = this.showValidation.bind(this);         //Bootstrap validation
        this.showSuccess = this.showSuccess.bind(this);
        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
    }
    
    componentDidMount(){
        this.loadData();
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

    onChange(event){
        // console.log(event.target.value)
        // console.log("in Parent's OnChange ... event.target.value  and  convertedValue", event.target.value,convvertedValue)        
        const landmark = Object.assign({}, this.state.landmark_state);
        //issue[event.target.name] = event.target.value;
        switch(event.target.name){
            case "latitude":{
                landmark.location.lat=event.target.value;
                break;
            }
            case "longitude":{
                landmark.location.lng=event.target.value;
                break;
            }
            case "text":{
                landmark.text=event.target.value;
                break;
            }

        }
        // landmark[event.target.name] = value;
        this.setState({ landmark_state : landmark });
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
        console.log("before put  Landmark_State", this.state.landmark_state)

        fetch(`/api/landmark/${this.props.match.params.id}`,{
            method : 'PUT',
            headers : { 'Content-Type' : 'application/json'},
            body: JSON.stringify(this.state.landmark_state),
        }).then (response => {
            if(response.ok) {
                response.json().then(updatedLandmark => {
                    if (updatedLandmark.date) {
                        updatedLandmark.date = new Date(updatedLandmark.date);
                    }
                    // updatedLandmark.location = "lat:" + updatedLandmark.location.lat + " long: " + updatedLandmark.location.lng
console.log("Updated Landmark", updatedLandmark)
                    this.setState({landmark_state : updatedLandmark});
                    // alert('Updated issue successfully');
                    this.showSuccess('Updated Landmark successfully.');
                    this.props.history.push(`/landmarks`);
                });
            } else {
                response.json().then( error => {
                    // alert(`Failed to update issue: ${error.message}`);
                    this.showError(`Failed to update landmark: ${error.message}`);
                });
            }
        }).catch(err => {
            // alert(`Error in sending data to server: ${err.message}`);
            this.showError(`Error in sending data to server: ${err.message}`);
        });
    }

    loadData(){
        fetch(`/api/landmark/${this.props.match.params.id}`).then( response => {
          if (response.ok) {
              response.json().then( landmark =>{
                  landmark.date=landmark.date != null ? new Date(landmark.date) : null;
                  //issue.effort = issue.effort != null ? issue.effort.toString() : '';
                //   landmark.location.lat = "lat:" + landmark.location.lat + " long: " + landmark.location.lng
                  this.setState({ landmark_state : landmark });
              });
          } else {
              response.json().then (error => {
                //   alert(`Failed to fetch issue: ${error.message}`);
                this.showError(`Failed to fetch landmark: ${error.message}`);
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

    deleteLandmark() {
        fetch(`/api/landmark/${this.props.match.params.id}`, { method : 'delete' }).then(response => {
            if(!response.ok) console.log("Not ok");
            else this.props.history.push(`/landmarks`);
            ;
        }).catch(err => {
        })
     }

    render(){
        const landmark = this.state.landmark_state;
        let validationMessage = null;
        if (Object.keys(this.state.invalidFields).length !== 0 && this.state.showingValidation) {
                validationMessage = (
                    <Alert bsStyle="danger" onDismiss={this.dismissValidation}>
                        Please correct invalid fields before submitting.
                    </Alert>
                );
        }

        return( 
          <Panel bsStyle="info">
            <Panel.Heading>
                <div className="panel_heading">
                    <span className="heading_close">
                        <Link to="/landmarks">
                            <Button bsStyle="link"><i className="fas fa-window-close fa-lg"></i></Button>
                        </Link>
                    </span>
                    <span className="heading_title">Edit Landmark</span>
                </div>
            </Panel.Heading>
            <Panel.Body>
            <Form horizontal onSubmit={this.onSubmit}>
            <Row>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>Owner</Col>
                    <Col sm={6}>
                        <FormControl.Static>{landmark.owner}</FormControl.Static>
                    </Col>
                </FormGroup>
            </Row>    
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>Date</Col>
                    <Col sm={6}>
                        <FormControl.Static>{landmark.date ? landmark.date.toDateString() : ''}</FormControl.Static>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>Latitude</Col>
                    <Col sm={3}>
                        < FormControl name="latitude" value={landmark.location.lat} onChange={this.onChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>Longitude</Col>
                    <Col sm={3}>
                        < FormControl name="longitude" value={landmark.location.lng} onChange={this.onChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                        <Col componentClass={ControlLabel} sm={3}>Text</Col>
                        <Col sm={6}>
                            < FormControl name="text" componentClass="textarea" value={landmark.text} onChange={this.onChange} />
                        </Col>
                </FormGroup>
                
                <FormGroup>
                    <Col smOffset={3} sm={6}>
                        <ButtonToolbar>
                            <Button bsStyle="primary" type="submit" >Submit</Button>
                            {/* <Link to="/landmarks">
                                <Button bsStyle="link">Back</Button>
                            </Link> */}
                        <Button bsStyle="danger" onClick={this.deleteLandmark} >Delete</Button>

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
                </Panel.Body>
         </Panel>
        );
        
    }
}

LandmarkEdit.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired,
})
}