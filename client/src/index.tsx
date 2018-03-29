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
import SingUpForm from './components/SingUpForm';



ReactDom.render(
    <Router>
        <BaseLayout>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/singup" component={SingUpForm} />
        </BaseLayout>
    </Router>,

    document.getElementById('app') as HTMLElement
)