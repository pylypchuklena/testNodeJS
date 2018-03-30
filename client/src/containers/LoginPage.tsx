import * as React from 'react';
import { LoginForm } from '../components/LoginForm';

export class LoginPage extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);

    }
    render() {
        return (
       
                 <div className="mainContainer__box">
                
                        <LoginForm />
                </div>
         
        )
    }
}
export default LoginPage;