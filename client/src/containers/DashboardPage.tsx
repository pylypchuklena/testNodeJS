import * as React from 'react';
import { Dashboard } from '../components/Dashboard';
import Auth from '../models/Auth';


export class DashboardPage extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);
        this.state={
            secretData: ''
        }
    }

    componentDidMount(){
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/dashboard');
        xhr.setRequestHeader('Content-type', 'application/json');
        // set the authorization HTTP header
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType="json";
        xhr.addEventListener('load', ()=>{
            if(xhr.status === 200){
                this.setState({
                    secretData: xhr.response.message
                })
            }
        });
        xhr.send();
    }

    render() {
        return (
            <Dashboard secretData={this.state.secretData}/>
           
        )
    }
}
export default DashboardPage;