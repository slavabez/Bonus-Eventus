import React from 'react';
import ReactDOM from 'react-dom';

import BeDice from "./components/BeDice";

import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BeDice />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
