import React from 'react';

// import { Router, Route, hashHistory } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom'


import AddressValidation from './AddressValidation.jsx';
import TakePicture from './TakePicture.jsx';

// import store from './store.js'


export default class App extends React.Component {
	render() {
		return (
			<div style={styles.root}>

				{/*<AddressValidation />*/}

				<BrowserRouter>
					<Route path='/' component={TakePicture} />
				</BrowserRouter>

			</div>
		)
	}
}

var styles = {
	root: {
		width: '100%',
		height: '100%'
	}
}
