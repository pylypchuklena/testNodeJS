import * as React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { RaisedButton, TimePicker, DatePicker, Checkbox } from 'material-ui';
import { Redirect } from 'react-router';
import Axios from 'axios';
import Auth from '../models/Auth';
import { AppState, Service, Order } from '../types/userModel';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as action from '../action/';

export class OrderFormModel {
  types: Array<string> = new Array<string>();
  orderDate: Date = new Date();
}

interface IProps {
  services: Service[];
  addOrder:(order:OrderFormModel)=>void;
  doneOrder:()=>void;
}

interface IState {
  order: OrderFormModel,
  price: number,
  errorMsg: string
}

class OrderPage extends React.Component<IProps, IState>{

  constructor(props: any) {
    super(props);
    this.state = {
      order: new OrderFormModel(),
      price: 0,
      errorMsg: null
    }
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
  }

  handleCancel(e: any) {
    e.preventDefault();
    this.props.doneOrder();
  }

  onSubmit(e: any) {
    e.preventDefault();
    var selectedServices = this.props.services.filter(x => this.state.order.types.indexOf(x.type.toString()) >= 0);
    var today = new Date();

    if (selectedServices.length > 0 && this.state.order.orderDate > today) {
      var newOrder ={
        types: this.state.order.types,
        orderDate: this.state.order.orderDate
      }
      this.props.addOrder(newOrder);
      this.props.doneOrder();
    }else {
        this.setState({
          errorMsg: "Fill in all the input data"
        })
      }
  };

  onChangeCheckbox(e: any) {
    var index = this.state.order.types.indexOf(e.target.name);
    var order = this.state.order;
    if (index >= 0) {
      order.types.splice(index, 1);
    }
    else {
      order.types.push(e.target.name);
    }

    var selectedServices = this.props.services.filter(x => order.types.indexOf(x.type.toString()) >= 0)
    var price = 0;
    selectedServices.forEach(item => { price += item.price })
    this.setState({ order, price });
  };
  onChangeDate(e: any, date: Date) {
    var changedOrder = { ...this.state.order };
    changedOrder.orderDate.setDate(date.getDate());
    changedOrder.orderDate.setMonth(date.getMonth());
    changedOrder.orderDate.setFullYear(date.getFullYear());
    this.setState({ order: changedOrder })
  }
  onChangeTime(e: any, date: Date) {

    var changedOrder = { ...this.state.order };
    changedOrder.orderDate.setHours(date.getHours());
    changedOrder.orderDate.setMinutes(date.getMinutes());
    this.setState({ order: changedOrder })
  }
  render() {
    var services = this.props.services.map(x => { return <Checkbox label={x.name} name={x.type.toString()} key={x._id} onCheck={this.onChangeCheckbox} /> })
    return (

      <div className="card_box">
        <Card className="container_box mrg">
          <form onSubmit={this.onSubmit} className="orderForm">
            <h2 className='card-heading'>Order visit</h2>
            <div className="text-left  orderForm__radioBtns">
              <h4>Services</h4>
              {services}
            </div>
            <DatePicker
              floatingLabelText="Date "
              hintText="Choose day"
              onChange={this.onChangeDate} />
            <TimePicker
              floatingLabelText="Time "
              format="24hr"
              floatingLabelFixed={true}
              hintText="10 minutes step"
              onChange={this.onChangeTime}
              minutesStep={10}
            />
            <CardText>
              <div className="orderForm__price">
                <div className="orderForm__price__title">Price</div>
                <div className="orderForm__price__count">{this.state.price}</div>
              </div>
            </CardText>
            {(this.state.errorMsg) ? <p className="error-message">{this.state.errorMsg}</p> : <></>}
            <div className="button-line flex-end">
              <div className="pddng">
                <RaisedButton label="Cansel" onClick={this.handleCancel} secondary />
              </div>
              <div className="pddng">
                <RaisedButton type="submit" label="Save order" primary />
              </div>
            </div>
          </form>
        </Card>
      </div>
    )
  }

}

export function mapStateToProps(state: AppState,ownProps:any) {
  return {
    services: state.services,
    doneOrder:ownProps.doneOrder
  }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    addOrder: (order:OrderFormModel) => { dispatch(action.addOrderToDB(order)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);