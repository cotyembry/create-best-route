import React from 'react';
import ReactDOM from 'react-dom';


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
		return (
			<div style={styles.root}>
				{this.state.page === 'one' &&
					<TutorialScreenOne />
				}
				{/*this.state.page === 'two' &&
					<TutorialScreenTwo />
				}
				{this.state.page === 'three' &&
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
}

const TutorialScreenOne = () =>
	<h1>Test!</h1>


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
