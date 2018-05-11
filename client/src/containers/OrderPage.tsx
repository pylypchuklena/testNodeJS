import * as React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { RaisedButton, TimePicker, DatePicker, RadioButton, Checkbox } from 'material-ui';
import { Redirect } from 'react-router';
import Axios from 'axios';
import Auth from '../models/Auth';
import { AppState, Service } from '../types/userModel';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as action from '../action/';

class OrderFormModel {
  types: Array<string> = new Array<string>();
  orderDate: Date = new Date();
}

interface IProps{
  services:Service[]
}

interface IState{
  isRedirect: boolean,
  order: OrderFormModel,
  price:number
}

class OrderPage extends React.Component<IProps, IState>{

  constructor(props: any) {
    super(props);
    this.state = {
      isRedirect: false,
      order: new OrderFormModel(),
      price:0
    }
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);

  }

  handleCancel(e: any) {
    e.preventDefault();
    this.setState({
      isRedirect: true
    })
  }
  
  onSubmit(e: any) {
    e.preventDefault();
    Axios('/api/order',
      {
        method: 'post',
        data: JSON.stringify({
          types: this.state.order.types,
          orderDate: this.state.order.orderDate,
        }),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `bearer ${Auth.getToken()}`
        }
      }).then((res) => {
        if (res.status === 200) {
          this.setState({
            isRedirect: true
          })
        }
      })
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
    selectedServices.forEach(item=>{price += item.price})
    this.setState({ order,price});
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
    if (this.state.isRedirect) return (<Redirect to="/" />)
    var services = this.props.services.map(x => { return <Checkbox label={x.name} name={x.type.toString()} key={x._id} onCheck={this.onChangeCheckbox} /> })
    return (
      <div className="dashboard-page">
        <div className="page-header header-filter clear-filter purple-filter bg">
        </div>
        <div className=" main main-raised">
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
                  <div  className="orderForm__price__count">{this.state.price}</div> 
                  </div>
                </CardText>
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
        </div>
      </div>
    )
  }

}

export function mapStateToProps(state: AppState) {
  return {
    services: state.services
  }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    addService: () => { dispatch(action.addService()) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);