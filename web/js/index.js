import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import $ from 'jquery';
import createBrowserHistory from 'history/createBrowserHistory';
const newHistory = createBrowserHistory();

import CreateBestRoute from './Components/CreateBestRoute.jsx';

// if (module.hot) {
// 	module.hot.accept('./Components/CreateBestRoute.jsx', function () {
// 		console.log('Accepting the updated printMe module!');
//   })
// }
if(typeof window.$ === 'undefined') {
	window.$ = $;
}

$(document).ready(function() {
	// $(document).bind(
	// 	'touchmove',
	// 	function (e) {
	// 		e.preventDefault();
	// 	}
	// );
	// document.ontouchmove = function (event) {
	// 	event.preventDefault();
	// }
	document.addEventListener('touchmove', function(event) {		//to help with Safari to not all to pan around
		event.preventDefault();
	},{passive: false})
	$(window).resize(() => {
		$('html, body').css({
			width: parseFloat(window.innerWidth) + 'px',
			height: parseFloat(window.innerHeight) + 'px'
		});
	});

	// ReactDOM.render(<CreateBestRoute />, document.getElementById('CreateBestRoute'))
	ReactDOM.render(
		<Router history={newHistory}>
			<Route path="/" component={CreateBestRoute} />
		</Router>,
		document.getElementById('CreateBestRoute')
	)
})
