import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Auth from '../models/Auth';
import { connect, Dispatch } from 'react-redux';
import * as action from './../action'

export class Logout extends React.Component<any, any>{
  /**
   *
   */
  constructor(props: any) {
    super(props);
  }
  componentWillMount() {
    Auth.deauthenticateUser();
  }
  render() {
    return (
      <Redirect to='/' />
    )
  }

}
export default Logout;
