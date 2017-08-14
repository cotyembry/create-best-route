import React from 'react';

export default class CropOverlay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			addressWords: []	//this will eventually hold the words returned from the OCR logic if all goes well with the image chosen by the client
		}
	}
	componentDidMount() {
		//attempt to get text with OCR as soon as mounted; if mounted, this means that the crop button was selected - it has an onClick handler that will set a flag to render <CropOverlay />
		this.sendWithGoogle();
	}
	googleScriptRunSuccess(data) {
		// alert('in success handler:' + data);
		let tmpWords = data.split('\n').map((word) => word);
		this.setState({
			addressWords: tmpWords
		})
	}
	sendWithGoogle() {
		let base64String = this.props.croppedBase64.split('base64,')[1];	//clean the string up first before sending it to the cloud
		alert(base64String);
		google.script.run.withSuccessHandler(this.googleScriptRunSuccess.bind(this)).doSomething(base64String);
	}
	render() {
		return (
			<div style={styles.root}>
				{/*this.props.img*/}
				{/*<EmailForm imgSrc={this.props.croppedBase64} />*/}

				{this.props.croppedImg}

				{this.state.addressWords.map((word) => <div>{word}</div>)}
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
