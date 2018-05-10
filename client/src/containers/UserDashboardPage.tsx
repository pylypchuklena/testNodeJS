import * as React from 'react';
import { AppState, Order } from '../types/userModel';
import { connect, Dispatch } from 'react-redux';
import { Card, CardTitle } from 'material-ui';
import * as action from './../action';
import OrdersList from '../components/OrdersList';
import { Toolbar, RaisedButton, ToolbarSeparator, ToolbarGroup } from 'material-ui';
import { Link } from 'react-router-dom';

interface IProps {
  orders: Array<Order>;
  loadOrders: () => void;
  updateOrder: (order: Order) => void;
}

class UserDashboardPage extends React.Component<IProps, any>{

  constructor(props: IProps) {
    super(props);

  }
  componentDidMount() {
    this.props.loadOrders()
  }
  render() {return <></>
    // if (this.props.orders) {
    //   return (
    //     <div className="dashboard-page">
    //       <div className="page-header header-filter clear-filter purple-filter bg">
    //       </div>
    //       <div className=" main main-raised">
    //         <div className="card_box">
    //           <Toolbar style={{ backgroundColor: 'transparent' }}>
    //             <ToolbarGroup>
    //               <Link to="/order" className="options__button">
    //                 <RaisedButton
    //                   label="Do order"
    //                   labelPosition="before"
    //                   primary={true}
    //                 />
    //               </Link>
    //             </ToolbarGroup>
    //           </Toolbar>
    //           <div>
    //             <OrdersList orders={this.props.orders} updateOrder={this.props.updateOrder} />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // } else {
    //   return (
    //     <div className="dashboard-page">
    //       <div className="page-header header-filter clear-filter purple-filter bg">
    //       </div>
    //       <div className=" main main-raised">
    //         <div className="card_box">
    //           <Card className="container_box  text-left mrg">
    //             <CardTitle>There are no orders yet</CardTitle>
    //           </Card>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // }
  }
}

export function mapStateToProps(state: AppState) {
  return {
    orders: state.orders
  }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadOrders: () => { dispatch(action.getOrdersFromDB()) },
    updateOrder: (order: Order) => { dispatch(action.updateOrderInDB(order)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardPage);