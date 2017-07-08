import React from 'react';

// import { Router, Route, hashHistory } from 'react-router';


// import store from './store.js'

import Text from './Text.jsx';


import '../../css/TakePicture.css';

export default class TakePicture extends React.Component {
	render() {
		return (
			<div className='take-picture'>
				<div>
					<Text value='Take Picture' />
					{' '}
					<input type='file' accept='image/*' capture='camera' />
				</div>
				<div>
					<Text value='Choose Existing' />
					{' '}
					<input type='file' />
				</div>
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
