import React from 'react';
import {findDOMNode} from 'react-dom';

import 'jquery';
import $ from 'jquery.animate';

/*
	TODO: 	add logic in PictureSection that will allow me to render a picture rather than just a div

*/
export default class PictureSection extends React.Component {
	constructor(props) {
		super(props);

		//setRef is a prop passed in from the parent to allow the parent to have a reference to the domElement to use jquery.animate on it
		this.setRef = props.setRef;
	}
	componentDidMount() {
		var pictureSection = findDOMNode(this);

		console.log(pictureSection.getBoundingClientRect().top)

		this.setRef(pictureSection, pictureSection.getBoundingClientRect().top * -1);
		//now that the component is mounted, I will start the animation
		// this.translateLeft()
	}
	render() {
		var _styles = {}

		if(this.props.left !== 0) {
			_styles.root = { ...styles.root, left: this.props.left }
		}
		else {
			_styles.root = { ...styles.root }
		}


		//TODO: get this marginTopOfPictureSection prop to pass in and work correctly. I just need to have the top shift position passed into PictureSection during the transition between TutorialScreenTwo.jsx and TutorialScreenThree.jsx
		if(this.props.marginTopOfPictureSection !== '') {
			_styles.root = { ..._styles.root, marginTop: this.props.marginTopOfPictureSection }
		}

		return (
			<div style={_styles.root}>
				PictureSection.jsx
			</div>
		)
	}
}

var styles = {
	root: {
		width: '100%',
		height: 200,
		backgroundColor: 'orange',
		position: 'relative',
		left: 0,
		top: 40
	}
}
