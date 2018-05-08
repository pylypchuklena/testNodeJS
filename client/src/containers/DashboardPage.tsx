import * as React from 'react';
import { AdminDashboard } from '../components/AdminDashboard';
import { AppState, User, Order } from '../types/userModel';
import { connect, Dispatch } from 'react-redux';
import { Card, CardTitle } from 'material-ui';
import * as action from './../action';

interface IProps {
  users: Array<User>;
  orders: Array<Order>;
  loadUsers: () => void;
  loadOrders: () => void;
  deleteUser:(user:User) =>void;
  updateOrder: (order:Order) =>void;
}

class DashboardPage extends React.Component<IProps, any>{

  constructor(props: IProps) {
    super(props);
  }
  componentDidMount() {
    this.props.loadUsers(),
    this.props.loadOrders()
  }

  render() {
    if (this.props.users) {
      return (
        <div className="dashboard-page">
          <div className="page-header header-filter clear-filter purple-filter bg">
          </div>
          <div className=" main main-raised">
            <AdminDashboard 
              users={this.props.users}
              orders={this.props.orders}
              deleteUser={this.props.deleteUser}
              updateOrder = {this.props.updateOrder}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className="dashboard-page">
          <div className="page-header header-filter clear-filter purple-filter bg">
          </div>
          <div className=" main main-raised">
            <div className="card_box">
              <Card className="container_box text-left mrg">
                <CardTitle>There are no users yet</CardTitle>
              </Card>
            </div>
          </div>
        </div>
      )
    }
  }
}

export function mapStateToProps(state: AppState) {
  return {
    orders: state.orders,
    users: state.users
  }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadOrders: () => { dispatch(action.getOrdersFromDB()) },
    loadUsers: () => { dispatch(action.getUsersFromDB()) },
    updateOrder: (order:Order) => { dispatch(action.updateOrderInDB(order)) },
    deleteUser: (user:User) => { dispatch(action.deleteUserFromDB(user)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);