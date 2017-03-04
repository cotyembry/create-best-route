import React from 'react';

import Button from 'simple-react-button';

import 'jquery';
import $ from 'jquery.animate';


import PictureSection from '../PictureSection.jsx';
import RawAddress from '../RawAddress.jsx';


//TODO: add color outlines or underlines or some sort of color queues to the users about which field they are suppose to be focusing on for editing and fixing the typoes from the picture conversion process

export default class TutorialScreenThree extends React.Component {
	constructor(props) {
		super(props);

		this.PictureSectionThisValue = '';		//<PictureSection /> will, once mounted, pass its DOM element up and set this variable


		
		this.state = {
			showPictureSection: true, 			//showPictureSection is a flag to display the raw picture image
			PictureSection: {
				left: '-100%'					//I use this left property in the state to keep the internal state (of the <PictureSection /> child component to be exact) consistent with the DOM's css
			},

			fieldFocus: 1						//fieldFocus will help me keep track of which field the user is interacting with and trying to figure out/correct with typoes
		}
	}
	render() {
		return (
			<div>

				<span style={styles.correctionHeader}>Which line is the street address?</span> <br />

				{this.state.showPictureSection === true &&
					<PictureSection focus={this.state.fieldFocus} top={this.props.marginTopOfPictureSection} left={this.state.PictureSection.left} setRef={this.setChildRef.bind(this)} />
				}


				<br />

				<div style={styles.RawAddressContainer}>
					<RawAddress setParentState={this._setStateHelper} />
				</div>

				<p style={styles.TutorialScreenThree}>
					
					<span style={styles.continue}>Its Perfect! Tap continue</span> <br />
					<span>Are there typoes? Tap Typoes -- TODO: add this button and the correction UI interaction for it as well</span>
					Tap the street address (or if it looks perfect, tap continue)
				</p>

				<br />

				<Button value={'Continue'} clickHandler={() => { this.props.setStateHelper({ page: 'five' }) } } />
				<Button value={'Typoes'} clickHandler={() => { this.props.setStateHelper({ page: 'typoes' }) } } />
			</div>	
		)
	}
	setChildRef(domElement) {
		//setChildRef is called by the <PictureSection /> child component to give this TutorialSectionTwo class a reference to is DOM element to do a jquery.animate on it
		this.PictureSectionThisValue = domElement;

		// this.translateLeft();
	}

	_setStateHelper(action, stateFromChild) {
		if(action.type === 'acceptButton1Pressed') {
			this.setState({

			})
		}
	}
	// //translateLeft will probably not be used on a device that doesnt have very much screen space
	// translateLeft(domElement) {
	// 	//add the animation to the <PictureSection /> component
	// 	//at the end of this the css will be at left: -100% so I will set the state after this animation simply to keep the state consistent with the ui
	// 	//define the callback to use after calling the setTimeout function
	// 	var callback = function() {
	// 		$(this.PictureSectionThisValue).animate({
	// 			left: '-100%'
	// 		}, {
	// 		    duration: 2000,
	// 		    easing: 'linear'
	// 		})


	// 		//and also change the screen to the next component
	// 		this.setState({		//I the left property set here, redundently (..to the DOM anyways), to keep the state and the DOM consistent
	// 			left: '-100%'
	// 		})
	// 	}

	// 	callback = callback.bind(this);	//to make sure I can still access this TutorialScreenTwo's this value

	// 	setTimeout(callback, 2000)	
	// }	
}

var styles = {
	continue: {
		backgroundColor: 'green'
	},
	correctionHeader: {
		fontSize: 28
	},
	RawAddressContainer: {
		width: '100%',
		position: 'relative',
		// left: '25%',
		// top: 40
	},
	TutorialScreenThree: {
		fontSize: 20
	}
}
