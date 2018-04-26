import * as React from 'react';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

export class Footer extends React.Component<any, any>{
  /**
   *
   */
  constructor(props: any) {
    super(props);

  }
  render() {
    return (
      <footer className=" footer">
      <div className="container_box flex_center">
        <div className="copyright flex-align-center">
                <p>© 2018, made with</p>
                 <i className="icon-favorite"><ActionFavorite style={{ height:'20px', width: '20px',fill: 'rgb(60, 72, 88)'}}/> </i>
            </div>
        </div>
      </footer>

    )
  }

}
export default Footer;