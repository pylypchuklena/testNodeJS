import * as React from 'react';
import { Link } from 'react-router-dom';

interface IButtonProps {

    primary?: boolean;
    secondary?: boolean;
    disabled?: boolean;

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

        return (
            <a href="#" className={buttonClass}><span>{this.props.children}</span></a>
        )
    }
}
export default UiButton;