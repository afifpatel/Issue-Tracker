import React from 'react';
import 'whatwg-fetch';
import Marker from './Marker.jsx';

function MarkerCluster(props){
    console.log("Marker Cluster ",props)
    const markerRows= props.markers_prop.map( i => <MarkerRow key={i.owner} row_value={i} />)
    return(
        <Marker
        onClick={props.onClick}
        { ...markerRows}
        />
    )
}

const MarkerRow = (props) => {
    consol.log("prop coords", props.location)
    return(
       <td>{props.row_value.location}</td>
    )
}

export default class MarkerComponent extends React.Component{

    constructor(){
        super();
        this.state = {
             landmarks_state : [] ,
        }
    }
    componentDidMount(){
        this.loadData();
    }

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
        console.log("Markers state",this.state.landmarks_state)

        if(this.state.landmarks_state !== null)
        return (
            <MarkerCluster markers_prop={this.state.landmarks_state} onClick={this.props.onClick}></MarkerCluster>
        );
        else 
        return null
    }
}