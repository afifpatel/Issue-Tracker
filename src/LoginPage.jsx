import React from 'react';
import { FormGroup, FormControl, Modal, ControlLabel, ButtonToolbar, Button, Checkbox,
    Panel, Form, Row, Col, Alert, Image, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import {loggedIn, invalidCred, loggedOut, validateInput, clearError, clearUsernameError, clearPasswordError} from './action.jsx'




import store from './store.jsx';

@connect( store => {
    return {
        isLoggedIn : store.isLoggedIn,
        username : store.username,
        location : store.location,
        landmarks : store.landmarks
    };
})
class LoginPage extends React.Component {

    
    constructor(props){
        super(props);
        this.state = {
            username:'',
            location:'',
            landmarks:{},
            //errors : {},
            isLoading : false,
            showingValidation: false,                                  //Bootstrap validation
        //    toastVisible: false, toastMessage: '', toastType: 'success',
        }

        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.isValid=this.isValid.bind(this);
       // this.componentDidMount(){
    //     this.props.dispatch(loggedOut());
    // }
        // this.showError=this.showError.bind(this);
        this.dismissValidation=this.dismissValidation.bind(this);
    
    }

    // 
    onChange(e){
        this.setState({[e.target.name] : e.target.value })
        console.log("CHANGINGGGGGGGGG")
        console.log("TARGETTTTTTTT",e.target.value)

        if(e.target.value !== '' && e.target.name === "username"){
            console.log("TARGETTTTTTTT",[e.target.name])
            this.props.dispatch(clearUsernameError())
        }
        if(e.target.value !== '' && e.target.name === "password"){
            console.log("TARGETTTTTTTT",[e.target.name])
            this.props.dispatch(clearPasswordError())
        }
        // console.log(this.state)
    }



    isValid(){
        let isValid = null;
        // this.props.dispatch(validateInput(this.state.username,this.state.password))
        const { username,password } = this.state
        console.log("ERRORDSSSSSSSSSS: ", username, password)
        if(username !== '' && password !== '' )
            isValid = true;
        else
            isValid = false;
        return isValid;
    }

    onSubmit(e){       
        e.preventDefault();
        var form = document.forms.loginValidate;
        console.log("username and password", form.username.value,form.password.value);
        let valid = false;
        valid = this.isValid();
        console.log("valid status", valid)

        if(valid && form.password.value === 'pass' && (form.username.value === 'userA' || form.username.value === 'userB' || form.username.value ==='userC')){
            console.log("before dispatch ", this.state.username)
            this.props.dispatch(loggedIn(this.state.username))
            this.setState({ username: form.username.value, isLoading: true})
        } else {
            this.props.dispatch(invalidCred())
            this.setState({ showingValidation : true})
           // this.showError("Invalid user credentials.")
        }
    }

    // showError(message) {
    //     this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
    // }

    dismissValidation() {
        this.setState({ showingValidation : false });
        this.props.dispatch(clearError())
    }

    render() {
        const { isLoggedIn, username, location, landmarks } = this.props;

        let validationMessage = null;
        if (this.state.showingValidation) {
                validationMessage = (
                    <Alert bsStyle="danger" onDismiss={this.dismissValidation}>
                        <div style={{fontSize : '15px'}}>Invalid username or password</div>
                    </Alert>
                    // <div className="LoginError" style={{ color : 'red'}}>
                    //     <h5>Invalid Username/Password</h5>
                    // </div>
                );
        }
        console.log("STATE BEFORE  RETURN ", this.props)

        let emptyUsername = null
        if(username === null || username === undefined)
            emptyUsername=(<div className="css_empty">Username is required</div>)

        // let emptyPassword = null
        // if(errors.password)
        //     emptyPassword=(<div className="css_empty">Password is required</div>)
    

        // console.log("emptyUser value", emptyUsername)

        return (
            <div className="login">
                <Image className="img" src="./image5.jpg" responsive />
                <div className="static-modal" >
                    <Modal.Dialog bsSize="sm">
                        <Modal.Header>
                        <Modal.Title><i className="fas fa-lock fa-3x"></i>
                        </Modal.Title>
                        </Modal.Header>
                        {validationMessage}                    
                        <Form name="loginValidate" onSubmit={this.onSubmit} bsStyle="css_form">
                        <Modal.Body>
                        <FormControl name="username" placeholder="Username" onChange={this.onChange}
                                />
                        <div  style={{color : 'black', paddingLeft :'5px'}}>{emptyUsername}</div>
                        <FormControl type="password" name="password"  
                                placeholder="Password" onChange={this.onChange} 
                                style={{marginTop : '10px'}}/>
                        {/* <div  style={{color : 'black', paddingLeft :'5px'}}>{emptyPassword}</div> */}
                        </Modal.Body>

                        <Modal.Footer>
                        <Button type="submit"  disabled={this.state.isLoading} ><i className="fas fa-sign-in-alt fa-2x"></i></Button>
                        </Modal.Footer>
                        </Form>
                    </Modal.Dialog>
                </div>;
            </div>
        );
    } 
}


export default LoginPage;
