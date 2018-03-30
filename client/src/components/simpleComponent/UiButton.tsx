import * as React from 'react';
import { Link } from 'react-router-dom';
// import styles from 'stylesBtn.css';
interface IButtonProps {

    primary?: boolean;
    secondary?: boolean;
    disabled?: boolean;
    icon?:string;
    btnSm?:boolean;
    btnLg?:boolean;

}
export class UiButton extends React.Component<IButtonProps, any>{
    /**
     *
     */
    constructor(props: IButtonProps) {
        super(props);

    }
    render() {

        var buttonClass = 'button';

        if (this.props.primary)
            buttonClass += ' button--primary'
        else if (this.props.secondary)
            buttonClass += ' button--secondary'
        if (this.props.disabled)
            buttonClass += ' button--disabled'
        if(this.props.btnSm)
            buttonClass += ' btn-sm'
        if(this.props.btnLg)
            buttonClass += ' btn-lg'
        return (
        <a href="#" className={buttonClass}><span>
            {(this.props.icon && this.props.icon.length>0 )&& <i className="icon"><img src={this.props.icon} alt="icon"/></i>}{this.props.children}</span></a>
        )
    }
}
export default UiButton;