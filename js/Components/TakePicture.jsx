import React from 'react';

import Text from './Text.jsx';

import CropOverlay from './CropOverlay.jsx';

import { handleFileSelect, fileReader } from '../fileReader.js';

import '../../css/TakePicture.css';

export default class TakePicture extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cropOverlay: false,
			thumbnailTitle: '',
			thumbnailSrc: ''
		}
	}
	setStateHelper(stateToSet) {	//this is exposed to be able to set the state from another component
		this.setState(stateToSet);
	}
	render() {
		return (
			<div className='take-picture'>
				<div className='tpic-child'>
					<Text value='Take Picture' />
					{' '}
					<input onChange={(e) => { handleFileSelect(e, this.setStateHelper.bind(this)) }} id='file' type='file' accept='image/*' capture='camera' />
				</div>
				<div className='tpic-child'>
					<Text value='Choose Existing' />
					{' '}
					<input type='file' />
				</div>
				{this.state.thumbnailSrc !== '' &&
					<div>
						<img className='dynamicThumnail' src={this.state.thumbnailSrc} title={this.state.thumbnailTitle} />
						<button onClick={(e) => { this.setState({ cropOverlay: true }) }} id='dynamicThumnailButton'>
							Crop
						</button>
					</div>
				}
				{this.state.cropOverlay === true &&
					<CropOverlay img={<img src={this.state.thumbnailSrc} title={this.state.thumbnailTitle} />} />
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
