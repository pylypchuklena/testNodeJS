import * as React from 'react';
import { Card, CardTitle, List, ListItem } from 'material-ui';
import { User } from '../types/userModel';

import Avatar from 'material-ui/Avatar';
import EditorEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionFace from 'material-ui/svg-icons/action/face';
import { blue500 } from 'material-ui/styles/colors';
import { Redirect } from 'react-router';
import Divider from 'material-ui/Divider';
import Off from 'material-ui/svg-icons/action/delete-forever';

interface IDashboard {
  users: User[];
  onDeleteUser: (user: User) => void;
}
const styles = {
  button: {
    margin: 12,
  }
}
interface IState {
  user: User
}
export class UsersList extends React.Component<IDashboard, IState>{

  /**
   *
   */
  constructor(props: IDashboard) {
    super(props);
    var delUser = new User()
    this.state = {
      user: delUser
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e: any) {
    e.preventDefault();
    this.props.onDeleteUser(this.state.user);
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
            rightIcon={<Off hoverColor={blue500} onClick={(e) => { this.handleDelete }} />}
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

export default UsersList;