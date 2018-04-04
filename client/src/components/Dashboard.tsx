import * as React from 'react';
import { Card, CardTitle, CardText } from 'material-ui';

interface IDashboard {
    secretData: string
}
export class Dashboard extends React.Component<IDashboard, any>{
    /**
     *
     */
    constructor(props: IDashboard) {
        super(props);

    }
    render() {
        return (
            <Card className="container">
                <CardTitle
                    title="Dashboard"
                    subtitle="You should get access to this page only after authentication."
                />
                {this.props.secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{this.props.secretData}</CardText>}
            </Card>

        )
    }
}
export default Dashboard;