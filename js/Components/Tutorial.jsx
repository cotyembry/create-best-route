import React from 'react';
import ReactDOM from 'react-dom';


import TutorialScreen from './TutorialScreen.jsx';

/**
 *	PropTypes:
 *		positionFromTop:	string, number
 *
 *
 *	Component Comment: 	<Tutorial /> will simply take up the entire view and go over the top of the whole view with a fixed position (it actually gets the DOM node using the react-dom api and uses the getBoundingClientRect method to get the .top property and translates the component up that amount, and then adds that height to the 100% height style to fill the entire screen)
 */

export default class Tutorial extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			topOffset: ''
		}
	}
	componentDidMount() {
		// var _topOffset = $(ReactDOM.findDOMNode(this)).offset().top;
		var _topOffset = ReactDOM.findDOMNode(this).getBoundingClientRect().top;

		this.setState({
			topOffset: _topOffset
		})
	}
	render() {
		var _styles = {}

		if(typeof this.props.positionFromTop !== 'undefined') {
			_styles.root = { ...styles.root, top: '-' + this.props.positionFromTop + 'px' }	//'-' + ... because I want to shift the Tutorial component up to fill the whole screen
		}
		else {
			_styles.root = { ...styles.root }
		}


		if(this.state.topOffset !== '') {
			_styles.root = { ..._styles.root, top: '-' + this.state.topOffset + 'px', height: 'calc(100% + ' + this.state.topOffset + 'px)' }
		}


		return (
			<div id="test" style={_styles.root}>
				
				<TutorialScreen screen={1} />

			</div>
		)
	}
}


var styles = {
	background: {
		width: '33%',
		height: '100%',
		backgroundColor: '#cccccc',
		float: 'right'
	},
	root: {
		width: '100%',
		height: '100%',
		opacity: '0.85',				//0.0 to 1.0
		backgroundColor: 'black',		//I set backgroundColor to black to completely hide the rest of the screen
		// backgroundColor: '#404040',
		// display: 'absolute',
		position: 'fixed',
		zIndex: 2
	}
}
