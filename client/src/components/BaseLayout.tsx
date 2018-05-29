import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { HomePage } from '../containers/HomePage';
import { Logout } from '../components/Logout';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import BtnAppBar from '../containers/BtnAppBar';
import AppBar from '@material-ui/core/AppBar';
import Sidebar from "./Sidebar";
import Hidden from '@material-ui/core/Hidden/Hidden';

export class BaseLayout extends React.Component<any, any>{
  /**
   *
   */
  constructor(props: any) {
    super(props);
    this.state = {
      bar: ''
    }
  }

 
  render() {
   

    return (
      <>
        <Header /> 
       <div className="mainContainer">
          {this.props.children}
        </div>
    
        <Footer />
      </>
    )
  }

}
export default BaseLayout;