import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { HomePage } from './components/HomePage';
import BaseLayout from './components/BaseLayout';
import { PrivateRoute } from './components/PrivateRoute';
import { Logout } from './components/Logout';

import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import { DashboardPage } from './containers/DashboardPage';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redusers';

const store = createStore(rootReducer)
console.log(store.getState());
ReactDom.render(
  <Provider store={store}>
    <MuiThemeProvider>

      <Router>
        <BaseLayout>
          <PrivateRoute exact path="/" component={DashboardPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/logout" component={Logout} />
        </BaseLayout>
      </Router>

    </MuiThemeProvider>
  </Provider>
  ,

  document.getElementById('app') as HTMLElement
)