import * as React from 'react';
import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

interface IPropsSingUp {
    onSubmit: (e: any) => void;
    onChange: (e: any) => void;
    user: User;
    error: Errors;
}

export class User {
    name: string;
    password: string;
    email: string;
    confirm: string;
    [k: string]: any;
}

export class Errors {
    fieldName: string;
    fieldPassword: string;
    fieldEmail: string;
    fieldConfirm: string;
    summary: string;
    [k: string]: any;
}
export class SignUpForm extends React.Component<IPropsSingUp, any>{
    /**
     *
     */
    constructor(props: IPropsSingUp) {
        super(props);

    }
    render() {
        return (

            <Card className="container">

                <form onSubmit={this.props.onSubmit} >
                    <h2 className='card-heading'>Sign Up</h2>
                    {this.props.error.summary && <p className="error-message"> {this.props.error.summary}</p>}
                    <div className="field-line">
                        <TextField
                            floatingLabelText="Name"
                            errorText={this.props.error.fieldName}
                            name="name"
                            onChange={this.props.onChange} />
                    </div>
                    <div className="field-line">
                        <TextField
                            floatingLabelText="Email"
                            errorText={this.props.error.fieldEmail}
                            name="email"
                            onChange={this.props.onChange}
                        />
                    </div>
                    <div className="field-line">
                        <TextField
                            floatingLabelText="Password"
                            errorText={this.props.error.fieldPassword}
                            name="password"
                            onChange={this.props.onChange}
                        />
                    </div>
                    <div className="field-line">
                        <TextField
                            floatingLabelText="Confirm password"
                            errorText={this.props.error.fieldConfirm}
                            name="confirm"
                            onChange={this.props.onChange}
                        />
                    </div>
                    <div className="button-line">
                        <RaisedButton type="submit" label="create new account" primary />
                    </div>
                    <CardText>Allready have an account? <Link to="/login">Log in</Link></CardText>
                </form>
            </Card >

        )
    }
}
export default SignUpForm;