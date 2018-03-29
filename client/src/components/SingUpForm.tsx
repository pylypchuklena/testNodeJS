import * as React from 'react';

export class SingUpForm extends React.Component<any, any>{
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
                    <h2>Sing Up</h2>
                    <form action="" className="form">
                        <input type="text" placeholder="Name" name="name" />
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
export default SingUpForm;