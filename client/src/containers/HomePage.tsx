import * as React from 'react';
import { Card, CardTitle, CardText } from 'material-ui';
import ImageGrid from '../components/ImageGrid';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import { Link } from 'react-router-dom';
import Auth from '../models/Auth';
import { MapContainer } from '../components/MapContainer';
import Axios from 'axios';
import OrdersList from '../components/OrdersList'
import Button from '@material-ui/core/Button';
export class HomePage extends React.Component<any, any>{

  constructor(props: any) {
    super(props);
  }

  render() {
    var user = Auth.getAuthUser();
    var path = "/login"
    var buttonLabel = "Log In"
    if (Auth.isUserAuthenticated()) {
      if (user.role == "admin") {
        path = "/dashboard";
        buttonLabel = "Dashboard"
      }
      else {
        path = "/user_dashboard";
        buttonLabel = "My Orders"
      }
    }

    return (
      <div className="home-page">
      
        <div className="page-header page-header--main header-filter clear-filter purple-filter bg">
        </div>
        <div className=" main main-raised">
          <div className="container_box profile">
          
            <div className="avatar">
              <img src="./assets/img/avatar.jpg" alt="ava" className="img-raised rounded-circle img-fluid" />
            </div>
            <div className="name">
            <Button variant="raised">Hello World</Button>
              <h3 className="title">Pylypchuk Anna</h3>
              <h6>Makeup Artist</h6>
              <a href="https://www.facebook.com/profile.php?id=100003856183966" target="blank" className="btn btn-just-icon btn-link">
                <i className="fa fa-facebook-square"></i>
              </a>
              <a href="https://www.instagram.com/pylyp.anna/" target="blank" className="btn btn-just-icon btn-link">
                <i className="fa fa-instagram"></i>
              </a>
              <div className="description flex-align-center"> <span className="btn-link icon"><i className="fa fa-phone"></i> </span> <span>(068) 222 22 22</span></div>
              <div className="description text-center">
                <p>Makeup artist with considerable range services. I can do wedding and evening lovely looks </p>
              </div>
            </div>
            <Link to={path} className="options__button">
              <RaisedButton
                label={buttonLabel}
                labelPosition="before"
                primary={true}
              />
            </Link>
          </div>
          <div className="flex-center gallery">
            <ImageGrid />
          </div>
          <h3 className="title flex-center">Our location</h3>
          <MapContainer />
        </div>
      </div>
    )
  }
}

export default HomePage;