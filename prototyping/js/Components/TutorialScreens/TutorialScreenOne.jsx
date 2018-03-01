import React from 'react';
import Button from 'simple-react-button';

var TutorialScreenOne = (props) =>
	<div>
		<p style={styles.TutorialScreenOne}>
			1. Lets try to figure out the correct address from this picture (be patient, this is hard to do!)
		</p>
		{/*<Button value={'Next'} clickHandler={() => { this.props.setStateHelper({ page: 'two' }) } } />*/}
		<Button value={'Next'} clickHandler={() => { props.setStateHelper({ page: 'two' }) } } />
	</div>

var styles = {
	TutorialScreenOne: {
		fontSize: 20
	}
}

export default TutorialScreenOne
