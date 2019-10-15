import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import APITransport from "../../../../actions/apitransport/apitransport";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import _ from "lodash";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    details: {
        position: 'absolute',
        border: '1px solid #ddd',
        width: '50%',
        right: '5%',
        top: '13%',
        padding: '10px'
    },
    slider: {
        width: '100%'
    },
    values: {
        position: 'relative',
        bottom: '8px',
        left: '10px',
        color: '#696969',
    },
    amtRange: {
        height: '25px',
        '-webkit-appearance': 'none',
        margin: '10px 0',
        width: '60%',
        cursor: 'pointer',
        '&:focus': {
            outline: 'none'
        },
        '&::-webkit-slider-runnable-track': {
            width: '100%',
            height: '5px',
            cursor: 'pointer',
            background: '#2497E3',
            borderRadius: '1px',
            border: '0px solid #000000'
        },
        '&::-webkit-slider-thumb': {
            border: '1px solid #2497E3',
            height: '18px',
            width: '10px',
            borderRadius: '25px',
            background: '#A1D0FF',
            cursor: 'pointer',
            '-webkit-appearance': 'none',
            marginTop: '-7px'
        },
        '&::-moz-range-track': {
            width: '100%',
            height: '5px',
            cursor: 'pointer',
            animate: '0.2s',
            background: '#2497E3',
            borderRadius: '1px',
            border: '0px solid #000000'
        },
        '&::-moz-range-thumb': {
            border: '1px solid #2497E3',
            height: '18px',
            width: '18px',
            borderRadius: '25px',
            background: '#A1D0FF',
            cursor: 'pointer'
        }
    },
    durationRange: {
        height: '25px',
        '-webkit-appearance': 'none',
        margin: '10px 0',
        width: '60%',
        cursor: 'pointer',
        '&:focus': {
            outline: 'none'
        },
        '&::-webkit-slider-runnable-track': {
            width: '100%',
            height: '5px',
            cursor: 'pointer',
            background: '#2497E3',
            borderRadius: '1px',
            border: '0px solid #000000'
        },
        '&::-webkit-slider-thumb': {
            border: '1px solid #2497E3',
            height: '18px',
            width: '10px',
            borderRadius: '25px',
            background: '#A1D0FF',
            cursor: 'pointer',
            '-webkit-appearance': 'none',
            marginTop: '-7px'
        },
        '&::-moz-range-track': {
            width: '100%',
            height: '5px',
            cursor: 'pointer',
            animate: '0.2s',
            background: '#2497E3',
            borderRadius: '1px',
            border: '0px solid #000000'
        },
        '&::-moz-range-thumb': {
            border: '1px solid #2497E3',
            height: '18px',
            width: '18px',
            borderRadius: '25px',
            background: '#A1D0FF',
            cursor: 'pointer'
        }
    },
    data: {
        marginTop: '10px',
        color: '#696969',
        fontSize: '18px'
    }
})

class FormBuilder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            amtValue:500,
            durationValue:6
        }
    }
    componentWillReceiveProps(nextProps){
        if((nextProps.loanResults.principal !== this.props.loanResults.principal) || (nextProps.loanResults.numPayments !== this.props.loanResults.numPayments) && !_.isEmpty(nextProps.loanResults.principal)){
            this.setState({
                amtValue: nextProps.loanResults.principal.amount,
                durationValue: nextProps.loanResults.numPayments,
                details:{interest: nextProps.loanResults.interestRate,installment: nextProps.loanResults.monthlyPayment.amount}
            },()=>{
                document.getElementById('amt').value = this.state.amtValue;
                document.getElementById('duration').value = this.state.durationValue;
            })
        }
    }

    changeSliderAmtValue = (event)=> {
        this.setState({
            amtValue: event.target.value
        }, () => {
            this.props.calcLoan(this.state.amtValue, this.state.durationValue);
        })
    }


    changeSliderDurationValue = (event)=>{
        this.setState({
            durationValue:event.target.value
        },()=>{
        this.props.calcLoan(this.state.amtValue, this.state.durationValue);
            })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.details}>
               <div className={classes.slider}>
                    <input className={classes.amtRange} id={"amt"} name={"amt"} type="range" min ={500} max={5000} step={1} onChange={(event)=>this.changeSliderAmtValue(event)}/>
                   <span className={classes.values}>Amount : ${this.state.amtValue}</span>
                    <input className={classes.durationRange} id={"duration"} name={"duration"} type="range" defaultValue={6} min ={6} max={24} step={1} onChange={(event)=>this.changeSliderDurationValue(event)}/>
                   <span className={classes.values}>Duration : {this.state.durationValue} months</span>
              </div>
            {
                this.state.details !== undefined &&
                    <div className={classes.data}>
                        <div>Interest : {this.state.details.interest}</div>
                            <br/>
                        <div>Monthly Installment : ${this.state.details.installment}</div>
                    </div>
            }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        apistatus: state.apistatus,
        loanResults: state.loanResults
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FormBuilder)))