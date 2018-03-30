import * as React from 'react';
import { Link } from 'react-router-dom';
import UiButton from './simpleComponent/UiButton';

export class BaseLayout extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);

    }
    render() {
        return (
            <React.Fragment>
                <header className="flex header">
                    <h1 className="header__title"><Link to="/" className="link"> Pylyp.Anna</Link></h1>
                    <nav>
                        <ul className="flex">
                            <li>
                                <Link to="/login" className="link">Log In</Link>
                            </li>
                            <li>
                                <Link to="/singup" className="link">Sing In</Link>
                            </li>
                            <li>
                                <UiButton primary={true} btnSm={true}>UiButton</UiButton>
                            </li>
                            <li>
                                <UiButton >UiButton</UiButton>
                            </li>
                            <li>
                                <UiButton disabled={true} icon={'assets/github-logo.svg'} btnLg={true} >UiButtonIcon</UiButton>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className="mainContainer">
                        {this.props.children}
                </div>
                <footer className="flex footer">
                    <p>made with love</p>
                </footer>
            </React.Fragment>
        )
    }

}
export default BaseLayout;