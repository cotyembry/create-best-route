import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

window.$ = $;

/*global blobUtil*/	//included in the .html file as a script tag

import '../css/index.css';

// for hot reloading
// if (module.hot) {
//     module.hot.accept();
// }

import SmartTouchyImage from './SmartTouchyImage.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);

		// blobUtil.imgSrcToBlob(this.props.src).then(blob => {
		// 	this.setState({
		// 		blob: blob
		// 	})
		// });

		this.appRef = '';
		this.canvasWidth = '';
		this.canvasHeight = '';

		this.state = {
			blob: '',
			testWidth: 20,
			testHeight: 69.52,
			top: 93
		}
	}
	componentDidMount() {
		$(this.appRef).on('setState', (e, newState) => {
			this.setState(newState);
		})
	}
	convertAsRatio(deviceDimension, imageDimension, value) {
		/**
		 *	usage:
		 		let convertedValue = this.convertAsRatio(window.innerWidth, img.naturalWidth, pointToConvert)
		 * 
		 * @param deviceDimension - pass the device width in pixels if `imageDimension` is passed in as the `img.naturalWidth` to use as the scale - if `imageDimension` is passed in as `img.naturalHeight` pass the device height in pixels 
		 * @param imageDimension - `img.naturalWidth` or `img.naturalHeight` - depending on the value passed in for `deviceDimension`
		 * @returns {number} result 
		 */
		let result = 0;
		if (deviceDimension !== 0 && value && value !== '') {
			result = value * imageDimension / deviceDimension;
		}
		return result;
	}
	onMouseUpTest(dataObject) {
		let img = dataObject.props.imageReference;


		let leftMostConverted = this.convertAsRatio(document.body.clientWidth, dataObject.props.imageReference.naturalWidth, dataObject.leftMost),
			rightMostConverted = this.convertAsRatio(document.body.clientWidth, dataObject.props.imageReference.naturalWidth, dataObject.rightMost),
			topMostConverted = this.convertAsRatio(document.body.clientHeight, dataObject.props.imageReference.naturalHeight, dataObject.topMost),
			bottomMostConverted = this.convertAsRatio(document.body.clientHeight, dataObject.props.imageReference.naturalHeight, dataObject.bottomMost),
			width = dataObject.rightMost - dataObject.leftMost,
			height = dataObject.bottomMost - dataObject.topMost,
			widthConverted = rightMostConverted - leftMostConverted,
			heightConverted = bottomMostConverted - topMostConverted;

		this.canvasWidth = dataObject.props.canvasRef.width;
		this.canvasHeight = dataObject.props.canvasRef.height;
		
		// console.log({
		// 	leftMostConverted: leftMostConverted,
		// 	rightMostConverted: rightMostConverted,
		// 	topMostConverted: topMostConverted,
		// 	bottomMostConverted: bottomMostConverted,
		// 	widthConverted: widthConverted,
		// 	heightConverted: heightConverted,
		// 	width: width,
		// 	height: height
		// });

		// dataObject.props.canvasRef.getContext('2d').drawImage(dataObject.props.imageReference, 0, 0, widthConverted, heightConverted);    // works the closest on desktop
		
		dataObject.props.canvasRef.getContext('2d').clearRect(0, 0, dataObject.props.canvasRef.width, dataObject.props.canvasRef.height)
		//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		//void ctx.drawImage(dataObject.props.imageReference, dataObject.leftMost, dataObject.topMost, widthConverted, heightConverted, 0, 0, width, height);
		// let naturalWidth = 607 / 2;
		// let testWidth = 20;

		// dataObject.props.canvasRef.getContext('2d').drawImage(dataObject.props.imageReference, 0, 0, testWidth, 93);    // works the closest on desktop
		// dataObject.props.canvasRef.getContext('2d').drawImage(dataObject.props.imageReference, leftMostConverted, topMostConverted, widthConverted, heightConverted, 0, 0, width, height);    // works the closest on desktop
		// dataObject.props.canvasRef.getContext('2d').drawImage(img, leftMostConverted, topMostConverted, widthConverted, heightConverted, 0, 0, width, height);    // works the closest on desktop
		// dataObject.props.canvasRef.getContext('2d').drawImage(img, 0, 0, this.state.testWidth, dataObject.props.canvasRef.height)
		dataObject.props.canvasRef.getContext('2d').drawImage(img, 0, 0, this.state.testWidth, this.state.testHeight)

		let png = dataObject.props.canvasRef.toDataURL('image/png');

		// console.log(png);
		window.png = png;
		console.log(this.state.testWidth);

		document.getElementById('testImage').src = png;

		this.setState({
			top: dataObject.props.imageReference.clientHeight
		})
	}
		render() {			
			return (
				<div
					ref={eref => this.appRef = eref}
					id='appRoot'
				>

				{/* <img style={styles.mainImage} src={this.props.src}/> */}

				<SmartTouchyImage
					{...this.props}
					{...this.state}
					getCurrentImage={this.state.activeImage}
					key={1}
					src={this.props.src}
					askedUserForNumber={true}
					displayFoggyOverlay={true}
					onMouseUp={this.onMouseUpTest.bind(this)}
					top={this.state.top}
				/>
			</div>
		)
	}
}

const styles = {
	mainImage: {
		width: '100%'
	}
}





// let imageSrc = './1.png';
let imageSrc = './2.png';



$(document).ready(function() {
	ReactDOM.render(<App src={imageSrc} />, document.getElementById('App'))
})





	/*
		File.prototype.convertToBase64 = function (callback) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                callback(e.target.result, e.target.error);
            };
            reader.readAsDataURL(this);
        };
        $(this.refs['cameraInput']).on('change', (e) => {
            var selectedFile = e.target.files[0];
            // this.checkImageSize(selectedFile, (a,b) => {
            //     console.log(a,b);
            // })
            selectedFile.convertToBase64((base64) => {
                let bAClone = self.state.imagesTakenBase64.map(e => e);
                bAClone.push(base64);
                cotysEventHelper.setState({
                    imagesTakenBase64: bAClone
                });
                this.props.setState({
                    imagesTakenBase64: bAClone
                });
            })
        });
		*/



