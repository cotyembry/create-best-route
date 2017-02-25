import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';


import App from './Components/App.jsx';

$(document).ready(function() {
	ReactDOM.render(<App />, document.getElementById('App'))
})
