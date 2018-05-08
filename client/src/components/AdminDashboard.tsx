import * as React from 'react';
import { User, AppState, Order } from '../types/userModel';
import { Toolbar, RaisedButton, ToolbarSeparator, ToolbarGroup } from 'material-ui';
import OrdersList from './OrdersList';
import UsersList from './UsersList';
import { connect, Dispatch } from 'react-redux';
import * as action from './../action';

interface IDashboard {
  users: User[];
  orders: Order[];
  deleteUser: (user: User) => void;
  updateOrder: (order: Order) => void;
}

export class AdminDashboard extends React.Component<IDashboard, any>{

  /**
   *
   */
  constructor(props: IDashboard) {
    super(props);
    this.state = {
      buttonValue: '1',
      isActive: false
    }
    this.handleChangeSubscr = this.handleChangeSubscr.bind(this);
    this.handleChangeOrders = this.handleChangeOrders.bind(this);
  }
  handleChangeSubscr(e: any) {
    this.setState({
      buttonValue: '2'
    });
    
  };
  handleChangeOrders(e: any) {
    this.setState({
      buttonValue: '1'
    });
  };
  render() {
    console.log(this.state.buttonValue);
    var modifiedСontent;
    if (this.state.buttonValue == '1') {
      modifiedСontent = <OrdersList orders={this.props.orders} updateOrder={this.props.updateOrder} />
    }
    if (this.state.buttonValue == '2') {
      modifiedСontent = <UsersList users={this.props.users} onDeleteUser={this.props.deleteUser} />
    }

    return (

      <div className="card_box">
        <Toolbar>
          <ToolbarGroup>
            <RaisedButton
              primary={(this.state.buttonValue == '1') ? true : false}
              label="Orders" onClick={this.handleChangeOrders} />
            <RaisedButton
              label="Subscribers"
              primary={(this.state.buttonValue == '2') ? true : false}
              onClick={this.handleChangeSubscr} />
          </ToolbarGroup>
        </Toolbar>
        <div>
          {modifiedСontent}
        </div>
      </div>
    )
  }
}


export default AdminDashboard;

