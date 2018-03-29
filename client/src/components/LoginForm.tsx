import * as React from 'react';

export class LoginForm extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);

    }
    render() {
        return (
            <React.Fragment>
                <div className="mainContainer__box">
                <div className="card">
                <h2>Login</h2>
                <form action="" className="form">
                    <input type="text" placeholder="Email" name="email" />
                    <input type="text" placeholder="password" name="password" />
                    <button type="submit">Submit</button>
                </form>
                </div>
                </div>
            </React.Fragment>
        )
    }
}
export default LoginForm;