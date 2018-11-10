import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

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

		this.state = {
			blob: '',
			top: 93
		}
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
		let leftMostConverted = this.convertAsRatio(document.body.clientWidth, dataObject.props.imageReference.naturalWidth, dataObject.leftMost),
			rightMostConverted = this.convertAsRatio(document.body.clientWidth, dataObject.props.imageReference.naturalWidth, dataObject.rightMost),
			topMostConverted = this.convertAsRatio(document.body.clientHeight, dataObject.props.imageReference.naturalHeight, dataObject.topMost),
			bottomMostConverted = this.convertAsRatio(document.body.clientHeight, dataObject.props.imageReference.naturalHeight, dataObject.bottomMost),
			widthConverted = rightMostConverted - leftMostConverted,
			heightConverted = bottomMostConverted - topMostConverted;
		
		// console.log(dataObject.leftMost, dataObject.rightMost, dataObject.topMost, dataObject.bottomMost);
		console.log({
			leftMostConverted: leftMostConverted,
			rightMostConverted: rightMostConverted,
			topMostConverted: topMostConverted,
			bottomMostConverted: bottomMostConverted,
			widthConverted: widthConverted,
			heightConverted: heightConverted
		});

		// dataObject.props.canvasRef.getContext('2d').drawImage(dataObject.props.imageReference, 0, 0, widthConverted, heightConverted);    // works the closest on desktop
		
		let naturalWidth = 607 / 2;

		dataObject.props.canvasRef.getContext('2d').drawImage(dataObject.props.imageReference, 0, 0, naturalWidth, 93);    // works the closest on desktop


		let png = dataObject.props.canvasRef.toDataURL('image/png');

		// console.log(png);
		window.png = png;

		document.getElementById('testImage').src = png;

		this.setState({
			top: dataObject.props.imageReference.clientHeight
		})

		// this.setState({
		// 	croppedBase64String: png
		// })
	}
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
		render() {			
			return (
				<div
				
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




