import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import BaseLayout from './components/BaseLayout';
import { PrivateRoute } from './components/PrivateRoute';
import { Logout } from './components/Logout';

import { HomePage } from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import DashboardPage from './containers/DashboardPage';


//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redusers';
import Profile from './components/Profile';
import { NotFound } from './components/NotFound';
import Auth from './models/Auth';
import * as action from './action';
import { DataTable } from './components/DataTable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BSLayout from './components/BSLayout';
import TestLoginPage from './components/TestLoginPage';



const store = createStore(rootReducer, applyMiddleware(thunk))

const authUser = Auth.getAuthUser();
if(authUser)
{
  store.dispatch(action.getOrdersFromDB());
  store.dispatch(action.getUsersFromDB());
  store.dispatch(action.getServicesFromDB());
}


ReactDom.render(
  <Provider store={store}>
    <MuiThemeProvider >

      <Router>
        {/* <BaseLayout> */}
        <BSLayout>
          <Switch>
            <Route exact path="/" component={TestLoginPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/logout" component={Logout} />
            <PrivateRoute path="/profile/:id" component={Profile} />
            <PrivateRoute path="/dashboard" CheckAdmin={true} component={DashboardPage} />
            <PrivateRoute path="/user_dashboard"  component={DashboardPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BSLayout>
        {/* </BaseLayout> */}
      </Router>

    </MuiThemeProvider>
  </Provider>
  ,

  document.getElementById('app') as HTMLElement
)