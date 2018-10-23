import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';


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









class App extends React.Component {
	constructor(props) {
		super(props);
		this.mouseIsDown = false;
		this.leftMost = '';
		this.rightMost = 0;
		this.bottomMost = 0;
		this.topMost = 0;
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
	render() {
		return (
			<div
				onMouseMove={this.onMouseMove}
				onMouseDown={this.onMouseDown}
				onMouseUp={this.onMouseUp}
			>

				<img style={styles.mainImage} src={this.props.src}/>

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




