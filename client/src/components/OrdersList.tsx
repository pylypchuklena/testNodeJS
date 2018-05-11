import * as React from 'react';
import { List, ListItem, Card, CardTitle } from 'material-ui';
import { Order, AppState, User, Service } from '../types/userModel';
import Divider from 'material-ui/Divider';
import Message from "material-ui/svg-icons/image/lens";
import Done from "material-ui/svg-icons/action/done";
import Cancel from "material-ui/svg-icons/content/clear";
import Auth from '../models/Auth';
import { Link } from 'react-router-dom';
import OrderDetail from './OrderDetail';
import { Dispatch, connect } from 'react-redux';
import * as action from './../action';
import { OrderStatus } from '../models/Enums';

interface IProps {
  users: Array<User>;
  services: Array<Service>;
  orders: Array<Order>;
  updateOrder: (order: Order) => void;
  getServices: () => void;
}

interface IState {
  orders: Array<OrderItemViewModel>,
  selectedItem: OrderItemViewModel,
  selectedOrder: string
}

export function mapStateToProps(state: AppState) {
  return {
    orders: state.orders,
    users: state.users,
    services: state.services
  }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    updateOrder: (order: Order) => { dispatch(action.updateOrderInDB(order)) },
    getServices: () => { dispatch(action.getServicesFromDB()) },
  };
}

class OrdersList extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.state = {
      orders: Array<OrderItemViewModel>(),
      selectedItem: null,
      selectedOrder: null
    }
  }
 
  componentWillMount() {
    this.props.getServices();
    this.setState({
      orders: this.props.orders.map(x => {
        return new OrderItemViewModel(
          false,
          x,
          this.props.users.filter(user => user.id == x.userId)[0],
          this.props.services)
      })
    })
  }
  componentWillReceiveProps() {
    console.log('recive', this.props.orders)
    this.setState({
      orders: this.props.orders.map(x => {
        return new OrderItemViewModel(
          false,
          x,
          this.props.users.filter(user => user.id == x.userId)[0],
          this.props.services)
      })
    })
  }

  onRowSelect(item: OrderItemViewModel) {
    var selectedOrder = item.model.orderId
    this.setState({ selectedItem: item, selectedOrder: selectedOrder });
  }

  render() {
    var bodyListOrder;
    var pendingOrders = 0;
    if (this.props.orders) {
      bodyListOrder = this.state.orders.map((item: OrderItemViewModel) => {
        var dayOfOrder = new Date(item.model.dayOfOrder).toLocaleString();
        var orderOnDay = new Date(item.model.orderDate).toLocaleString();
        
        if(item.model.orderStatus ==OrderStatus.Pending){
          pendingOrders +=1
        }
        var statusIcon =<></>;
        switch(item.model.orderStatus){
          case OrderStatus.Pending: {
           statusIcon = <Message className="pending" /> 
            break;
          }
          case OrderStatus.Done: {
            statusIcon = <Done className="done"/>
            break;
          }
          case OrderStatus.Canceled: {
            statusIcon = <Cancel className="canceled"/>
            break;
          }
          default: {
            statusIcon = <></>
            break;
          }
        }

        return (
          <ListItem key={item.model.orderId}
            className={((this.state.selectedOrder == item.model.orderId) ? 'isActive' : ' ') + " "}
            primaryText={orderOnDay.slice(0, -3)}
            leftIcon={statusIcon}
            onClick={() => { this.onRowSelect(item) }}
            secondaryText={
              <div className='flex-between'>
                <span>{(item.user.firstName) ? item.user.firstName : ''} {(item.user.lastName) ? item.user.lastName : ''}</span>
                <ul className='flex-between icons-service'>
                  {item.getServices().map(x => {
                    var fileName = "./assets/img/icons/service_" + x.type.toString() + ".svg";
                    return (<li key={x.type}><span className="icon ">
                      <img src={fileName} alt="icon" />
                    </span></li>)
                  }
                  )}
                </ul>
              </div>
            }
          />
        )
      })

    }
    if (bodyListOrder.length == 0) {
      bodyListOrder =
        <div className="flex-around">
          <span>No orders yet.  </span>
          <Link to="/order"> Do first order</Link>
        </div>
    }

    return (
      <div className="flex-between boxOrders">
        <div className="col col-1">
          <Card className="boxOrders__list text-left mrg">
          <span className="boxOrders__notice">{pendingOrders} in pending</span>
            <CardTitle>Orders</CardTitle>
            <Divider />
            <div className="wrapList">
              <List>
                {bodyListOrder}
              </List>
            </div>
          </Card>
        </div>
        <div className="col col-2">
          {this.state.selectedItem != null ?
            <OrderDetail orderViewModel={this.state.selectedItem} updateOrder={this.props.updateOrder} />
            :
            <Card className="mrg"><CardTitle>Select order from list</CardTitle></Card>
          }
        </div>
      </div>
    )
  }
}

export class OrderItemViewModel {
  selected: boolean;
  model: Order;
  user: User;
  services: Service[]
  getServices() {
    return this.services.filter(x => this.model.type.indexOf(x.type.toString()) >= 0)
  }

  constructor(_selected: boolean, _model: Order, _user: User, _services: Service[]) {
    this.selected = _selected;
    this.model = _model;
    this.user = _user;
    this.services = _services;
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);