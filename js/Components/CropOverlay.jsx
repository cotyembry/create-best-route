import React from 'react';

import EmailForm from './DoPostGAS.jsx';

export default class CropOverlay extends React.Component {
	render() {
		return (
			<div style={styles.root}>
				{/*this.props.img*/}
				{this.props.croppedImg}

				<EmailForm imgSrc={this.props.croppedBase64} />

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
