import React from 'react';
import {findDOMNode} from 'react-dom';

import Text from './CrossPlatform/Text.jsx';

import CropOverlay from './CropOverlay.jsx';
import AcceptCheckbox from './AcceptCheckbox.jsx';

import { handleFileSelect, fileReader } from '../fileReader.js';


// import $ from 'jquery';

import $ from '../jquery.Jcrop.js';									//because in this file I import jquery and extend it then re-export jquery

import eventEmitter from '../eventEmitter.js';


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

		this.window = window;				//this will help optimize to prepare for the onResize event

		this.state = {
			cropOverlay: false,
			croppedBase64String: '',		//this will be used to hold the cropped base 64 string of the original image the user selected from their device to drop for later if needed
			croppedImageWidth: 0,
			JcropEvent: '',					//acessible via c.x, c.y, c.x2, c.y2, c.w, c.h
			showAcceptCheckbox: false,
			takePictureWidth: 0,
			thumbnailTitle: '',
			thumbnailSrc: ''
		}
	}
	componentWillMount() {
		this.refs = [];								//refs will be used as a hash to store DOM references to the elements I'm creating & using
	}
	componentDidMount() {
		var self = this;							//to avoid conflicting with jquery's own `this` binding
		$(window).resize(self.onResize.bind(self));	//bind to the resize event
		this.onResize();
	}
	canvas(coords) {
		//this.canvas gets called every time the user changes the cropping area
		var imageObj = this.refs['userThumbnail'];
		var canvas = this.refs['JcropCanvas'];
		if(typeof imageObj !== 'undefined') {
			canvas.width  = coords.w;
			canvas.height = coords.h;
			var context = canvas.getContext('2d');
			context.drawImage(imageObj, coords.x, coords.y, coords.w, coords.h, 0, 0, canvas.width, canvas.height);
			this.png();


		}

	}
	png() {
		//place the base64 string in the state for later if needed
		var png = this.refs['JcropCanvas'].toDataURL('image/png');
		// $(this.refs['pngInput']).val(png);
		this.setState({
			croppedBase64String: png
		})
	}
	setStateHelper(stateToSet) {	//this is exposed to be able to set the state from another component
		this.setState(stateToSet);
	}
	onResize() {
		this.setState({
			//keep the picture width be as big as the window's width is
			takePictureWidth: this.window.innerWidth + 'px'
		})
	}
	render() {
		//this is to get the total width available, then take away ...
		// let _totalWidth = this.refs['cropContainer'].getBoundingClientRect().width;
		// styles.userThumbnail = {...styles.userThumbnail, width: (_totalWidth - this.state.croppedImageWidth) + 'px'};
		if(this.refs['userThumbnail']) {
			//i.e. if I have a reference to the native element
			let tmpDisplay = this.refs['userThumbnail'].style.display,
				tmpVisibility = this.refs['userThumbnail'].style.visibility;
			this.refs['userThumbnail'].style.visibility = 'hidden';					//toggle to block to allow the element to be measured...also set visibility to hidden so this measurment isn't shown to the user accidentally
			this.refs['userThumbnail'].style.display = 'block';
			
			let x = this.refs['userThumbnail'].getBoundingClientRect();
			
			styles.JcropCanvas = {...styles.JcropCanvas, top: x.top + (x.bottom - x.top), left: x.left};
			
			this.refs['userThumbnail'].style.visibility = tmpVisibility;			//set the styles back to what they were before doing the trickery above to get a measurement
			this.refs['userThumbnail'].style.display = tmpDisplay;
			
			// console.log(x, this.refs['userThumbnail']);
		}
		return (
			<div className='take-picture' style={{width: this.state.takePictureWidth}}>
				<div className='tpic-child'>
					<Text value='Take Picture' />
					{' '}
					<input onChange={(e) => { handleFileSelect(e, this.setStateHelper.bind(this)) }} id='file' type='file' accept='image/*' capture='camera' /> {/* this is what sets the raw base64 string when the user selects it from the input element */}
				</div>
				<div className='tpic-child'>
					<Text value='Choose Existing' />
					{' '}
					{/*<input type='file' />*/}
					<input onChange={(e) => { handleFileSelect(e, this.setStateHelper.bind(this)) }} id='file' type='file' accept='image/*' /> {/* this is what sets the raw base64 string when the user selects it from the input element */}
				</div>
				{this.state.thumbnailSrc !== '' &&
					<div style={{width: '100%'}}>
						{/* Display the picture to the user after they have either taken the picture, or chose an existing one.
							This is where the user needs to be able to crop the image
						*/}
						<Text display='block' text='drag to outline 1st address portion' />
						{this.state.showAcceptCheckbox === true &&
							<AcceptCheckbox JcropEvent={this.state.JcropEvent} />
						}

						<div ref={(eref) => {this.refs['cropContainer'] = findDOMNode(eref)}} style={{width: '100%'}} className='crop-container'>
							{/* this will be where to original image is shown and also the real time portion of the image being cropped beside the original image, horizontally */}
							<img ref={(eref) => {this.refs['userThumbnail'] = findDOMNode(eref)}} className='dynamicThumbnail' id='userThumbnail' src={this.state.thumbnailSrc} title={this.state.thumbnailTitle} onLoad={() => { $('#userThumbnail').Jcrop({
								onSelect: (e) => {this.canvas(e); this.setState({showAcceptCheckbox: true, JcropEvent: e})},
								//TODO: get mouse position and show a component overlay that's a checkbox to accept the current cropped portion
								onChange: (e) => {this.canvas(e); this.setState({showAcceptCheckbox: true, JcropEvent: e})},
								onRelease: (e) => {this.canvas(e); this.setState({showAcceptCheckbox: true, JcropEvent: e})}
							});}} />

							<canvas style={styles.JcropCanvas} className='JcropCanvas' ref={(eref) => {this.refs['JcropCanvas'] = findDOMNode(eref)}}></canvas>{/* TODO: add min and max heights based on users screen size; this will be used to help the user preview what they are cropping */}
						</div>


						{/* once the user selects this crop button, they should of already properly cropped the address from the photo taken/uploaded so it will toggle sections to show from this section to the <CropOverlay /> component */}
						<button onClick={(e) => { this.setState({ cropOverlay: true, thumbnailSrc: '', showAcceptCheckbox: false }) }} id='dynamicThumnailButton'>
							Crop
						</button>
					</div>
				}

				{/* <CropOverlay /> shows the cropped image and has the logic to send messages to get an image decoded with OCR using google's apis they have available for a google app script web app */}
				{this.state.cropOverlay === true &&
					<CropOverlay croppedBase64={this.state.croppedBase64String} img={<img src={this.state.thumbnailSrc} title={this.state.thumbnailTitle} />} croppedImg={<img src={this.state.croppedBase64String} title={this.state.thumbnailTitle} />} src={this.state.thumbnailSrc} />
				}
			</div>
		)
	}
}

var styles = {
	root: {
		width: '100%',
		height: '100%'
	},
	JcropCanvas: {},
	userThumbnail: {}
}
