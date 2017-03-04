import React from 'react';


import AddressValidation from './AddressValidation.jsx';

// import store from './store.js'


export default class App extends React.Component {
	render() {
		return (
			<div style={styles.root}>

				<AddressValidation />

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
