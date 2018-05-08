import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { HomePage } from '../components/HomePage';
import { Logout } from '../components/Logout';

export class BaseLayout extends React.Component<any, any>{
  /**
   *
   */
  constructor(props: any) {
    super(props);

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