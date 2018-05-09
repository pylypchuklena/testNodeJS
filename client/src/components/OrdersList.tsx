import * as React from 'react';
import { List, ListItem, Card, CardTitle, RaisedButton, TableBody, TableHeader, TableHeaderColumn, TableRow, Table, TableRowColumn } from 'material-ui';
import { Order } from '../types/userModel';
import Divider from 'material-ui/Divider';
import Axios from 'axios';
import Off from 'material-ui/svg-icons/content/clear';
import Confirm from "material-ui/svg-icons/action/done";
import Message from "material-ui/svg-icons/image/lens";
import Auth from '../models/Auth';
import { Link } from 'react-router-dom';
import OrderDetail from './OrderDetail';
interface IProps {
  orders: Array<Order>;
  updateOrder: (order: Order) => void;
}

class OrdersList extends React.Component<IProps, any>{
  /**
   *
   */
  constructor(props: IProps) {
    super(props);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.state = {
      isAdmin: false,
      tableHeader: [],
      orders: Array<OrderItemViewModel>(),
      selectedItem: null
    }
  }

  componentWillReceiveProps() {
    this.setState({ orders: this.props.orders.map(x => { return new OrderItemViewModel(false, x) }) })
  }

  componentDidMount() {
    if (Auth.getAuthUser().role == 'admin') {
      this.setState({
        isAdmin: true,
        tableHeader: ['Name', 'Type', 'Order on', 'Date of order', 'Status'],
      })
    } else {
      this.setState({
        tableHeader: ['Type', 'Order on', 'Status'],
      })
    }
  }

  onRowSelect(e: any) {
    var orders = this.state.orders.map((x: OrderItemViewModel, index: number) => {
      if (index == e) {
        x.selected = true;
        return x;
      }
      x.selected = false;
      return x;
    });
    this.setState({ orders: orders, selectedItem: orders[e] });
  }
  render() {
    var bodyListOrder;
    var headerListOrder;
    headerListOrder = this.state.tableHeader.map((item: string, index: string) => {
      return <TableHeaderColumn key={index}>{item}</TableHeaderColumn>
    })
    if (this.props.orders) {
      bodyListOrder = this.state.orders.map((item: OrderItemViewModel) => {
        var dayOfOrder = new Date(item.model.dayOfOrder).toLocaleString();
        var orderOnDay = new Date(item.model.orderDate).toLocaleString();
        var typeOrder = '';
        for (var i = 0; i < item.model.type.length; i++) {
          typeOrder += item.model.type[i] + ', '
        }
        if (this.state.isAdmin) {
          return (
            // <TableRow key={item.model.orderId} selected={item.selected}
            //   className={((item.model.isActive) ? 'isActive' : ' ')}>
            //   <TableRowColumn>1</TableRowColumn>
            //   <TableRowColumn>{typeOrder.slice(0, -2)}</TableRowColumn>
            //   <TableRowColumn>{orderOnDay.slice(0, -3)}</TableRowColumn>
            //   <TableRowColumn>{dayOfOrder}</TableRowColumn>
            //   <TableRowColumn>{(item.model.isActive) ? 'Unconfirmed' : 'confirmed'}</TableRowColumn>
            // </TableRow>
            <ListItem key={item.model.orderId}
              className={((item.model.isActive) ? 'isActive' : ' ')}
              primaryText={orderOnDay.slice(0, -3)}
              leftIcon={<Message/>}
              secondaryText={
                <div className='flex-between'>
                  <span>name</span>
                  <ul className='flex-between icons-service'>
                    <li><i className="fa fa-facebook-square"></i></li>
                    <li><i className="fa fa-facebook-square"></i></li>
                    <li><i className="fa fa-facebook-square"></i></li>
                  </ul>
                </div>
              }

            />
          )
        } else {
          return (
            <TableRow key={item.model.orderId}
              className={((item.model.isActive) ? 'isActive' : ' ')}>
              <TableRowColumn>{typeOrder.slice(0, -2)}</TableRowColumn>
              <TableRowColumn>{orderOnDay.slice(0, -3)}</TableRowColumn>
              <TableRowColumn>{(item.model.isActive) ? 'Unconfirmed' : 'confirmed'}</TableRowColumn>
            </TableRow>

          )
        }
      })
    }
    if (bodyListOrder.length == 0) {
      bodyListOrder =
        // <TableRow>
        //   <TableRowColumn style={{ textAlign: 'center' }}>No orders yet</TableRowColumn>
        //   <TableRowColumn style={{ textAlign: 'center' }}><Link to="/order"> Do first order</Link></TableRowColumn>
        // </TableRow>
       
          <div className="flex-around">
            <span>No orders yet.  </span>
          <Link to="/order"> Do first order</Link>
          </div>
          
        
    }
    // if (this.state.isAdmin) {
    //   buttonsAdmin = <div className="button-line flex-end">
    //     <div className="pddng">
    //       <RaisedButton type="submit" label="Unconfirm" secondary={true} />
    //     </div>
    //     <div className="pddng">
    //       <RaisedButton type="submit" label="Confirm" primary={true} />
    //     </div>
    //   </div>
    // }
    return (
      <div className="flex-between">
        <div className="col col-1">
          <Card className=" text-left mrg">
            <CardTitle>Orders list :</CardTitle>
            <Divider />
            <div className="wrapList">
              {/* <Table onRowSelection={this.onRowSelect}>
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}>
                  <TableRow selectable={true} >
                    {headerListOrder}
                  </TableRow >
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {bodyListOrder}
                </TableBody>
              </Table> */}
              <List>
                {bodyListOrder}
              </List>
            </div>
          </Card>
        </div>
        <div className="col col-2">
          {(this.state.selectedItem) ? <OrderDetail order={this.state.selectedItem.model} updateOrder={this.props.updateOrder} /> : <Card className="mrg"><CardTitle>Select order from list</CardTitle></Card>}
        </div>
      </div>
    )
  }
}

class OrderItemViewModel {
  selected: boolean;
  model: Order;

  constructor(_selected: boolean, _model: Order) {
    this.selected = _selected;
    this.model = _model;
  }
}
export default OrdersList;