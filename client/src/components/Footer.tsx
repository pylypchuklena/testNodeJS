import * as React from 'react';
import { Link } from 'react-router-dom';
import UiButton from './simpleComponent/UiButton';


export class Footer extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);

    }
    render() {
        return (
                <footer className="flex footer">
                    <p>made with love</p>
                </footer>
         
        )
    }

}
export default Footer;