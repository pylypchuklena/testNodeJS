import * as React from 'react';
import { SignUpForm, User, Errors } from '../components/SignUpForm';



export class SignUpPage extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);
        this.state = {
            user: new User(), 
            error: new Error()
        }
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onChangeField = this.onChangeField.bind(this);
    }

    onSubmitForm(e:any) {
        console.log('onSubmit')
        e.preventDefault();
        console.log('name: ',this.state.user.name);
        console.log('email: ',this.state.user.email);
        console.log('password: ', this.state.user.password);
        console.log('confirm:  ', this.state.user.confirm);
    }

    onChangeField(e: any) {
        const field = e.target.name;
        const user = this.state.user;
        user[field]=  e.target.value;
        this.setState({user});

    }
    render() {
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