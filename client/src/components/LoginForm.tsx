import * as React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { TextField, RaisedButton } from 'material-ui';

export class LoginForm extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);

    }
    render() {
        return (
        
                <Card className="container">
                    <h2 className='card-heading'>Login</h2>
                    <form action="" >

                        <div className="field-line">
                            <TextField floatingLabelText="Email"
                                name="email" />
                        </div>
                        <div className="field-line">
                            <TextField floatingLabelText="Password"
                                name="password" />
                        </div>
                        <div className="button-line">
                            <RaisedButton type="submit">Submit</RaisedButton>
                        </div>
                    </form>
    
                </Card>
                )
            }
        }
export default LoginForm;