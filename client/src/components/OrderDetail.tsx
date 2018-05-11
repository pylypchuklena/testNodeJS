import * as React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { User, Order, AppState } from '../types/userModel';
import * as action from '../action';
import Divider from 'material-ui/Divider';
import { OrderItemViewModel } from './OrdersList';
import { OrderStatus } from '../models/Enums';
import Message from "material-ui/svg-icons/image/lens";
import Done from "material-ui/svg-icons/action/done";
import Cancel from "material-ui/svg-icons/content/clear";
import { Dispatch, connect } from 'react-redux';
import Auth from '../models/Auth';


const style = {
  statusIcon: {
    height: '16px',
    width: '16px'
  },
  done: {
    color: '#008000'
  }
}
interface IProps {
  orderViewModel: OrderItemViewModel;
  updateOrder: (order: Order) => void;
  // deleteOrder: (order:string)=>void;
}

class OrderDetail extends React.Component<IProps, any>{
  constructor(props: IProps) {
    super(props);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    // this.handleRejectOrder = this.handleRejectOrder.bind(this);
  }

  // handleRejectOrder(order: string){
  //   this.props.deleteOrder(order)
  // }
  handleStatusChange(newStatus: OrderStatus) {
    var order = this.props.orderViewModel.model;
    order.orderStatus = newStatus;
    this.props.updateOrder(order)
  }

  render() {

    var typeOrder = this.props.orderViewModel.getServices();
    var strOrders = []
    for (var i = 0; i < typeOrder.length; i++) {
      strOrders.push(this.props.orderViewModel.services[i])
    }

    var listOrders = strOrders.map((item) => {
      var fileName = "./assets/img/icons/service_" + item.type.toString() + ".svg";
      return (<li key={item._id}>
        <span className="icon ">
          <img src={fileName} alt="icon" />
        </span>
        <span>{item.name}</span></li>)
    })

    var orderOnDay = new Date(this.props.orderViewModel.model.orderDate).toLocaleString();
    var price = 0;
    strOrders.forEach((item) => { price += item.price })

    var statusIcon = <></>;
    var buttons = <></>;
    var statusText = ''
    
      switch (this.props.orderViewModel.model.orderStatus) {
        case OrderStatus.Pending: {
          statusText = "pending",
            statusIcon = <Message className="icon-status pending" style={style.statusIcon} /> ,
            buttons = <>
              <div className="pddng">
                <RaisedButton type="submit" label="Reject" onClick={() => { this.handleStatusChange(OrderStatus.Canceled) }} secondary={true} />
              </div>
              <div className="pddng">
                <RaisedButton type="submit" label="Confirm" onClick={() => { this.handleStatusChange(OrderStatus.Confirmed) }} primary={true} />
              </div>
            </>
          break;
        }
        case OrderStatus.Confirmed: {
          statusText = "confirmed",
            buttons =
            <div className="pddng">
              <RaisedButton type="submit" label="Done" onClick={() => { this.handleStatusChange(OrderStatus.Done) }} primary={true} />
            </div>
          break;
        }
        case OrderStatus.Done: {
          statusText = "done"
          statusIcon = <Done className="done icon-status" style={style.statusIcon} />
          break;
        }
        case OrderStatus.Canceled: {
          statusText = "canceled"
          statusIcon = <Cancel className="canceled icon-status" style={style.statusIcon} />
          buttons =
            <div className="pddng">
              <RaisedButton type="submit" label="Restore order" onClick={() => { this.handleStatusChange(OrderStatus.Pending) }} primary={true} />
            </div>
          break;
        }
        default: {
          statusIcon = <></>
          break;
        }
      }
    if (Auth.getAuthUser().role != 'admin') {
      buttons =
        <div className="pddng">
          <RaisedButton type="submit" label="Reject" onClick={() => { this.handleStatusChange(OrderStatus.Canceled) }} primary={true} />
        </div>
    }


    return (
      <Card className=" mrg">
        <CardTitle title="Profile" expandable={true} />
        <div className="flex-container">
          <div className="boxOrderDetail">
            <CardTitle style={{ textAlign: 'center' }}>Detail</CardTitle>
            <Divider />
            <CardText style={{ padding: '5px' }} >
              <div className="flex-container boxOrderDetail__orderInfo">
                <div className="wrapUserImg grow2">
                  <img className='imgContCover' src='/assets/user.png' alt="img" />
                </div>
                <div className="wrapOrderInfo grow2 orderInfo">
                  <h3 className="orderInfo__name">{this.props.orderViewModel.user.firstName}</h3>
                  <div className="orderInfo__phone"><i>{this.props.orderViewModel.user.phone}</i></div>
                  <div className="orderInfo__email"><i>{this.props.orderViewModel.user.email}</i></div>
                  <p className="orderInfo__day">{orderOnDay}</p>
                  <ul className="orderInfo__types">{listOrders}</ul>
                </div>
                <div className="orderInfo grow2 flex-between flex-column">
                  <div className="orderInfo__status">
                    <span>{statusIcon} {statusText}</span>
                  </div>
                  <div className="orderInfo__price">
                    <div>Price</div>
                    <div className="orderInfo__price__count">{price}</div>
                  </div>
                </div>
              </div>
              <div className="button-line flex-end">
                {buttons}
              </div>
            </CardText>
          </div>
        </div>
      </Card>
    )
  }
}

export function mapStateToProps(state: AppState, ownProps: any) {
  return {
  }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    updateOrder: (order: Order) => { dispatch(action.updateOrderInDB(order)) },
    // deleteOrder:(order: string) => { dispatch(action.deleteOrderInDB(order)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);