import React from 'react';

export default class CropOverlay extends React.Component {
	render() {
		return (
			<div style={styles.root}>
				{this.props.img}

			</div>
		)
	}
}

var styles = {
	root: {

	}
}
