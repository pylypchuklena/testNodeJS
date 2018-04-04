import * as React from 'react';
import { Card, CardTitle, CardText } from 'material-ui';

export class HomePage extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);

    }
    render() {
        return (
            <React.Fragment>
                <Card className="container">
                    <CardTitle
                        title="Homepage"
                        subtitle="You get access to this page if you not authentication."
                    />
                    <CardText ><div className="error-message">Homepage</div></CardText>
                </Card>
            </React.Fragment>
        )
    }

}
export default HomePage;