import * as React from 'react';
import { Card, CardTitle, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'material-ui';
import { AppState, User } from '../types/userModel';
import { connect, Dispatch } from 'react-redux';
import * as action from '../action';
import { Redirect } from 'react-router';
import Divider from 'material-ui/Divider';
import InputMask from 'react-input-mask';
import { FormUser } from '../containers/SignUpPage';

interface IProps {
  user: User;
  onUpdateUser: (item: User) => void;
  onDeleteUser: (item: User) => void;

}

interface IState {
  url: string,
  user: FormUser;
  isRedirect: boolean;
}

class Profile extends React.Component<IProps, IState>{
  /**
   *
   */
  constructor(props: IProps) {
    super(props);
    var formUser = new FormUser(this.props.user);
    this.state = {
      url: '',
      user: formUser,
      isRedirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
  }

  onChangeField(e: any) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
  }

  handleDelete(e: any) {
    e.preventDefault();
    this.props.onDeleteUser(this.state.user);
    this.setState({ isRedirect: true })
  }

  handleSubmit(e: any) {
    e.preventDefault();
    var user = this.state.user.user;
    this.props.onUpdateUser(this.state.user);
    this.setState({ isRedirect: true })
  }

  render() {
    if (this.state.isRedirect) return (<Redirect to="/" />)
    var image = this.state.url;
    if (image.length == 0) {
      image = '/assets/user.png';
    }

    if (this.props.user) {
      return (
        <div className="mainContainer__box">
          <Card className="container_box  mrg">
            <form onSubmit={this.handleSubmit}>
              <CardTitle title="Profile" expandable={true} />
              <div className="flex-container">
                <div className="wrapUserImg">
                  <img className='imgContCover' src={image} alt="img" />
                </div>
                <div className="wrapUserInfo">

                  <CardHeader title="Personal data" style={{ textAlign: 'left', padding: '5px', fontWeight: 'bold' }} />
                  <Divider />
                  <CardText style={{ padding: '5px' }} >
                    <div >
                      <TextField
                        name="firstName"
                        floatingLabelFixed={true}
                        floatingLabelText="First Name"
                        value={(this.state.user.firstName) ? this.state.user.firstName : ''}
                        onChange={this.onChangeField}
                      />
                    </div>
                    <div >
                      <TextField

                        name="lastName"
                        floatingLabelFixed={true}
                        floatingLabelText="Last Name"
                        value={(this.state.user.lastName ? this.state.user.lastName : '')}
                        onChange={this.onChangeField}
                      />
                    </div>
                    <div >
                      <TextField
                        name="email"
                        type="email"
                        required
                        floatingLabelFixed={true}
                        floatingLabelText="Email"
                        value={(this.state.user.email) ? this.state.user.email : ''}
                        onChange={this.onChangeField}
                      />
                    </div>
                    <div >
                      <TextField
                        floatingLabelFixed={true}
                        floatingLabelText="Phone">
                        <InputMask mask="+(099) 999 99 99"
                          name="phone"
                          onChange={this.onChangeField}
                          value={(this.state.user.phone) ? this.state.user.phone : ''} />
                      </TextField>
                    </div>
                    <div className="button-line flex-end">
                      <div className="pddng">
                        <RaisedButton onClick={this.handleDelete} label="Delete User" secondary={true} />
                      </div>
                      <div className="pddng">
                        <RaisedButton type="submit" label="Save changes" primary={true} />
                      </div>
                    </div>
                  </CardText>
                </div>

              </div>
            </form>
          </Card>
        </div>
      )
    }
    else return (<div>not found</div>)
  }

}

export function mapStateToProps(state: AppState, ownProps: any) {
  return {
    user: ownProps.match.params.id && state.users.filter(item => item.id == ownProps.match.params.id)[0]
  }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    onUpdateUser: (user: User) => { dispatch(action.updateDataUser(user)) },
    onDeleteUser: (user: User) => { dispatch(action.deleteUserFromDB(user)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);