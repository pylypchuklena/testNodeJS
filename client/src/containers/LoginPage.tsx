import * as React from 'react';
import { LoginForm } from '../components/LoginForm';
import { User, Errors, AppState } from '../types/userModel';
import Auth from '../models/Auth';
import { Redirect } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import axios from 'axios';
import * as action from './../action'
import { FormUser } from './SignUpPage';
import {Button} from "react-bootstrap";

interface IProps {
  status: string;
  logInUser: ()=>void;
}
interface IState {
  user: FormUser,
  error: Errors,
  successMsg: string,
  redirectPath: string
}
class LoginPage extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);

    this.state = {
      user: new FormUser(),
      error: new Errors(),
      successMsg: this.props.status,
      redirectPath: ""
    }

    this.onSubmitUser = this.onSubmitUser.bind(this);
    this.onChangeFieldUser = this.onChangeFieldUser.bind(this);
  }

  //TODO: move to action with redirect
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
          Auth.authUser(res.data.user);
          this.props.logInUser();
          this.setState({
            error: new Errors(),
            redirectPath: "/"
          })
        }
      })
      .catch((error) => {
        if (error.response) {
          var err = new Errors();
          err.fieldEmail = error.response.data.errors.email ? error.response.data.errors.email : '';
          err.fieldPassword = error.response.data.errors.password ? error.response.data.errors.password : '';
          err.summary = error.response.data.message ? error.response.data.message : '';
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
    if (this.state.redirectPath) return (<Redirect to={this.state.redirectPath} />)
    return (
      <div className="auth-page">
        <div className="page-header header-filter clear-filter purple-filter bg">
        </div>
        <div className=" main main-raised">
        <Button>TEST REACT-BOOTSTRAP</Button>
          <LoginForm onSubmit={this.onSubmitUser}
            onChange={this.onChangeFieldUser}
            error={this.state.error}
            successMsg={this.state.successMsg}
          />
        </div>
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
    logInUser: () => { dispatch(action.logInUser()) },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);