import * as React from 'react';
import { Route, Redirect } from 'react-router';
import Auth from '../models/Auth';
import { HomePage } from './HomePage';



export class PrivateRoute extends React.Component<any, any>{
  /**
   *
   */
  constructor(props: any) {
    super(props);

  }

  render() {
    var comfirm = true;
    if (this.props.CheckAdmin)
      comfirm = Auth.getAuthUser() && Auth.getAuthUser().role.toLocaleLowerCase() == "admin"

    if (Auth.isUserAuthenticated() && comfirm)
      return (
        <Route {...this.props} />
      )

    return (<Redirect to='/login' />)
  }
}
export default PrivateRoute;