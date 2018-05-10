import * as React from 'react';
import { Card, CardTitle, List, ListItem } from 'material-ui';
import { User, AppState } from '../types/userModel';

import Avatar from 'material-ui/Avatar';
import EditorEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionFace from 'material-ui/svg-icons/action/face';
import { blue500 } from 'material-ui/styles/colors';
import { Redirect } from 'react-router';
import Divider from 'material-ui/Divider';
import Off from 'material-ui/svg-icons/action/delete-forever';
import { Dispatch } from 'redux';
import * as action from './../action';
import { connect } from 'react-redux';

const styles = {
  button: {
    margin: 12,
  }
}

interface IProps {
  users: User[];
  onDeleteUser: (user: User) => void;
}

interface IState {
}

export function mapStateToProps(state: AppState) {
  return {
    users:state.users
  }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    onDeleteUser: (user:User) => { dispatch(action.deleteUserFromDB(user)) }
  };
}

class UsersList extends React.Component<IProps, IState>{
 
  constructor(props: IProps) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(user: User) {
    this.props.onDeleteUser(user);
  }

  render() {
    var listItem;
    if (this.props.users)
      listItem = this.props.users.map((user) => {
        if (user.role == "user")
          return (<ListItem key={user.id}
            primaryText={(user.firstName ? user.firstName : 'Subscriber Name') + ' ' + (user.lastName ? user.lastName : '')}
            secondaryText={user.email}
            leftAvatar={<Avatar icon={<ActionFace />} />}
            rightIcon={<Off hoverColor={blue500} onClick={(e) => {e.preventDefault(); this.handleDelete(user) }} />}
          />
          )
      })

    return (
      <>
        <div className="card_box">
          <Card className="container_box text-left mrg">
            <CardTitle>Subscribers list :</CardTitle>
            <Divider />
            <div className="wrapList">
              <List>
                {listItem}
              </List>
            </div>
          </Card>
        </div>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);