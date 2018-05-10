import * as React from 'react';
import { Card, CardTitle, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'material-ui';
import { AppState, User, Order } from '../types/userModel';
import { connect, Dispatch } from 'react-redux';
import * as action from '../action';
import { Redirect } from 'react-router';
import Divider from 'material-ui/Divider';
import InputMask from 'react-input-mask';
import { FormUser } from '../containers/SignUpPage';
import Auth from '../models/Auth';
import { OrderItemViewModel } from './OrdersList';

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
                <div className="orderInfo__price">
                  <div>Price</div>
                  <div className="orderInfo__price__count">{price}</div>
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