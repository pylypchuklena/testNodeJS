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

interface IProps {
   order:Order;
  // onConfirmOrder: (item: User) => void;

}


class OrderDetail extends React.Component<IProps, any>{
  /**
   *
   */
  constructor(props: IProps) {
    super(props);

  }

  render() {

    return (

      <div className="card_box">
        <Card className="container_box  mrg">
      
            <CardTitle title="Profile" expandable={true} />
            <div className="flex-container">
        
              <div className="wrapUserInfo">

                <CardHeader title="Personal data" style={{ textAlign: 'left', padding: '5px', fontWeight: 'bold' }} />
                <Divider />
                <CardText style={{ padding: '5px' }} >
                  <div >
                  {this.props.order.orderDate}
                  </div>
                 
                  <div className="button-line flex-end">

                    <div className="pddng">
                      <RaisedButton type="submit" label="Save changes" primary={true} />
                    </div>
                  </div>
                </CardText>
              </div>

            </div>
        </Card>
      </div>

    )
  }

}



export default OrderDetail;