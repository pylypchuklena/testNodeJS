import * as React from 'react';
import { Card, CardTitle, CardText } from 'material-ui';
import ImageGrid from './ImageGrid';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import { Link } from 'react-router-dom';

export class HomePage extends React.Component<any, any>{
  /**
   *
   */
  constructor(props: any) {
    super(props);

  }
  render() {
    return (
      <div className="home-page">
        <div className="page-header header-filter clear-filter purple-filter bg">

        </div>
        <div className=" main main-raised">
          <div className="container_box profile">
            <div className="avatar">
              <img src="./assets/img/avatar.jpg" alt="ava" className="img-raised rounded-circle img-fluid" />
            </div>
            <div className="name">
              <h3 className="title">Pylypchuk Anna</h3>
              <h6>Makeup Artist</h6>
              <a href="#" className="btn btn-just-icon btn-link">
                <i className="fa fa-facebook-square"></i>
              </a>
              <a href="#" className="btn btn-just-icon btn-link">
                <i className="fa fa-instagram"></i>
              </a>
              <div className="description text-center">
                <p>Makeup artist with considerable range services. I can do wedding and evening lovely looks </p>
              </div>
            </div>
            <Link to="/login">
              <RaisedButton
                label="register on makeup"
                labelPosition="before"
                primary={true}
                icon={<ActionFavorite />}
                
              />
            </Link>
          </div>
          <div className="flex-center gallery">
            <ImageGrid />
          </div>

        </div>
      </div>
    )
  }

}
export default HomePage;