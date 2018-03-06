import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import $ from 'jquery';
import createBrowserHistory from 'history/createBrowserHistory';
const newHistory = createBrowserHistory();

import CreateBestRoute from './Components/CreateBestRoute.jsx';

$(document).ready(function() {
	// ReactDOM.render(<CreateBestRoute />, document.getElementById('CreateBestRoute'))
	ReactDOM.render(
		<Router history={newHistory}>
			<Route path="/" component={CreateBestRoute} />
		</Router>,
		document.getElementById('CreateBestRoute')
	)
})
