import React from 'react';
import PropTypes from 'prop-types';

export default class NumInput extends React.Component {

    constructor(props) {
        super(props);
        this.state  = { value : this.format(props.value) };
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(newProps) {
        //console.log("In componentwillReceive props settting state => ", this.state.value);
        this.setState({ value : this.format(newProps.value)});
        
        
    }

    onBlur(e){
        this.props.onChange(e,this.unformat(this.state.value));
       // console.log("In onBlur state => ", this.state.value);
        
    }

    onChange(e){
       // console.log("In child onChange() event value state => ", e.target.value);        
        if(e.target.value.match(/^\d*$/)){
            this.setState({value : e.target.value});
          //  console.log("In child onChange() setting state.value => ", this.state.value); 
        }
    }

    format(num){
       // console.log("In format() num => string ", num);        
        return num !=null ? num.toString() : '';
    }

    unformat(str){
      //  console.log("In unformat() string => num ", str);        
        
        const val = parseInt(str, 10);
        return isNaN(val) ? null : val;
    }

    render(){
        return(
            <input
                type="text" {...this.props} value={this.state.value}
                onBlur={this.onBlur} onChange={this.onChange}
            />
            );
    }
}

NumInput.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    };