import React from 'react';
import ReactDOM from 'react-dom';

import Button from 'simple-react-button';


/**
 *	PropTypes:
 *		positionFromTop:	string, number
 *
 *
 *	Component Comment: 	<TutorialScreen /> will be responsible for displaying the different screens depending on the active screen that is set
 */

export default class TutorialScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 'one'
		}
	}
	componentDidMount() {

		this.setState({

		})
	}
	render() {
		if(this.state.page === 'two') {
			
		}

		return (
			<div style={styles.root}>
				{this.state.page === 'one' &&
					<TutorialScreenOne setStateHelper={this.setStateHelper.bind(this)} />
				}
				{this.state.page === 'two' &&
					<TutorialScreenTwo setStateHelper={this.setStateHelper.bind(this)} />
				}
				{/*this.state.page === 'three' &&
					<TutorialScreenThree />
				}
				{this.state.page === 'four' &&
					<TutorialScreenFour />
				}
				{this.state.page === 'five' &&
					<TutorialScreenFive />
				*/}
			</div>
		)
	}
	setStateHelper(newState) {
		this.setState(newState)
	}
}

const TutorialScreenOne = (props) =>
	<div>
		<p style={styles.TutorialScreenOne}>
			1. Lets try to figure out the correct address from this picture (be patient, this is hard to do!)
		</p>
		{/*<Button value={'Next'} clickHandler={() => { this.props.setStateHelper({ page: 'two' }) } } />*/}
		<Button value={'Next'} clickHandler={() => { props.setStateHelper({ page: 'two' }) } } />
	</div>

const TutorialScreenTwo = (props) => {
	return (
		<div>
			<p style={styles.TutorialScreenOne}>
				2. Lets try to figure out the correct address from this picture (be patient, this is hard to do!)
			</p>
			<Button value={'Next'} clickHandler={() => { props.setStateHelper({ page: 'three' }) } } />
		</div>	
	)
}

var styles = {
	root: {
		width: '33%',
		height: '100%',
		backgroundColor: '#cccccc',
		float: 'right',
		position: 'relative',
		zIndex: 2
	},
	TutorialScreenOne: {
		fontSize: 20
	}
}
