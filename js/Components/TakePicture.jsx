import React from 'react';

import Text from './CrossPlatform/Text.jsx';

import CropOverlay from './CropOverlay.jsx';

import { handleFileSelect, fileReader } from '../fileReader.js';


// import $ from 'jquery';

import $ from '../jquery.Jcrop.js';



import '../../css/TakePicture.css';


/**
 *  -This will present the user with two input buttons; one to take a picture and one to choose an existing (TODO: refactor this later into 1 button when its more stable)
 *  -This will also need to allow the user to crop a photo to "clean it up" before sending it to be processed be the ocr logic
 *  -It will then take the text returned, if any, and will display the returned text data from the photo as components
 *
 *
 *
 */


export default class TakePicture extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cropOverlay: false,
			JcropEvent: '',
			showAcceptCheckbox: false,
			thumbnailTitle: '',
			thumbnailSrc: ''
		}
	}
	componentDidMount() {
		
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
					<input onChange={(e) => { handleFileSelect(e, this.setStateHelper.bind(this)) }} id='file' type='file' accept='image/*' capture='camera' /> {/* this is what sets the raw base64 string when the user selects it from the input element */}
				</div>
				<div className='tpic-child'>
					<Text value='Choose Existing' />
					{' '}
					<input type='file' />
				</div>
				{this.state.thumbnailSrc !== '' &&
					<div>
						{/* Display the picture to the user after they have either taken the picture, or chosen an existing one.
							This is where the user needs to be able to crop the image
						*/}
						<Text display='block' text='drag to outline 1st address portion' />
						{this.state.showAcceptCheckbox === true &&
							<div style={{display: 'none', left: this.state.JcropEvent.clientX, top: this.state.JcropEvent.clientY}}>{/*TODO: create component called AcceptCheckbox - I might have to bind to a mouse up event before hand to get where to put the coordinates for the final checkbox component*/}</div>
						}
						<img className='dynamicThumnail' id='userThumbnail' src={this.state.thumbnailSrc} title={this.state.thumbnailTitle} onLoad={() => { $('#userThumbnail').Jcrop({
							onSelect: (e) => {this.setState({showAcceptCheckbox: true, JcropEvent: e})},
							//TODO: get mouse position and show a component overlay that's a checkbox to accept the current cropped portion
							onChange: (e) => {this.setState({showAcceptCheckbox: true, JcropEvent: e})}
						});}} />
						<button onClick={(e) => { this.setState({ cropOverlay: true }) }} id='dynamicThumnailButton'>
							Crop
						</button>
					</div>
				}
				{this.state.cropOverlay === true &&
					<CropOverlay img={<img src={this.state.thumbnailSrc} title={this.state.thumbnailTitle} />} src={this.state.thumbnailSrc} />
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
