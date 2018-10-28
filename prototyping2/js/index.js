import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

/*global blobUtil*/	//included in the .html file as a script tag

// import App from './Components/App.jsx';


import '../css/index.css';

// its not working perfectly right now, I will have to work on this later
//
// for hot reloading
// if (module.hot) {
//     module.hot.accept();
// }


// import store from './Components/store.js';

// console.log(store);



import SmartTouchyImage from '../../web/js/Components/SmartTouchyImage.jsx';



class App extends React.Component {
	constructor(props) {
		super(props);
		this.mouseIsDown = false;
		this.leftMost = '';
		this.rightMost = 0;
		this.bottomMost = 0;
		this.topMost = 0;

		blobUtil.imgSrcToBlob(this.props.src).then(blob => {
			this.setState({
				blob: blob
			})
		});

		this.state = {
			blob: ''
		}
	}
	onMouseDown(e) {
		this.mouseIsDown = true;
	}
	onMouseUp(e) {
		this.mouseIsDown = false;
	}
	onMouseMove(e) {
		console.log(e.nativeEvent);
		if (this.mouseIsDown) {
			if (this.leftMost === '' || e.target.clientX < this.leftMost) {
				this.leftMost = e.target.clientX;
			}
			if (this.rightMost === '' || e.target.clientX > this.rightMost) {
				this.rightMost = e.target.clientX;
			}
		
		}
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
			
			// console.log(this.props.src);
			// this.fr.
			// console.log(this.fr.readAsDataURL(this.props.src))
			
			return (
				<div
				onMouseMove={this.onMouseMove.bind(this)}
				onMouseDown={this.onMouseDown.bind(this)}
				onMouseUp={this.onMouseUp.bind(this)}
				>

				{/* <img style={styles.mainImage} src={this.props.src}/> */}

				<SmartTouchyImage
					getCurrentImage={this.state.activeImage}
					// goToNextImage={this._goToNextImage.bind(this)}
					{...this.state}
					{...this.props}
					key={1}
					src={this.props.src}
					askedUserForNumber={true}
					// src={this.state.blob}
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
























let imageSrc = '../015.png';



$(document).ready(function() {
	ReactDOM.render(<App src={imageSrc} />, document.getElementById('App'))
})




