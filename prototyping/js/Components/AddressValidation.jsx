import React from 'react';
import ReactDOM from 'react-dom';

import parser from 'parse-address';

import $ from 'jquery';

import AddressSection from './AddressSection.jsx';
import Tutorial from './Tutorial.jsx';


/*
	1. get street address

	2. get state

	3. get zip

	4. extra data (do something special with this to help the user easily get the text out of it they actually want)

*/






export default class AddressValidation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			//the two below properties are used for the AddressSection to get its position to a desirable place on the screen
			shiftUpHelper: '',
			shiftLeftHelper: '',

			//I will use tutorialTopOffset in Tutorial.jsx
			tutorialTopOffset: ''
		}

		this.refs = [];
		this.Children = [];






		//this is where probably a lot of work needs to be done to get this location information parsed in a desirable, user friendly, simple, quick way
		var parsed = parser.parseLocation('its somewhere at 1005 N Gravenstein Highway Sebastopol CA 95472');


		//once I have the information parsed, I pass in the keys and they values to <AddressSection />
		Object.keys(parsed).map((key, index) => {
			this.Children.push( <AddressSection key={key} keyValue={key} value={parsed[key]} /> )
		})
	}
	componentDidMount() {
		var shiftUpHelper = $(this.AddressSectionContainer).outerHeight(true) / 2;
		var shiftLeftHelper = $(this.AddressSectionContainer).outerWidth(true) / 2;
		

		// tutorialTopOffset

		// var tutorialTopOffset = $(this.TutorialElement).offset().top;


		// var _tutorialTopOffset = 

		// console.log(_tutorialTopOffset)




		this.setState({
			shiftUpHelper: 'calc(37.5% - ' + shiftUpHelper + 'px)',
			shiftLeftHelper: 'calc(50% - ' + shiftLeftHelper + 'px)',
		})
	}
	render() {
		//I will use _styles to help me override any styles on the elements as I go through the use of the this.state object
		var _styles = {}

		_styles = this.setStyleOverrides(_styles);


		// _styles.AddressSectionContainer = this.state.shiftLeftHelper !== '' ? { ...styles.AddressSectionContainer, left: this.state.shiftLeftHelper } : { ...styles.AddressSectionContainer }


		return (
			<div style={styles.root}>

				<span style={styles.spanHeader}>
					AddressValidation.jsx
				</span>
			

				{/* this.Children is an array of components that are the actual raw address data */}
				<div id='AddressSectionContainer' ref={(element) => {this.AddressSectionContainer = element} } style={_styles.AddressSectionContainer}>
					{ this.Children.map((AddressElement) => AddressElement) }
				</div>


				{typeof this.state.displayTutorial &&	//I pass in the updateZIndexAddressSection prop to expose this style being changed

					<Tutorial updateZIndexAddressSection={this.updateZIndex.bind(this)} ref={(element) => { this.TutorialElement = element} } />

				}





			</div>
		)
	}

	//setStyleOverrides will take in a style object and add style overrides to it based on the state that is present
	setStyleOverrides(_styles) {
		/* start 1 - here until the end of this code is where I will delcare a block with logic sort of relient on eachother */
		if(this.state.shiftUpHelper !== '') {
			//if I have set a style to override in the state, use it
			_styles.AddressSectionContainer = { ...styles.AddressSectionContainer, top: this.state.shiftUpHelper }
		}
		else {
			//otherwise use the default style
			_styles.AddressSectionContainer = { ...styles.AddressSectionContainer }
		}
		if(this.state.shiftLeftHelper !== '') {
			if(this.state.shiftUpHelper !== '') {
				//this whole if else above and this if else here need to be merged, but for now
				//I add this mini if else to make sure that the top property doesnt get overwritten
				_styles.AddressSectionContainer = { ...styles.AddressSectionContainer, left: this.state.shiftLeftHelper, top: this.state.shiftUpHelper }
			}
			else {
				_styles.AddressSectionContainer = { ...styles.AddressSectionContainer, left: this.state.shiftLeftHelper }
			}
		}
		else {
			_styles.AddressSectionContainer = { ...styles.AddressSectionContainer }
		}
		/* end 1 */



		return { ..._styles }
	}

	//updateZIndex will be passed in as a prop to expose the styles.AddressSectionContainer to be overridden for the zIndex attribute
	updateZIndex(newZIndexValue) {
		this.setState({
			zIndex: newZIndexValue
		})
	}
}

var styles = {
	AddressSectionContainer: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		padding: 21,
		borderRadius: 0,
	    backgroundColor: '#FFF',
	    boxShadow: '0 2px 2px 0 rgba(0,0,0,.16),0 0 2px 0 rgba(0,0,0,.12)'
	},
	root: {
		width: '100%',
		height: '100%',
		textAlign: 'center'
	},
	spanHeader: {
		width: '100%',
		height: 25
	}
}
