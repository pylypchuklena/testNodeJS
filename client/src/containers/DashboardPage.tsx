import * as React from 'react';
import { AppState, User, Order } from '../types/userModel';
import { Toolbar, RaisedButton, ToolbarSeparator, ToolbarGroup } from 'material-ui';
import OrdersList from '../components/OrdersList';
import UsersList from '../components/UsersList';
import { connect, Dispatch } from 'react-redux';
import { Card, CardTitle } from 'material-ui';
import * as action from './../action';
import OrderPage from './OrderPage';
import Auth from '../models/Auth';

interface IState {
  buttonValue: ButtonType
  isAdmin: boolean
}

class DashboardPage extends React.Component<any, IState>{

  constructor(props: any) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
    Auth.getAuthUser().role
    this.state = {
      buttonValue: ButtonType.Orders,
      isAdmin: Auth.getAuthUser().role == "admin"
    }
  }

  handleButtonClick(type: ButtonType) {
    this.setState({
      buttonValue: type
    });
  };


  render() {
    var modifiedСontent;
    switch (this.state.buttonValue) {
      case ButtonType.Orders: {
        modifiedСontent = <OrdersList />
        break;
      }
      case ButtonType.Subscribers: {
        modifiedСontent = <UsersList />
        break;
      }
      case ButtonType.NewOrder: {
        modifiedСontent = <OrderPage />
        break;
      }
      default: {
        modifiedСontent = <OrdersList />
        break;
      }
    }

    return (
      <div className="dashboard-page">
        <div className="page-header header-filter clear-filter purple-filter bg">
        </div>
        <div className=" main main-raised">
          <div className="card_box">
            <Toolbar style={{ backgroundColor: 'transparent' }}>
              <ToolbarGroup>
                <RaisedButton
                  primary={(this.state.buttonValue == ButtonType.Orders) ? true : false}
                  label="Orders" onClick={() => { this.handleButtonClick(ButtonType.Orders) }} />
                {this.state.isAdmin ?
                  <RaisedButton
                    label="Subscribers"
                    primary={(this.state.buttonValue == ButtonType.Subscribers) ? true : false}
                    onClick={() => { this.handleButtonClick(ButtonType.Subscribers) }} />
                  :
                  <RaisedButton
                    label="New Order"
                    primary={(this.state.buttonValue == ButtonType.NewOrder) ? true : false}
                    onClick={() => { this.handleButtonClick(ButtonType.NewOrder) }} />
                }
              </ToolbarGroup>
            </Toolbar>
            <div >
              {modifiedСontent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

enum ButtonType {
  Orders = 1,
  Subscribers = 2,
  NewOrder = 3
}

export function mapStateToProps(state: AppState) {
  return {
  }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadOrders: () => { dispatch(action.getOrdersFromDB()) },
    loadUsers: () => { dispatch(action.getUsersFromDB()) },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);