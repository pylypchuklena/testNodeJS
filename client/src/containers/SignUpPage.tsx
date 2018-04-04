import * as React from 'react';
import { SignUpForm, User, Errors } from '../components/SignUpForm';
import { Redirect } from 'react-router';



export class SignUpPage extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);
        this.state = {
            user: new User(), 
            error: new Error(),
            isRedirect: false
        }
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onChangeField = this.onChangeField.bind(this);
    }

    onSubmitForm(e:any) {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/signup');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.responseType= 'json';
        xhr.addEventListener('load',()=>{
            if(xhr.status === 200){
    
                localStorage.setItem('successMessage', xhr.response.message)
                this.setState({
                    error: new Errors(),
                    isRedirect: true
                })
            }else{
                var errorSignUp = new Errors();

                if(xhr.response.errors){
    
                    errorSignUp.fieldEmail = xhr.response.errors.email ? xhr.response.errors.email : '';
                    errorSignUp.fieldName = xhr.response.errors.name ? xhr.response.errors.name:'';
                    errorSignUp.fieldPassword = xhr.response.errors.password ? xhr.response.errors.password : '';
                    errorSignUp.fieldConfirm = xhr.response.errors.confirm ? xhr.response.errors.confirm : '';
                }

                errorSignUp.summary = xhr.response.message ? xhr.response.message : '';

                this.setState({
                    error: errorSignUp
                })
            }
        })
        xhr.send(JSON.stringify(this.state.user))

    }

    onChangeField(e: any) {
        const field = e.target.name;
        const user = this.state.user;
        user[field]=  e.target.value;
        this.setState({user});

    }
    render() {
        if(this.state.isRedirect) return(<Redirect to='/login'/>)
        return (
            <div className="mainContainer__box">
                <SignUpForm onSubmit={this.onSubmitForm}
                    error={this.state.error}
                    onChange={this.onChangeField}
                    user={this.state.user} />
            </div>
        )
    }
}
export default SignUpPage;