import React from 'react';
import { findDOMNode } from 'react-dom';

import base64url from 'base64-url';

import $ from 'jquery';

import eventEmitter from '../eventEmitter.js';

//DoPostGAS - GAS means Google App Script
//  Use <EmailForm /> for this Component

function base64ToBlob(base64, mime) {
		mime = mime || '';
		var sliceSize = 1024;
		var byteChars = window.atob(base64);
		var byteArrays = [];

		for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
				var slice = byteChars.slice(offset, offset + sliceSize);

				var byteNumbers = new Array(slice.length);
				for (var i = 0; i < slice.length; i++) {
						byteNumbers[i] = slice.charCodeAt(i);
				}

				var byteArray = new Uint8Array(byteNumbers);

				byteArrays.push(byteArray);
		}

		return new Blob(byteArrays, {type: mime});
}

export default class EmailForm extends React.Component {
	cookieObject() {
			var cookieObject = {};
			document.cookie.split(' ').map((kvp) => { var kv = kvp.split('='); var x = {}; x[kv[0]] = kv[1]; return x })
			.map((object) => {
				let key = Object.keys(object)[0];
				cookieObject[key] = object[key];
			});

			return cookieObject;
	}
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			sendTo: '',
			subject: '',
			message: '',
			renderiFrame: true
		}

		//understanding and figuring out that I needed to bind this was so hard
		this.handleSubjectChange = this.handleSubjectChange.bind(this);
		this.handleMessageChange = this.handleMessageChange.bind(this);
	}
	componentDidMount() {
		//now I will format the labels and input elements
		var widthAvailable = $('#inputContainer').outerWidth();
		$('#inputContainer').css({ width: widthAvailable });
	}

	handleSubjectChange(event) {
		// console.log('in test')

		this.setState({subject: event.target.value});
	}

	handleMessageChange(event) {
		this.setState({message: event.target.value});
	}

	handleSubmit(event) {
		eventEmitter.on('googleRunScript', function() {
			alert('tada, custom event emitting');
		})

		eventEmitter.emit('googleRunScript');


		var messageBody = document.getElementById('messageBody').value;
		//sweet, now I have the messageBody next that was typed in the textarea element
		//now I need to use it and send it to the server so that an email can be sent
		// console.log('Email was submitted: ' +  messageBody);

		var finalObject = {
			subject: this.state.subject,
			messageBody: messageBody
		}
	


		//todo - finish this
		//What I probably need to do now is create a hidden form for
		//this page and use it to do a post when needing to send the
		//email on the node.js side of things rather than sending
		//this in the client


		//self.post('/send', finalObject);
		// let messageToSend = 'subject=' + this.state.subject + '&messageBody=' + messageBody;
		// this.sendEmail(messageToSend);

		let messageObject = {
			subject: this.state.subject,
			messageBody: messageBody
		}
		this.sendEmail(messageObject);

		event.preventDefault();
	}
	googleRunScript() {
		//now try to hack away at sending an event or invoking an iframe's function
		this.refs['googleRunScriptiFrame'].contentWindow.run();
	}
	post(path, params, method) {
		method = method || "post"; // Set method to post by default if not specified.

		// The rest of this code assumes you are not using a library.
		// It can be made less wordy if you use one.
		var form = document.createElement("form");
		form.setAttribute("method", method);
		form.setAttribute("action", path);

		for(var key in params) {
				if(params.hasOwnProperty(key)) {
						var hiddenField = document.createElement("input");
						hiddenField.setAttribute("type", "hidden");
						hiddenField.setAttribute("name", key);
						hiddenField.setAttribute("value", params[key]);

						form.appendChild(hiddenField);
				 }
		}

		document.body.appendChild(form);
		form.submit();
	}
	sendEmail(messageObject) {
		//Google Apps Script execution api
		//script id:
		//Mc0jDObeKwDpQ2xgyvZUYrmDtFGJL1AU8

		let iframe = $('#emailiFrameContainer')[0],
			gForm = $(iframe.contentWindow.document).find('#gform')[0],
			scriptUrl = gForm.getAttribute('action');


		var stringBlobLength = this.props.imgSrc.length; //this just helps me format the returned base64 string to send to the next funciton

		// console.log(this.props.imgSrc[0] + this.props.imgSrc[1] + this.props.imgSrc[2] + this.props.imgSrc[3] + 'pretty format =:',this.props.imgSrc.slice(4, stringBlobLength));
		
		// console.log(base64ToBlob(this.props.imgSrc.slice(22, stringBlobLength), 'image/png'));


		(function buildURL(url, self, imgSrc) {
			//this will iterate through the kind of weird cookie string format and convert it to a typical json object so it is easier to work with later
			var cookieObject = self.cookieObject();


			// if(typeof cookieObject['url'] === 'undefined' || cookieObject['url'] === '') {
			// 	console.log('true');
			// 	document.cookie = 'url=' + base64url.escape(self.props.imgSrc.slice(22, stringBlobLength));
			// }

			if(typeof cookieObject['state'] === 'undefined' || cookieObject['state'] === '') {
				console.log('true2');
				document.cookie = 'state=0';
			}
			else {
				document.cookie = 'state = ' + parseFloat(cookieObject.state) + 1;
			}

			//first remove any that could of been set before
			Object.keys(cookieObject).map((key) => {
				if(key.search(/.*gspBase64.*/gi) !== -1) {
					//i.e. its in the namespace of the base64 img src
					//remove it
					console.log('removing: ', key);
					document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				}
			})


			//finish building the cookie parameters
			for(var i = 0; i < imgSrc.length; i++) {
				//since some of these base64 strings are so long, I have to limit my url size to 2000 characters...for that reason I will store the base64 string in the cookies in 2,000 character chunks and send it iteratively between reloads
				if(i % 1000 === 0 && i !== 0) {
					//i.e. a multiple of 1000 - for each 1000, add the next 1000 as a chunk to use on the next request
					var today = new Date();
					var expire = new Date();
					expire.setTime(today.getTime() + 3600000*24*14);
					document.cookie = 'gspBase64_' + i + '=' + imgSrc.slice((i - 1000), i) + ';expires=' + expire.toGMTString();	//this expires the cooked 14 days from now if my code fails to do so otherwise
					console.log('setting: ', imgSrc.slice((i - 1000), i));
				}

			}



		})(scriptUrl, this, this.props.imgSrc);

		var cookieObject = this.cookieObject();
		

		console.log(cookieObject, stringBlobLength)

		var sliceLength = 500;


		//this works
		// gForm.setAttribute('action', scriptUrl + '?' + 'test=7&imgBlob=' + base64ToBlob(this.props.imgSrc.slice(22, stringBlobLength), 'image/png'))
		gForm.setAttribute('action', scriptUrl + '?' + 'imgSrc=' + base64url.escape(this.props.imgSrc.slice(22, stringBlobLength)));
		

		// $(gForm).submit();  //do a POST submission using the <form> element that is being rendered in the hidden <iframe></iframe> on the page
		

		this.googleRunScript();




		// console.log(base64url.escape(this.props.imgSrc.slice(22, stringBlobLength)).slice(0, sliceLength))

		// alert('here we go');
		// // Create an empty Headers instance
		// fetch(scriptUrl, {
		// 	method: 'post',
		// 	headers: new Headers(
		// 		{
		// 			'Content-Type': 'application/json',
		// 			'mode': 'no-cors',
		// 			'Access-Control-Allow-Origin':'*'
		// 		}
		// 	),
		// 	body: JSON.stringify({'payload': 'base64str'})
		// })

		// var data = new FormData();
		

		// var blob = base64ToBlob(this.props.imgSrc.slice(22, stringBlobLength), 'image/png');

		// console.log('blob = ', blob, 'base64 = ', this.props.imgSrc.slice(22, stringBlobLength));

		// data.append('file', blob);
		
		//console.log(blob)
		// var url = (window.URL || window.webkitURL).createObjectURL(blob);
		// console.log(url);

		// var data = new FormData();
		// data.append('file', url); 

		// $.ajax({
		//   url :  scriptUrl,
		//   // type: 'POST',
		//   json: {
		//   	data: base64url.escape(this.props.imgSrc.slice(22, stringBlobLength)),
		//   },
		//   contentType: false,
		//   processData: false,
		//   success: function(data) {
		//     alert("boa!");
		//   },    
		//   error: function() {
		//     alert("not so boa!");
		//   }
		// });














		// alert('here?' + this.props.imgSrc);

		// $.get(
		//   'https://script.google.com/macros/s/AKfycbzITk9OTp4yOL3-TzRUnCEvXFccKreakinuR7LiVXArT4NE7IU/exec',
		//   {
		//     test: 7,
		//     // base64: this.props.imgSrc
		//     dataType: 'jsonp'
		//   }
		// )
		// .done(function( data ) {
		//   alert( 'Data Loaded: ' + data );
		// })




		// location.reload();  //I do this because after having submitted the form once, chrome gives me an error saying something about a cross origin issue (but it works on the first submit...)


		// $('#emailiFrameContainer')[0].contentWindow.document.location.reload();//just reload the iframe container

		// this.setState({
		// 	renderiFrame: false
		// })

	}
	_setStateHelper(stateToSet) {	//this is exposed in the render function to other components to allow the children to set their state
		this.setState(stateToSet);
	}
	render() {
		if(this.state.renderiFrame === false) {
			console.log('about to not render CIFrame');
		}
		return (
			<div id="divFormId">
				<label id="inputContainer" style={styles.labelStyle}>

					<div>
						Subject:
					</div>
					<div>
						<input style={styles.subject} type="text" value={this.state.subject} onChange={this.handleSubjectChange} />
					</div>

					<br />

					<div>
						Message Body:
					</div>
					<div>
						<textarea style={styles.messageBody} id="messageBody"></textarea>
					</div>
					
				</label>
				
				<br />

				<button id="submitButton" style={styles.submit} onClick={this.handleSubmit.bind(this)}>Send</button>

				<br />

				{/* coty added 05-25-2017 - this helps me send the email from the client side */}
				{/*this.state.renderiFrame === true &&
					<CIFrame setStateHelper={this._setStateHelper.bind(this)}/>
				*/}
				<CIFrame />
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

// This is the CIFrame before I started implementing the google run script iframe logic
//
// export class CIFrame extends React.Component {
// 	componentWillMount() {
// 		this.refs = [];
// 	}
// 	componentDidMount() {
// 		console.log('in componentDidMount for CIFrame')
// 		//
// 		//once this iframe mounts (even though its hidden to the user) this method is invoked
// 		//I use the reference to the root div DOM element walk the DOM down to find the child
// 		//iframe - I had to do it this way because refs weren't working on the iframe element
// 		//once I get the iframe I get a reerence to the document element to then append the
// 		//this div#formContainer element to the body element within the iframe (it looks so
// 		//different because jquery can take in a string and it will create those elements on
// 		//the fly for you)
// 		$(this.refs['iframeParent'].querySelectorAll('iframe')[0].contentWindow.document.body).append(`
// 			<div id="formContainer" style="display: none;"><!-- coty 05-25-2017 - since React Components are so weird when it comes to forms, I like using standard html for these types of elements...anyways, App.jsx uses this form to do a POST to my google script by creating an event and sending it to the below <button id="sendEmail">Send</button> element -->
// 				<form id="gform" method="POST"
// 				action="https://script.google.com/macros/s/AKfycbzITk9OTp4yOL3-TzRUnCEvXFccKreakinuR7LiVXArT4NE7IU/exec">
// 					<fieldset>
// 						<textarea id="message" name="message" placeholder="Message Body"></textarea>
// 					</fieldset>
// 					<button id="sendEmail">Send</button>
// 				</form>
// 			</div>
// 		`)
// 	}
// 	componentWillUnmount() {
// 		console.log('in componentWillUnmount');
// 		this.props.setStateHelper({
// 			renderiFrame: true
// 		})
// 	}
// 	render() {
// 		return (
// 			<div ref={(elementRef) => { this.refs['iframeParent'] = findDOMNode(elementRef) }} id='divId'><iframe id='emailiFrameContainer' onLoad={this.props.onload} style={{display: 'none'}}></iframe></div>
// 		)
// 	}
// }
