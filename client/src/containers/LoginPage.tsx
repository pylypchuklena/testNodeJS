import * as React from 'react';
import { LoginForm } from '../components/LoginForm';
import { User, Errors } from '../components/SignUpForm';

export class LoginPage extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);
        this.state = {
            user: new User(),
            error: new Errors()
        }
        this.onSubmitUser = this.onSubmitUser.bind(this);
        this.onChangeFieldUser = this.onChangeFieldUser.bind(this);
    }

    onSubmitUser(e: any) {
        e.preventDefault();
        
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/login');
        
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.responseType = 'json';
        xhr.addEventListener('load',()=>{
            if(xhr.status ===200){
                this.setState({
                    error: new Errors()
                })
            }else{
                var error = new Errors();
                
                if(xhr.response.errors){
                    error.fieldEmail = xhr.response.errors.email ? xhr.response.errors.email : '';
                    error.fieldPassword = xhr.response.errors.password ? xhr.response.errors.password : '';
                   
                }
                error.summary = xhr.response.message ? xhr.response.message :'';
                //update state
                this.setState({error: error})
            
            }
        })
        //create a string for http body msg JSON
     
        xhr.send(JSON.stringify(this.state.user));

        
    }

    onChangeFieldUser(e: any) {
        const field = e.target.name;
        const user = this.state.user;
        user[field]= e.target.value;
        this.setState({
            user
        })
    }


    render() {
        return (
            <div className="mainContainer__box">
                <LoginForm onSubmit={this.onSubmitUser}
                    onChange={this.onChangeFieldUser}
                    error={this.state.error}
                    user={this.state.user}
                />
            </div>

        )
    }
}
export default LoginPage;