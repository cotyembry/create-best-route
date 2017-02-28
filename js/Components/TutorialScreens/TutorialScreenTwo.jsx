import React from 'react';

import Button from 'simple-react-button';

import 'jquery';
import $ from 'jquery.animate';


import PictureSection from '../PictureSection.jsx';


export default class TutorialScreenTwo extends React.Component {
	constructor(props) {
		super(props);

		this.PictureSectionThisValue = '';		//<PictureSection /> will, once mounted, pass its DOM element up and set this variable


		
		this.state = {
			showPictureSection: true, 			//showPictureSection is a flag to display the raw picture image
			marginTopOfPictureSection: '',
			PictureSection: {
				left: 0							//I use this left property in the state to keep the internal state (of the <PictureSection /> child component to be exact) consistent with the DOM's css
			}
		}
	}
	render() {
		return (
			<div>
				<p style={styles.TutorialScreenOne}>
					2. Here is the picture I'm going off of
				</p>

				{this.state.showPictureSection === true &&
					<PictureSection left={this.state.PictureSection.left} setRef={this.setChildRef.bind(this)} />
				}

				<Button value={'Next'} clickHandler={() => { this.props.setStateHelper({ page: 'three', marginTopOfPictureSection: this.state.marginTopOfPictureSection }) } } />
			</div>	
		)
	}
	setChildRef(domElement, _marginTopOfPictureSection) {
		//setChildRef is called by the <PictureSection /> child component to give this TutorialSectionTwo class a reference to is DOM element to do a jquery.animate on it
		this.PictureSectionThisValue = domElement;
		this.setState({
			marginTopOfPictureSection: _marginTopOfPictureSection
		})

		this.translateLeft();
	}
	//translateLeft will probably not be used on a device that doesnt have very much screen space
	translateLeft(domElement) {
		//add the animation to the <PictureSection /> component
		//at the end of this the css will be at left: -100% so I will set the state after this animation simply to keep the state consistent with the ui
		//define the callback to use after calling the setTimeout function
		var callback = function() {
			$(this.PictureSectionThisValue).animate({
				left: '-100%'
			}, {
			    duration: 2000,
			    easing: 'linear'
			})


			//and also change the screen to the next component
			this.setState({		//I the left property set here, redundently (..to the DOM anyways), to keep the state and the DOM consistent
				left: '-100%'
			})
		}

		callback = callback.bind(this);	//to make sure I can still access this TutorialScreenTwo's this value

		setTimeout(callback, 2000)	
	}	
}

var styles = {
	TutorialScreenOne: {
		fontSize: 20
	}
}
