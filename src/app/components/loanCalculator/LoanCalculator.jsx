import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import APITransport from "../../actions/apitransport/apitransport";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import LoanCalcInput from "./loanCalcInput/LoanCalcInput";
import GetLoanAPI from "../../actions/apis/loan/GetLoanAPI";
import _ from 'lodash';

class LoanCalculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentWillReceiveProps(nextProps){
         if((nextProps.loanResults.principal !== this.props.loanResults.principal) || (nextProps.loanResults.numPayments !== this.props.loanResults.numPayments) && !_.isEmpty(nextProps.loanResults.principal)){
            if(localStorage.getItem('loans') !== null){
                let details = JSON.parse(localStorage.getItem('loans'));
                details.push({loanAmt : this.state.loanAmt, loanDuration : this.state.loanDuration});
                details = _.uniqWith(details, _.isEqual);
                localStorage.setItem('loans',JSON.stringify(details));
            }else{
                let details = [];
                details.push({loanAmt : this.state.loanAmt, loanDuration : this.state.loanDuration});
                localStorage.setItem('loans',JSON.stringify(details));
            }
        }
    }

    calcLoan = (loanAmt, loanDuration) =>{
        this.setState({
            loanAmt : loanAmt,
            loanDuration : loanDuration
        })
        let albumObj = new GetLoanAPI({loanAmt:loanAmt, loanDuration:loanDuration});
        this.props.APITransport(albumObj);
    }

    render() {
        return (
            <React.Fragment>
                <LoanCalcInput calcLoan={this.calcLoan}/>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        apistatus: state.apistatus,
        loanResults : state.loanResults
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoanCalculator))