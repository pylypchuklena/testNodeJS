import * as React from 'react';
import { AppState, Order } from '../types/userModel';
import { connect, Dispatch } from 'react-redux';
import { Card, CardTitle } from 'material-ui';
import * as action from './../action';
import OrdersList from '../components/OrdersList';

interface IProps {
  orders: Array<Order>;
  loadOrders: () => void;
}

class UserDashboardPage extends React.Component<IProps, any>{

  constructor(props: IProps) {
    super(props);

  }
  componentDidMount() {
    this.props.loadOrders()
  }
  render() {
    if (this.props.orders) {
      return (
        <div className="dashboard-page">
          <div className="page-header header-filter clear-filter purple-filter bg">
          </div>
          <div className=" main main-raised">
            <OrdersList orders={this.props.orders}/>
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
              <Card className="container_box  text-left mrg">
                <CardTitle>There are no orders yet</CardTitle>
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
    orders: state.orders
  }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadOrders: () => { dispatch(action.getOrdersFromDB()) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardPage);