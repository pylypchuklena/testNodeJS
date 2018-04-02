import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import BaseLayout from './components/BaseLayout';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDom.render(
    <MuiThemeProvider>
    <Router>
        <BaseLayout>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
        </BaseLayout>
    </Router>
    </MuiThemeProvider>
    ,

    document.getElementById('app') as HTMLElement
)