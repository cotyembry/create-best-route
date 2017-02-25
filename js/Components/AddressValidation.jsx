import React from 'react';


var parser = require('parse-address'); 
var parsed = parser.parseLocation('its somewhere at 1005 N Gravenstein Highway Sebastopol CA 95472');

// console.log(parsed)

export default class AddressValidation extends React.Component {
	constructor(props) {
		super(props);

		console.log(parsed)
	}
	render() {
		return (
			<div style={styles.root}>
				<span style={styles.spanHeader}>
					AddressValidation.jsx
				</span>
			
				{/* this.AddressElements.map((AddressElement) => AddressElement) */}

			</div>
		)
	}
}

var styles = {
	root: {
		width: '100%',
		height: '100%'
	},
	spanHeader: {
		width: '100%',
		height: 25
	}
}
