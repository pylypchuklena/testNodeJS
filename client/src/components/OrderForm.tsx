import * as React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { RaisedButton } from 'material-ui';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';

export class OrderForm extends React.Component<any, any>{
  /**
   *
   */
  constructor(props: any) {
    super(props);

  }
  render() {
    return (
      <Card className="container_box ">
        <form  >
          <h2 className='card-heading'>Order visit</h2>
          <DatePicker
            floatingLabelText="Date "
            hintText="Choose day" />
          <TimePicker
            floatingLabelText="Time "
            floatingLabelFixed={true}
            hintText="10 minutes step"
            minutesStep={10}
          />
          <div className="button-line flex-end">
            <div className="pddng">
              <RaisedButton type="submit" label="Cansel" secondary />
            </div>
            <div className="pddng">
              <RaisedButton type="submit" label="Save order" primary />
            </div>
          </div>

        </form>

      </Card>

    )
  }

}
export default OrderForm;