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
				{/* TODO: make a redo circular button */}
				{/* TODO: make an accept button */}
				{/* TODO: make a cancel button maybe? */}
				{/* TODO: make a plus sign with arrows on the end button to signify move crop area but don't resize it */}
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
