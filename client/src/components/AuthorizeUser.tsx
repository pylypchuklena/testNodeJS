import * as React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import Auth from '../models/Auth';
import { User, Order, AppState } from '../types/userModel';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Notification from 'material-ui/svg-icons/social/notifications-active'
import { connect } from 'react-redux';
import { OrderStatus } from '../models/Enums';
interface IState {
  user: User
}
interface IProps {
  orders: Array<Order>;
}

class AuthorizeUser extends React.Component<IProps, IState>{
  /**
   *
   */
  constructor(props: IProps) {
    super(props);
    this.state = {
      user: new User(),
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
    var notifeOrders = 0;
    this.props.orders.map((item: Order) => {
      if (this.state.user.role == "admin") {
        if (item.orderStatus == OrderStatus.Pending) {
          notifeOrders += 1
        }
      } else {
        if (item.orderStatus == OrderStatus.Confirmed) {
          notifeOrders += 1
        }
      }
    })

    if (notifeOrders > 0) {
      notification =
        <div className='icon-notification'>
          <Link to={(this.state.user.role=='admin')?"/dashboard":"/user_dashboard"} className="wrapIconWithNumb">
            <span>{notifeOrders}</span>
            <Notification style={{ fill: '#00bcd4' }} />
          </Link>
        </div>
    } else {
      notification =
        <div className='icon-notification'>
          <div className="wrapIconWithNumb">
            <span>{notifeOrders}</span>
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

export function mapStateToProps(state: AppState) {
  return {
    orders: state.orders
  }
}
export default connect(mapStateToProps)(AuthorizeUser);