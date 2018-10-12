export function loggedIn(data){
    console.log("In loggedIn()", data)
    return {
        type : "LOGGED_IN",
        payload : data,
    }
}
export function getLandmarks(data){
    console.log("In getLandmarks()")
    return {
        type : "SET_LANDMARKS_STATE",
        payload : data,
    }
}
export function invalidCred(){
    return {
        type: 'ERROR',
        payload : window.location.pathname,

    }
}

export function initialState(){
    return {
        type: 'INITIALISE',
        payload : window.location.pathname,

    }
}

export function loggedOut(){
    return {
        type: 'LOGGED_OUT',
        payload : window.location.pathname,

    }
}

export function validateInput(username,password){
    let errors = {}
    console.log("in action validateInput", username, password)

    if(username === '') {
        console.log("Username is required")
        errors.username = 'Username is required'
    }

    if(password === '') {
        console.log("Password is required")
        errors.password = 'Password is required'
    }

    console.log("errors set----->", errors)


    return {
        type: 'CHECK_VALID',
        payload : errors,

    }
}

export function clearError(){
    return {
        type: 'CLEAR_ERROR',
        //payload : window.location.pathname,

    }
}

export function clearUsernameError(){
    let errors={};
    errors.username='';
    return {
        type: 'CLEAR_USERNAME_ERROR',
        payload : errors

    }
}

export function clearPasswordError(){
    let errors={};
    errors.password='';
    return {
        type: 'CLEAR_PASSWORD_ERROR',
        payload : errors
        //payload : window.location.pathname,

    }
}

export function userLoggedOut(){
    return {
        type : 'USER_LOGOUT'
    }
}