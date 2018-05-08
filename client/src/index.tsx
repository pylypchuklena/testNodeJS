import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { HomePage } from './components/HomePage';
import BaseLayout from './components/BaseLayout';
import { PrivateRoute } from './components/PrivateRoute';
import { Logout } from './components/Logout';

import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import DashboardPage from './containers/DashboardPage';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redusers';
import Profile from './components/Profile';
import OrderPage from './containers/OrderPage';
import { NotFound } from './components/NotFound';
import UserDashboardPage from './containers/UserDashboardPage';
import Auth from './models/Auth';
import * as action from './action';

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
    <MuiThemeProvider>

      <Router>
        <BaseLayout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/logout" component={Logout} />
            <PrivateRoute path="/profile/:id" component={Profile} />
            <PrivateRoute path="/order" component={OrderPage} />  
            <PrivateRoute path="/dashboard" CheckAdmin={true} component={DashboardPage} />
            <PrivateRoute path="/user_dashboard"  component={UserDashboardPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BaseLayout>
      </Router>

    </MuiThemeProvider>
  </Provider>
  ,

  document.getElementById('app') as HTMLElement
)