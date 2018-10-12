import React from 'react'               //import npm installed libs...replacement to html script includes
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { Switch, Redirect, browserHistory} from 'react-router';
import {connect}  from 'react-redux';
import  { loggedIn, initialState, userLoggedOut, getLandmarks } from './action.jsx'
import App from './App.jsx';
import LandmarkList from './LandmarkList.jsx';
import ViewMap from './ViewMap.jsx'
import LoginPage from './LoginPage.jsx';
import Logout from './Logout.jsx';
import LandmarkEdit from './LandmarkEdit.jsx'

const NoMatch = () => <p>Page Not Found</p>;


@connect( store => {
    return {
        isLoggedIn : store.isLoggedIn,
    };
})

class RoutedApp extends React.Component {

// componentDidMount(){
//     this.loadData()
// }

// componentDidUpdate(prevProps) {

//     console.log("In ComponentDidUpdateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
//     console.log("PrevProps",prevProps.isLoggedIn)
//     console.log("this.props",this.props.isLoggedIn)


//     const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
//     const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn
//     const isIn = prevProps.isLoggedIn && this.props.isLoggedIn 

//     if(isLoggingOut)
//         this.props.dispatch(userLoggedOut())

//     if(isLoggingIn) {
//         this.props.dispatch(loggedIn())
//     }

//     // this.loadData();
// }

// loadData(){
//     fetch(`/api/landmarks`).then(response =>{
//         if(response.ok){
//             response.json().then(data => {
//             console.log("total count of recordsssss :",data._metadata.total_count);
//             data.records.forEach( landmark => {
//             if (landmark.date)
//                 landmark.date=new Date(landmark.date);
//             landmark.location = "lat:" + landmark.location.lat + " long: " + landmark.location.lng
//     });
//         this.props.dispatch(getLandmarks(data.records))
//         });
//     } else {
//             respons.json().then( err =>{
//                 // alert("Failed to fetch issues:" + error.message)
//                 this.showError(`Failed to fetch issues ${error.message}`);
//             });
//         }
//     }).catch(err => {
//         // alert("Error in fetching data from server:", err);
//         this.showError(`Error in fetching data from server: ${err}`);
//     });
// }


render(){

    const { isLoggedIn } = this.props;
    console.log("App render() isLoggedIn value : ", isLoggedIn);
     
    return(
        <Router history={browserHistory}>
            {isLoggedIn ? (
            <App isLoggedIn={isLoggedIn}>
            <Switch>
            <Route exact path="/landmarks" component={withRouter(LandmarkList)} />
            {/* <Route exact path="/" component={LoginPage} /> */}
            <Route exact path="/home" component={ViewMap} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/landmark/:id" component={LandmarkEdit} />
            <Redirect from="*" to="/home" />

            {/* <Redirect from="/" to="/issues" /> */}
            </Switch>
            </App>
            ) :(
            <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Redirect from="/" to="/login" />
            </Switch>
            )}
        </Router>
    )
    
}
}

export default RoutedApp;
