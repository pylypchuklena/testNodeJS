import * as React from 'react';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CardText, RaisedButton } from 'material-ui';
export class SingUpForm extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);

    }
    render() {
        return (
          
                <Card className="container">
                    <h2 className='card-heading'>Sing Up</h2>
                    <form action="" >
                        <div className="field-line">
                            <TextField floatingLabelText="Name"
                                name="name" />
                        </div>
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
                </Card >
      
        )
    }
}
export default SingUpForm;