import * as React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import Auth from '../models/Auth';
import { User, Order } from '../types/userModel';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Notification from 'material-ui/svg-icons/social/notifications-active'
interface IState {
  user: User,
  notification: number,
  // orders: Order[]
}
class AuthorizeUser extends React.Component<any, IState>{
  /**
   *
   */
  constructor(props: any) {
    super(props);
    this.state = {
      user: new User(),
      notification: 15,
      // orders:[]
    }
  }

  componentDidMount() {
    var userLocal = Auth.getAuthUser();
    this.setState({
      user: userLocal
    })
  }
  render() {
    var notification;
    if (this.state.notification > 0) {
      notification =
        <div className='icon-notification'>
          <Link to={"/dashboard"} className="wrapIconWithNumb">
            <span>{this.state.notification}</span>
            <Notification style={{ fill: '#00bcd4' }} />
          </Link>
        </div>
    } else {
      notification =
        <div className='icon-notification'>
          <div className="wrapIconWithNumb">
            <span>{this.state.notification}</span>
            <Notification />
          </div>
        </div>
    }
    return (
      <div className="authorize_box flex-between"  >
        <Link to={"/profile/" + this.state.user.id}>
          <CardHeader
            title={"Hello, " + this.state.user.firstName}
            subtitle={this.state.user.email}
            avatar="./assets/user.png"
          >
          </CardHeader>
        </Link>

        {notification}
      </div>
    )
  }

}
export default AuthorizeUser;