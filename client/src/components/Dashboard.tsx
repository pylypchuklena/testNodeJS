import * as React from 'react';
import { Card, CardTitle } from 'material-ui';
import { User } from '../types/userModel';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import EditorEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionFace from 'material-ui/svg-icons/action/face';
import { blue500 } from 'material-ui/styles/colors';
import { Redirect } from 'react-router';
import Divider from 'material-ui/Divider';
import { OrderForm } from './OrderForm';

interface IDashboard {
  users: User[];
  // selectedUser: (item: User) => void;
}
const styles = {
  button: {
    margin: 12,
  }
}
export class Dashboard extends React.Component<IDashboard, any>{

  /**
   *
   */
  constructor(props: IDashboard) {
    super(props);
    this.state = { redirectUrl: "" }
    this.showProfile = this.showProfile.bind(this);
  }
  showProfile(e: User) {
    // this.props.selectedUser(e);
    this.setState({ redirectUrl: e.id });
  }

  render() {
    var listItem;

    if (this.state.redirectUrl != "") {
      var path = "/profile/" + this.state.redirectUrl;
      return <Redirect to={path} />
    }
    
    if (this.props.users)
      listItem = this.props.users.map((user) => {
        return (<ListItem key={user.id}
          primaryText={(user.firstName? user.firstName :'User Name')+ ' '+ (user.lastName? user.lastName :'')}
          secondaryText={user.email}
          leftAvatar={<Avatar icon={<ActionFace />} />}
          rightIcon={<EditorEdit hoverColor={blue500} onClick={(e) => { this.showProfile(user) }} />}
        />
        )
      })

    return (
      <>
        <Card className="container_box text-left mrg">
          <CardTitle>Users list :</CardTitle>
          <Divider/>
          <div className="wrapList">
            <List>
              {listItem}
            </List>
          </div>
          

        </Card>
        <OrderForm/>
        </>

    )
  }
}

export default Dashboard;