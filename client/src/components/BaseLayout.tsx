import * as React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer  from './Footer';


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
                <Header/>
                <div className="mainContainer">
                        {this.props.children}
                </div>
                <Footer/>
            </>
        )
    }

}
export default BaseLayout;