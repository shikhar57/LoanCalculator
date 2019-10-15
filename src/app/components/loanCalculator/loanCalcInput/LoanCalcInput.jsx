import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import APITransport from "../../../actions/apitransport/apitransport";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import FormBuilder from'./formBuilder/formBuilder';

class LoanCalcInput extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <FormBuilder calcLoan={this.props.calcLoan}/>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        apistatus: state.apistatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoanCalcInput))