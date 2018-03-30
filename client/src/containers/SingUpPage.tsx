import * as React from 'react';
import { SingUpForm } from '../components/SingUpForm';

export class SingUpPage extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);

    }
    render() {
        return (
          
                <div className="mainContainer__box">
                 
                        <SingUpForm />
                </div>
         
        )
    }
}
export default SingUpPage;