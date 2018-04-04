import * as React from 'react';
import { Route } from 'react-router';
import Auth from '../models/Auth';
import { HomePage } from './HomePage';



export class PrivateRoute extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);

    }
    render() {
        var comp = (Auth.isUserAuthenticated() && this.props.component )? this.props.component : HomePage;  
        return (
            <Route {...this.props} component={comp} />

        )
    }
}
export default PrivateRoute;