import React from 'react';

export default class AcceptCheckbox extends React.Component {
	//prop jCropEvent //acessible via c.x, c.y, c.x2, c.y2, c.w, c.h
	render() {
		styles.root = {
			...styles.root, 
			left: typeof this.props.JcropEvent.x === 'undefined' ? '' : this.props.JcropEvent.x, 
			top: typeof this.props.JcropEvent.y === 'undefined' ? '' : this.props.JcropEvent.y, 
		};
		return (
			<div className='AcceptCheckbox' style={styles.root}>

			</div>
		)
	}
}

let styles = {
	root: {
		display: 'inline-block',
		fontSize: '14px',
		width: '150px',
		height: '55px',
		position: 'absolute',
		zIndex: 1,
		backgroundColor: 'purple'
	}
}
