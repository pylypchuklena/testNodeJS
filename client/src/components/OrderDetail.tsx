import * as React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { User, Order } from '../types/userModel';
import * as action from '../action';
import Divider from 'material-ui/Divider';
import { OrderItemViewModel } from './OrdersList';
import { OrderStatus } from '../models/Enums';
import Message from "material-ui/svg-icons/image/lens";
import Done from "material-ui/svg-icons/action/done";
import Cancel from "material-ui/svg-icons/content/clear";


const style={
  statusIcon:{
    height: '10px',
    width: '10px'
  },
  done:{
    color:'#008000'
  }
}
interface IProps {
  orderViewModel: OrderItemViewModel;
  updateOrder: (order: Order) => void
}

class OrderDetail extends React.Component<IProps, any>{
  constructor(props: IProps) {
    super(props);
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
    var count = strOrders.map((item) => {
      return price += item.price
    })

    var statusIcon = <></>;
    var statusText=''
    switch (this.props.orderViewModel.model.orderStatus) {
      case OrderStatus.Pending: {
        statusText ="pending",
        statusIcon = <Message className="icon-status" style={style.statusIcon}/>
        break;
      }
      case OrderStatus.Confirmed: {
        statusText ="confirmed"
        break;
      }
      case OrderStatus.Done: {
        statusText ="done"
        statusIcon = <Done className="done icon-status" style={style.statusIcon}/>
        break;
      }
      case OrderStatus.Canceled: {
        statusText ="canceled"
        statusIcon = <Cancel className="canceled icon-status" style={style.statusIcon}/>
        break;
      }
      default: {
        statusIcon = <></>
        break;
      }
    }

    return (
      <Card className=" mrg">
        <CardTitle title="Profile" expandable={true} />
        <div className="flex-container">
          <div className="boxOrderDetail">
            <CardTitle style={{ textAlign: 'center' }}>Detail</CardTitle>
            <Divider />
            <CardText style={{ padding: '5px' }} >
              <div className="flex-container">
                <div className="wrapUserImg">
                  <img className='imgContCover' src='/assets/user.png' alt="img" />
                </div>
                <div className="wrapOrderInfo orderInfo">
                  <h3 className="orderInfo__name">{this.props.orderViewModel.user.firstName}</h3>
                  <div className="orderInfo__phone"><i>{this.props.orderViewModel.user.phone}</i></div>
                  <div className="orderInfo__email"><i>{this.props.orderViewModel.user.email}</i></div>
                  <p className="orderInfo__day">{orderOnDay}</p>
                  <ul className="orderInfo__types">{listOrders}</ul>
                </div>
                <div className="orderInfo flex-between flex-column">
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
                <div className="pddng">
                  <RaisedButton type="submit" label="Reject" secondary={true} />
                </div>
                <div className="pddng">
                  <RaisedButton type="submit" label="Confirm" primary={true} />
                </div>
              </div>
            </CardText>
          </div>
        </div>
      </Card>
    )
  }
}

export default OrderDetail;