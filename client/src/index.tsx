import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import BaseLayout from './components/BaseLayout';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { PrivateRoute } from './components/PrivateRoute';
import { DashboardPage } from './containers/DashboardPage';
import {Logout} from './components/Logout';


ReactDom.render(
    <MuiThemeProvider>
    <Router>
        <BaseLayout>
            <PrivateRoute exact path="/" component={DashboardPage}/>
            <Route  path="/login" component={LoginPage} />
            <Route  path="/signup" component={SignUpPage} />
            <Route  path="/logout" component={Logout} />
        </BaseLayout>
    </Router>
    </MuiThemeProvider>
    ,

    document.getElementById('app') as HTMLElement
)