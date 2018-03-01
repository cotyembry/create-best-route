import React from 'react';

// import { Router, Route, hashHistory } from 'react-router';

// import store from './store.js'


export default class Text extends React.Component {
	render() {
		return (
			<div style={styles.root}>
				<label>{this.props.value}</label>
			</div>
		)
	}
}

var styles = {
	root: {
		display: 'inline-block'
		// width: '100%',
		// height: '100%'
	}
}
