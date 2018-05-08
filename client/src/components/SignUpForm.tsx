import * as React from 'react';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { Errors } from '../types/userModel';

interface IPropsSingUp {
  onSubmit: (e: any) => void;
  onChange: (e: any) => void;
  error: Errors;
}


export class SignUpForm extends React.Component<IPropsSingUp, any>{
  /**
   *
   */
  constructor(props: IPropsSingUp) {
    super(props);

  }
  render() {
    return (
      <div className="card_box">
        <Card className="container_box ">
          <form onSubmit={this.props.onSubmit} >
            <h2 className='card-heading'>Sign Up</h2>
            {this.props.error.summary && <p className="error-message"> {this.props.error.summary}</p>}
            <div className="field-line">
              <TextField
                floatingLabelText="Name"
                errorText={this.props.error.fieldName}
                name="firstName"
                onChange={this.props.onChange} />
            </div>
            <div className="field-line">
              <TextField
                floatingLabelText="Email"
                errorText={this.props.error.fieldEmail}
                name="email"
                onChange={this.props.onChange}
              />
            </div>
            <div className="field-line">
              <TextField
                floatingLabelText="Password"
                errorText={this.props.error.fieldPassword}
                name="password"
                onChange={this.props.onChange}
                type="password"
              />
            </div>
            <div className="field-line">
              <TextField
                floatingLabelText="Confirm password"
                errorText={this.props.error.fieldConfirm}
                name="confirm"
                type="password"
                onChange={this.props.onChange}
              />
            </div>
            <div className="button-line">
              <RaisedButton type="submit" label="create new account" primary />
            </div>
            <CardText>Allready have an account? <Link to="/login">Log in</Link></CardText>
          </form>
        </Card >
      </div>
    )
  }
}
export default SignUpForm;