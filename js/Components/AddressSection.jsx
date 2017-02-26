import React from 'react';


/**
 *	PropTypes:
 *		value: 	string, number
 *
 *
 *
 */

export default class AddressSection extends React.Component {
	constructor(props) {
		super(props);

	}
	render() {
		console.log(this.props.value)

		return (
			<div style={styles.root}>
				{ this.props.value }
			</div>
		)
	}
}

var styles = {
	root: {
		paddingTop: 5,
		paddingBottom: 5
		// width: '80%',
		// position: 'fixed',
		// top: '50%',
		// left: '50%'
	}
}
