import React from 'react';
import { findDOMNode } from 'react-dom';

import $ from 'jquery';

import { uploadImage } from '../sendImageToServer.js';

export default class CropOverlay extends React.Component {
	addForm() {
		// this works
		//
		// var image = new Image();
		// image.src = this.props.src;
		let action = 'https://script.google.com/macros/s/AKfycbzITk9OTp4yOL3-TzRUnCEvXFccKreakinuR7LiVXArT4NE7IU/exec'

		$(this.refs['formParent']).append(`
			<div id="formContainer" style="display: none;"><!-- coty 05-25-2017 - since React Components are so weird when it comes to forms, I like using standard html for these types of elements...anyways, App.jsx uses this form to do a POST to my google script by creating an event and sending it to the below <button id="sendEmail">Send</button> element -->
			  <form id="gform" method="POST" action="${action}">
			    <fieldset>
			      <textarea id="imgSrc" name="imgSrc" value="${this.props.src}"></textarea>
			    </fieldset>
			  </form>
			</div>
		`)
	}
	componentWillMount() {
		this.refs = [];
	}
	componentDidMount() {
		this.addForm();
	}
	submitForm() {
		console.log('in this.submitForm')
		

		uploadImage('testPic.jpg', this.props.src, 'image/jpeg')




		// $.ajax({
		//   type: 'GET',
		//   url: 'https://script.google.com/macros/s/AKfycbzITk9OTp4yOL3-TzRUnCEvXFccKreakinuR7LiVXArT4NE7IU/exec',
		//   data: {imgSrc: this.props.src },
		//   success: (e) => {
		//   	console.log('in sucess: ', e)
		//   },
		//   dataType: 'jsonp'
		// });
	}
	render() {
		return (
			<div style={styles.root}>
				{this.props.img}

				<div ref={(eref) => { this.refs['formParent'] = findDOMNode(eref) }}></div>
			
				<input type='button' onClick={(e) => { this.submitForm() }} value='Make Call To Google Apps Script' />

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
