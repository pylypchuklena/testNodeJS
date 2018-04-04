import * as React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { TextField, RaisedButton } from 'material-ui';
import { User, Errors } from './SignUpForm';
import { Link } from 'react-router-dom';

interface IPropsLogin {
    onSubmit: (e: any) => void;
    onChange: (e: any) => void;
    user: User;
    error: Errors;
    successMsg:string;
}
export class LoginForm extends React.Component<IPropsLogin, any>{
    /**
     *
     */
    constructor(props: IPropsLogin) {
        super(props);

    }
    render() {
        return (

            <Card className="container">
                <form onSubmit={this.props.onSubmit} >
                    <h2 className='card-heading'>Login</h2>
                    {this.props.successMsg && <p className="success-message">{this.props.successMsg}</p>}
                    {this.props.error.summary && <p className="error-message">{this.props.error.summary}</p>}
                    <div className="field-line">
                        <TextField
                            floatingLabelText="Email"
                            onChange={this.props.onChange}
                            errorText={this.props.error.fieldEmail}
                            name="email" />
                    </div>
                    <div className="field-line">
                        <TextField
                            errorText={this.props.error.fieldPassword}
                            floatingLabelText="Password"
                            type="password"
                            onChange={this.props.onChange}
                            name="password" />
                    </div>
                    <div className="button-line">
                        <RaisedButton type="submit" label="Log in" primary />
                    </div>
                    <CardText>Don't have account? <Link to="/signup">Create one</Link></CardText>
                </form>

            </Card>
        )
    }
}
export default LoginForm;