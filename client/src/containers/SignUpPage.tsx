import * as React from 'react';
import { Errors, AppState, User } from '../types/userModel';
import SignUpForm from '../components/SignUpForm';
import { Redirect } from 'react-router';
import { Dispatch, connect } from 'react-redux';
import * as action from '../action/';
import axios from 'axios';

interface IStatus {
  status: string;
  signUpStatus: (status: string) => void;
}

interface IState {
  user: FormUser,
  error: Errors,
  isRedirect: boolean
}

export class FormUser {
  password: string;
  confirm: string;
  [k: string]: any;

  private userModel: User;
  get user(): User {
    return this.userModel;
  }

  get id(): string {
    return this.userModel.id;
  }

  get firstName(): string {
    return this.userModel.firstName;
  }
  set firstName(value: string) {
    this.userModel.firstName = value;
  }

  get phone(): string {
    return this.userModel.phone;
  }
  set phone(value: string) {
    this.userModel.phone = value;
  }

  get lastName(): string {
    return this.userModel.lastName;
  }
  set lastName(value: string) {
    this.userModel.lastName = value;
  }

  get email(): string {
    return this.userModel.email;
  }
  set email(value: string) {
    this.userModel.email = value;
  }

  constructor(user?: User) {
    if (user)
      this.userModel = user;
    else
      this.userModel = new User();
  }

}

export class SignUpPage extends React.Component<IStatus, IState>{
  /**
   *
   */
  constructor(props: IStatus) {
    super(props);
    this.state = {
      user: new FormUser(),
      error: new Errors(),
      isRedirect: false
    }
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onChangeField = this.onChangeField.bind(this);

  }

  onSubmitForm(e: any) {
    e.preventDefault();
    axios('/auth/signup', {
      method: 'post',
      data: JSON.stringify(
        {
          firstName: this.state.user.firstName,
          email: this.state.user.email,
          password: this.state.user.password,
          confirm: this.state.user.confirm
        }
      ),
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
          console.log(err.response);
          var errorSignUp = new Errors();
          errorSignUp.fieldEmail = err.response.data.errors.email ? err.response.data.errors.email : '';
          errorSignUp.fieldName = err.response.data.errors.firstName ? err.response.data.errors.firstName : '';
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
      <div className="auth-page">
        <div className="page-header header-filter clear-filter purple-filter bg">
        </div>
        <div className=" main main-raised">
          <SignUpForm onSubmit={this.onSubmitForm}
            error={this.state.error}
            onChange={this.onChangeField}
          />
        </div>
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