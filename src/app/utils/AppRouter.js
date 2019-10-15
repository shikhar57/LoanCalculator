import React, { Component } from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';
import Home from '../components/home';

class AppRouter extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}  />
            </Switch>
        );

    }

}

export default AppRouter;