import * as React from 'react';
import { Dashboard } from '../components/Dashboard';
import axios from 'axios'
import { AppState } from '../types/userModel';
import { Dispatch, connect } from 'react-redux';
import Auth from '../models/Auth';

export class DashboardPage extends React.Component<{token:string}, any>{
  /**
   *
   */
  constructor(props: any) {
    super(props);
    this.state = {
      secretData: ''
    }
  }

  componentDidMount() {
    axios("/api/dashboard", {
      method: 'get',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            secretData: res.data.message
          })
        }
      })
      .catch(error => {
        if (error.response) {
          this.setState({
            secretData: error.response.data.error
          })
        }
      })
  }

  render() {
    return (
      <Dashboard secretData={this.state.secretData} />
    )
  }
}

export default (DashboardPage);