import * as React from 'react';
import { Dashboard } from '../components/Dashboard';
import { AppState, User } from '../types/userModel';
import { connect, Dispatch } from 'react-redux';
import { Card, CardTitle } from 'material-ui';
import * as action from './../action';

interface IProps {
  users: Array<User>;
  loadUsers: () => void;
  // selectedUser:(user:User)=>void;
}

class DashboardPage extends React.Component<IProps, any>{

  constructor(props: IProps) {
    super(props);

  }
  componentDidMount() {
    this.props.loadUsers()
  }
  render() {
    if (this.props.users) {
      return (
        <div className="mainContainer__box">
          <Dashboard users={this.props.users}
          // selectedUser={this.props.selectedUser}
          />
        </div>
      )
    } else {
      return (
        <div className="mainContainer__box">
          <Card className="container_box  text-left mrg">
            <CardTitle>There are no users yet</CardTitle>
          </Card>
        </div>
      )
    }
  }
}

export function mapStateToProps(state: AppState) {
  return {
    users: state.users
  }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadUsers: () => { dispatch(action.getDataFromDB()) }
    // selectedUser: (user:User) =>{dispatch(action.selectedUser(user))}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);