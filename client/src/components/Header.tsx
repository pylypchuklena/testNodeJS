import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { AppState, User } from '../types/userModel';
import * as action from '../action';
import * as constants from '../constants';
import Auth from '../models/Auth';
import Axios from 'axios';
import ActionHome from 'material-ui/svg-icons/action/home';
import AuthorizeUser from './AuthorizeUser';



export class Header extends React.Component<any, any>{
  /**
   *
   */
  constructor(props: any) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      isScroll: false,
      redirectPath:''
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    var path ='';
     path = Auth.getAuthUser().role == "admin"?"/dashboard":"/";
    this.setState({
      redirectPath: path
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event: any) {
    let scrollTop = event.srcElement.body.scrollTop;
    if (scrollTop >= 100) {
      this.setState({
        isScroll: true
      });
    } else {
      this.setState({
        isScroll: false
      });
    }
  }

  render() {
    return (
      <header className=" header fixed-top">
        <nav className={" container navbar" + (!this.state.isScroll ? 'navbar-transparent' : ' ')}>
          <div className=" flex container-raised">
            <h1 className="header__title">
              <Link to={this.state.redirectPath} className="link">
                <ActionHome
                  className="muidocs-icon-action-home icon-home"
                  style={{ height: '42px', width: '42px', fill: '#00bcd4' }}
                />
              </Link>
            </h1>
            <div>
              {Auth.isUserAuthenticated() ? (
                <ul className="flex">
                  <li>
                    <AuthorizeUser />
                  </li>
                  <li>
                    <Link to="/logout" className="link">Log Out</Link>
                  </li>
                </ul>
              ) : (
                  <ul className="flex">
                    <li>
                      <Link to="/login" className="link">Log In</Link>
                    </li>

                    <li>
                      <Link to="/signup" className="link" >Sign Up  </Link>
                    </li>
                  </ul>
                )
              }
            </div>
          </div>
        </nav>


      </header>

    )
  }

}
export default Header;