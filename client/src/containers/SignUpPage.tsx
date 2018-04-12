import * as React from 'react';
import { Errors, AppState } from '../types/userModel';
import SignUpForm from '../components/SignUpForm';
import { Redirect } from 'react-router';
import { Dispatch, connect } from 'react-redux';
import * as action from '../action/';
import axios from 'axios';

interface IStatus {
  status: string;
  signUpStatus: (status: string) => void;
}

export class FormUser {
  name: string;
  password: string;
  email: string;
  confirm: string;
  [k: string]: any;
}

export class SignUpPage extends React.Component<IStatus, any>{
  /**
   *
   */
  constructor(props: IStatus) {
    super(props);
    this.state = {
      error: new Error(),
      isRedirect: false
    }
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onChangeField = this.onChangeField.bind(this);

  }

  onSubmitForm(e: any) {
    e.preventDefault();
    axios('/auth/signup', {
      method: 'post',
      data: JSON.stringify(this.state.user),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status === 200) {
          this.props.signUpStatus(res.data.message);
          this.setState({
            error: new Errors(),
            isRedirect: true
          })
        }
      })
      .catch((err) => {

        if (err.response) {
          var errorSignUp = new Errors();
          errorSignUp.fieldEmail = err.response.data.errors.errors.email ? err.response.data.errors.email : '';
          errorSignUp.fieldName = err.response.data.errors.name ? err.response.data.errors.name : '';
          errorSignUp.fieldPassword = err.response.data.errors.password ? err.response.data.errors.password : '';
          errorSignUp.fieldConfirm = err.response.data.errors.confirm ? err.response.data.errors.confirm : '';
          errorSignUp.summary = err.response.data.message ? err.response.data.message : '';

          this.setState({
            error: errorSignUp
          })
        }
      })
  }

  onChangeField(e: any) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });

  }
  render() {
    if (this.state.isRedirect) return (<Redirect to='/login' />)
    return (
      <div className="mainContainer__box">
        <SignUpForm onSubmit={this.onSubmitForm}
          error={this.state.error}
          onChange={this.onChangeField}
        />
      </div>
    )
  }
}

export function mapStateToProps(state: AppState) {
  return {

  }
}

export function mapDispatchToProps(dispatch: Dispatch<action.IAction>) {
  return {
    signUpStatus: (status: string) => { dispatch(action.signUpStatus(status)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);