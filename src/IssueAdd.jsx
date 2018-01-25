import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

export default class IssueAdd extends React.Component{
 
    constructor(){
        super()
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.issueAdd;
        this.props.createIssue({
            owner : form.owner.value,
            title: form.title.value,
            status: 'New',
            created: new Date()
        });
        // clear the form for the next input
        form.owner.value = ""; form.title.value = "";
    }
    render(){
        // return(
        //     <div>
        //         <form name ="issueAdd" onSubmit={this.handleSubmit}>
        //             {/* <input type="text" name='status' placeholder="Status" /> */}
        //             <input type="text" name="owner" placeholder="Owner" />
        //             <input type="text" name="title" placeholder="Title" />
        //             <button>Add</button>
        //         </form>
        //     </div>
        // )

        return (
            <div>
                <Form inline name="issueAdd" onSubmit={this.handleSubmit}>
                    <FormControl name="owner" placeholder="Owner" />
                    {' '}
                    <FormControl name="title" placeholder="Title" />
                    {' '}
                    <Button type="submit" bsStyle="primary">Add</Button>
                    </Form>
            </div>
        );
    }
}