import * as React from 'react';
import * as ReactDom from 'react-dom';
import {HomePage} from './components/HomePage';


ReactDom.render(
    <HomePage/>,
     document.getElementById('app') as HTMLElement
)