import React from 'react';
import { findDOMNode } from 'react-dom';

import base64url from 'base64-url';

import $ from 'jquery';

import eventEmitter from '../eventEmitter.js';

//DoPostGAS - GAS means Google App Script
//  Use <EmailForm /> for this Component

function base64ToBlob(base64, mime) {
	// console.log('here with:', base64.slice(0,50));
	base64 = base64.split('base64,')[1];				//this cleans up the base 64 string to be processed
	// console.log('done:', base64.slice(0,50));
	mime = mime || '';
	var sliceSize = 1024;
	var byteChars = window.atob(base64);
	var byteArrays = [];
	for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
		var slice = byteChars.slice(offset, offset + sliceSize);
		var byteNumbers = new Array(slice.length);
		for(var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}
		var byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}
	return new Blob(byteArrays, {type: mime});
}

export default class EmailForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			sendTo: '',
			subject: '',
			message: '',
			renderiFrame: true
		}
	}
	googleRunScript(blob, base64String) {
		//now try to hack away at sending an event or invoking an iframe's function
		// this.refs['googleRunScriptiFrame'].contentWindow.run();
		alert(base64String);
		google.script.run.withSuccessHandler(this.googleScriptRunSuccess).doSomething(base64String);
	}
	handleSubmit(messageObject) {
		var blob = base64ToBlob(this.props.imgSrc, 'image/png');
		this.googleRunScript(blob, this.props.imgSrc.split('base64,')[1]);
	}
	sendWithGoogle() {
		let base64String = this.props.imgSrc.split('base64,')[1];	//clean the string up first before sending it to the cloud
		alert(base64String);
		google.script.run.withSuccessHandler(this.googleScriptRunSuccess).doSomething(base64String);
	}
	googleScriptRunSuccess(data) {
		alert('in success handler:' + data)
	}
	_setStateHelper(stateToSet) {	//this is exposed in the render function to other components to allow the children to set their state
		this.setState(stateToSet);
	}
	render() {
		return (
			<div id="DoPostGAS">
				<button id="submitButton" style={styles.submit} onClick={this.handleSubmit.bind(this)}>Send</button>
			</div>
		);
	}
}


var styles = {
	labelStyle: {
		fontSize: 20,
		color: 'white'
	},
	sendTo: {
		marginBottom: 5
	},
	subject: {
		width: 280,
		height: 50,
		fontSize: 33,
		marginBottom: 5,
		// float: 'right'
	},
	messageBody: {
		width: 200,
		height: 200,
		fontSize: 30,
		marginBottom: 5
	},
	submit: {
		cursor: 'pointer',
		fontSize: 18
	}
}


export class CIFrame extends React.Component {
	constructor(props) {
		super(props);
		this.scriptUrl = 'https://script.google.com/macros/s/AKfycbzITk9OTp4yOL3-TzRUnCEvXFccKreakinuR7LiVXArT4NE7IU/exec';
	}
	componentWillMount() {
		this.refs = [];
	}
	componentDidMount() {
		// $(this.refs['iframeParent'].querySelectorAll('iframe')[0].contentWindow.document.body).append(`
		// 	<div id="formContainer" style="display: none;"><!-- coty 05-25-2017 - since React Components are so weird when it comes to forms, I like using standard html for these types of elements...anyways, App.jsx uses this form to do a POST to my google script by creating an event and sending it to the below <button id="sendEmail">Send</button> element -->
		// 		<form id="gform" method="POST"
		// 		action="https://script.google.com/macros/s/AKfycbzITk9OTp4yOL3-TzRUnCEvXFccKreakinuR7LiVXArT4NE7IU/exec">
		// 			<fieldset>
		// 				<textarea id="message" name="message" placeholder="Message Body"></textarea>
		// 			</fieldset>
		// 			<button id="sendEmail">Send</button>
		// 		</form>
		// 	</div>
		// `)
	}
	componentWillUnmount() {
		console.log('in componentWillUnmount');
		this.props.setStateHelper({
			renderiFrame: true
		})
	}
	googleScriptLoaded(e) {
		//if here then the google apps script has returned a response
	}
	render() {
		return (
			<div id='test' ref={(elementRef) => { this.refs['iframeParent'] = findDOMNode(elementRef) }}>
				<iframe src={this.scriptUrl} id='googleRunScript' onLoad={(e) => { this.googleScriptLoaded(e) }}></iframe>
			</div>
		)
	}
}
