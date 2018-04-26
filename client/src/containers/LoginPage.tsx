import * as React from 'react';
import { LoginForm } from '../components/LoginForm';
import { User, Errors, AppState } from '../types/userModel';
import Auth from '../models/Auth';
import { Redirect } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import axios from 'axios';
import * as action from './../action'
import { FormUser } from './SignUpPage';

interface IProps {
  status: string;
  logInUser: (user: User) => void;
}
interface IState {
  user: FormUser,
  error: Errors,
  successMsg: string,
  isRedirect: boolean
}
class LoginPage extends React.Component<IProps, IState>{
  /**
   *
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      user: new FormUser(),
      error: new Errors(),
      successMsg: this.props.status,
      isRedirect: false
    }

    this.onSubmitUser = this.onSubmitUser.bind(this);
    this.onChangeFieldUser = this.onChangeFieldUser.bind(this);
  }

  onSubmitUser(e: any) {
    e.preventDefault();

    axios('/auth/login', {
      method: 'post',
      data: JSON.stringify({
        email: this.state.user.email,
        password: this.state.user.password
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status === 200) {
          Auth.authenticateUser(res.data.token);
          Auth.authUser(res.data.user.id);
          this.setState({
            error: new Errors(),
            isRedirect: true
          })
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log('login', error.response)
          var err = new Errors();
          err.fieldEmail = error.response.data.errors.email ? error.response.data.errors.email : '';
          err.fieldPassword = error.response.data.errors.password ? error.response.data.errors.password : '';
          err.summary = error.response.data.message ? error.response.data.message : '';
          //update state
          this.setState({ error: err })
        }
      })
  }

  onChangeFieldUser(e: any) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({
      user
    })
  }


  render() {
    if (this.state.isRedirect) return (<Redirect to="/" />)
    return (
      <div className="mainContainer__box">
        <LoginForm onSubmit={this.onSubmitUser}
          onChange={this.onChangeFieldUser}
          error={this.state.error}
          successMsg={this.state.successMsg}
        />
      </div>

    )
  }
}



export function mapStateToProps(state: AppState) {
  return {
    status: state.status
  }
}
export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    logInUser: (user: User) => { dispatch(action.logInUser(user)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);