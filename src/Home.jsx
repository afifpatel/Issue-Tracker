import React from 'react';
import { ViewMap } from './ViewMap.jsx';

export default class Home  extends React.Component{

    constructor(){
        super();
        this.state = {
            landmarks: []
            }
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
                // landmark.location = "lat:" + landmark.location.lat + " long: " + landmark.location.lng
        });
            this.setState({ landmarks : data.records});
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
     
        return(
            <ViewMap landmarks={this.state.landmarks} />
        )
    }
}