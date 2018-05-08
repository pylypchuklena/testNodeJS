import * as React from 'react';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import { Card, CardTitle, CardText } from 'material-ui';
import { Link } from 'react-router-dom';
export class NotFound extends React.Component<any, any>{
  /**
   *
   */
  constructor(props: any) {
    super(props);
 
  }
  render() {
    return (
      <div className="notFound-page">
        <div className="page-header page-header--main header-filter clear-filter purple-filter bg">

        </div>
        <div className=" main main-raised">
          <div className="card_box">
            <Card className="container_box mrg">
              <CardTitle>NOT FOUND</CardTitle>
              <CardText ><Link to="/">Back to main</Link> </CardText>
            </Card>
          </div>
        </div>
      </div>

    )
  }

}
export default NotFound;