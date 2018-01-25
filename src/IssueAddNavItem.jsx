import React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, 
        ControlLabel, Button, ButtonToolbar } from 'react-bootstrap';
import Toast from './Toast.jsx';
import PropTypes from 'prop-types';
import  qs from 'query-string';



class IssueAddNavItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        showing: false,
        toastVisible: false, toastMessage: '', toastType: 'success',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.submit = this.submit.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    }

    showModal() {
        // console.log("show")
        this.setState({ showing: true });
    }
    hideModal() {
        // console.log("Hideeeeeeeeeeeeeeee")
        this.setState({ showing: false });
    }
    
    showError(message) {
        this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
    }
    dismissToast() {
        this.setState({ toastVisible: false });
    }

    submit(e) {
        e.preventDefault();
        this.hideModal();
        const form = document.forms.issueAdd;
        const newIssue = {
            owner: form.owner.value, title: form.title.value,
            status: 'New', created: new Date(),
        };

        fetch('/api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newIssue),
        }).then(response => {
            if (response.ok) {
                response.json().then(updatedIssue => {
                this.props.history.push(`/issues/${updatedIssue.new_issue._id}`);
            });
            } else {
                response.json().then(error => {
                this.showError(`Failed to add issue: ${error.message}`);
            });
    }
    }).catch(err => {
            this.showError(`Error in sending data to server: ${err.message}`);
    });
    }
    render() {
        // console.log("showing------> ",this.state.showing)
        return (
            <div>
                {/* <Button onClick={this.showModal}><Glyphicon glyph="plus" /> Create Issue</Button> */}
                <span onClick={this.showModal}><Glyphicon glyph="plus" /> Create Issue</span>
                <Modal show={this.state.showing} onHide={this.hideModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Issue</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form name="issueAdd">
                                <FormGroup>
                                    <ControlLabel>Title</ControlLabel>
                                    <FormControl name="title" autoFocus />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Owner</ControlLabel>
                                    <FormControl name="owner" />
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <ButtonToolbar>
                                <Button type="button" bsStyle="primary"  onClick={this.submit}>Submit</Button>
                                <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
                            </ButtonToolbar>
                        </Modal.Footer>
                </Modal>
                <Toast
                    showing={this.state.toastVisible} message={this.state.toastMessage}
                    onDismiss={this.dismissToast} bsStyle={this.state.toastType}
                />
            </div>
        );
    }
}

IssueAddNavItem.propTypes = {
    router: PropTypes.object,
};

export default withRouter(IssueAddNavItem);