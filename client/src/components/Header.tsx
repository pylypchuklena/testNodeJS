import * as React from 'react';
import { Link } from 'react-router-dom';
import UiButton from './simpleComponent/UiButton';
import { connect, Dispatch } from 'react-redux';
import {AppState, User} from '../types/userModel';
import * as action from '../action/';
import * as constants from '../constants';
import Auth from '../models/Auth';

export class Header extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);
    }


    render() {
      console.log(Auth.isUserAuthenticated());
        return (

            <header className="flex header">
                <h1 className="header__title"><Link to="/" className="link"> Pylyp.Anna</Link></h1>
                <nav>
                    {Auth.isUserAuthenticated() ? (
                        <ul className="flex">
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
                                    <Link to="/signup" className="link">Sign Up  </Link>
                                </li>
                            </ul>
                        )
                    }
                </nav>
            </header>

        )
    }

}
 export default Header;