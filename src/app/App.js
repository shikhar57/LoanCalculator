import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import APITransport from './actions/apitransport/apitransport';
import AppRouter from './utils/AppRouter'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <AppRouter/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))