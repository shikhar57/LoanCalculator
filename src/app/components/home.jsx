import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Navbar from'./sidebar/sidebar';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <h1 style={{'text-align': 'center', 'padding-left': '12%', 'color': '#696969'}}>Loan-Interest Calculator</h1>
                <Navbar/>
            </React.Fragment>
        )
    }
}

export default Home;