import * as React from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import Auth from '../models/Auth';
class AuthorizeUser extends React.Component<any, any>{
  /**
   *
   */
  constructor(props: any) {
    super(props);

  }
  componentDidMount() {
    var user = Auth.getAuthUser();
    console.log(user)
  }
  render() {
    return (
      <div className="authorize_box">
       
          <CardHeader
            title={"Hello "+ 'user'}
            subtitle="email"
            avatar="./assets/user.png"
          />
      </div>

    )
  }

}
export default AuthorizeUser;