import React from 'react';
import ReactDOM from 'react-dom';

import Button from 'simple-react-button';

import PictureSection from './PictureSection.jsx';

import TutorialScreenOne from './TutorialScreens/TutorialScreenOne.jsx';
import TutorialScreenTwo from './TutorialScreens/TutorialScreenTwo.jsx';
import TutorialScreenThree from './TutorialScreens/TutorialScreenThree.jsx';

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
			page: 'three',				//page will be used to display the different components
			marginTopOfPictureSection: ''
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
				{this.state.page === 'three' &&
					<TutorialScreenThree marginTopOfPictureSection={this.state.marginTopOfPictureSection} setStateHelper={this.setStateHelper.bind(this)} />
				}
				{/*this.state.page === 'four' &&
					<TutorialScreenFour />
				}
				{this.state.page === 'five' &&
					<TutorialScreenFive />
				*/}
			</div>
		)
	}
	setStateHelper(newState) {
		//setStateHelper is called by the child components to allow them a handle in updating their parent containers state
		this.setState(newState)
	}
}



var styles = {
	root: {
		width: '33%',
		height: '100%',
		backgroundColor: '#cccccc',
		float: 'right',
		position: 'relative',
		zIndex: 2
	}
}
