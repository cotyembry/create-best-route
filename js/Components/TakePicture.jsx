import React from 'react';

// import { Router, Route, hashHistory } from 'react-router';


// import store from './store.js'

import Text from './Text.jsx';


import { handleFileSelect, fileReader } from '../fileReader.js';

import '../../css/TakePicture.css';

export default class TakePicture extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			thumbnailSpan: ''
		}
	}
	componentDidMount() {
		document.getElementById('file').addEventListener('change', (e) => {
			handleFileSelect(e, this.setStateHelper.bind(this));
			this.fileChanged();
		}, false);
	}
	fileChanged() {
		if(this.state.thumbnailSpan !== '') {
			document.getElementById('thumbnailSpan').appendChild(this.state.thumbnailSpan);
		}
		else {
			setTimeout(() => {
				this.fileChanged();
			}, 1000)
		}

		console.log(document.getElementById('thumbnailSpan'))
	}
	setStateHelper(stateToSet) {
		this.setState(stateToSet);
	}
	render() {
		return (
			<div className='take-picture'>
				<div className='tpic-child'>
					<Text value='Take Picture' />
					{' '}
					<input id='file' type='file' accept='image/*' capture='camera' />
				</div>
				<div className='tpic-child'>
					<Text value='Choose Existing' />
					{' '}
					<input type='file' />
				</div>
				{this.state.thumbnailSpan !== '' &&
					<div id='thumbnailSpan'></div>
				}
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
