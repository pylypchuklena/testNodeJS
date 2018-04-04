import * as React from 'react';
import { LoginForm } from '../components/LoginForm';
import { User, Errors } from '../components/SignUpForm';
import Auth from '../models/Auth';
import { Redirect } from 'react-router';

export class LoginPage extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);
        
        this.state = {
            user: new User(),
            error: new Errors(),
            successMsg: '',
            isRedirect: false
        }
        
        
        this.onSubmitUser = this.onSubmitUser.bind(this);
        this.onChangeFieldUser = this.onChangeFieldUser.bind(this);
    }
    componentDidMount(){
        const storedMsg = localStorage.getItem('successMessage');

        if(storedMsg){
            this.setState({successMsg : storedMsg});
            localStorage.removeItem('successMessage');
        }
    }
    onSubmitUser(e: any) {
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/login');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // save the token
                Auth.authenticateUser(xhr.response.token);
                this.setState({
                    error: new Errors(),
                    isRedirect: true
                })
            } else {
                var error = new Errors();

                if (xhr.response.errors) {
                    error.fieldEmail = xhr.response.errors.email ? xhr.response.errors.email : '';
                    error.fieldPassword = xhr.response.errors.password ? xhr.response.errors.password : '';
                }
                error.summary = xhr.response.message ? xhr.response.message : '';
                //update state
                this.setState({ error: error })

            }
        })
        //create a string for http body msg JSON
        xhr.send(JSON.stringify(this.state.user));
    }

    onChangeFieldUser(e: any) {
        const field = e.target.name;
        const user = this.state.user;
        user[field] = e.target.value;
        this.setState({
            user
        })
    }


    render() {
        if(this.state.isRedirect)return(<Redirect to="/"/>)
        return (
            <div className="mainContainer__box">
                <LoginForm onSubmit={this.onSubmitUser}
                    onChange={this.onChangeFieldUser}
                    error={this.state.error}
                    user={this.state.user}
                    successMsg={this.state.successMsg}
                />
            </div>

        )
    }
}
export default LoginPage;