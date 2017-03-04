import React from 'react';
import {findDOMNode} from 'react-dom';

/**
 *	PropTypes:
 *		value: 	string, number
 *
 *
 *
 */

export default class AddressSection extends React.Component {
	constructor(props) {
		super(props);



		this.setParentState = this.props.setParentState;	//this gets passed in to expose the setState method in the parent component

		this.state = {
			value: false				//start the checkbox out to not be checked
		}
	}
	_onChange() {
		this.setState({
			value: !this.state.value	//toggle the checkbox
		})

		// this.setParentState({ type: 'inputChecked' }, { this.props.keyValue: 'someValue' })
	}
	componentWillMount() {
		this.refs = {}
	}
	componentDidMount() {
		Object.keys(this.refs).map((key, i) => {
			// console.log(findDOMNode(this.refs))
			console.log(this.refs[key])
		})
	}
	render() {

		return (
			<div style={styles.root}>
				{/*
					For the <Edit /> component, start the user off with the text selected for easily deleting the text
				*/}

				{ this.state.value === true &&

					<AcceptEdit setStateHelper={this._setStateHelper.bind(this)} i={this.props.i} />
				}

				
				<div style={{ display: 'inline-block' }} ref={(ref) => this.refs.valueElement = ref }>
					{ this.props.value }
				</div>


				<input style={styles.inputCheckbox} type='checkbox' checked={this.state.value} onChange={this._onChange.bind(this)} />
			</div>
		)
	}
	_setStateHelper(action) {
		//no state is being passed currently, It just needs to know the button was pressed
		if(action.type === 'acceptButton1Pressed') {
			// this.setState()
			this.setParentState({ type: action.type })
		}
	}
}

const acceptOnClick = (props) => {
	//this should transition to the next screen
	console.log(props.setStateHelper)
	console.log('here', props.i)
	props.setStateHelper({ type: 'acceptButton' + (props.i + 1) + 'Pressed' })
}

const AcceptEdit = (props) => {
	//I need to set the position of the manually

	return (
		<div style={{ background: 'yellow', width: '100%', height: 33, position: 'absolute', top: -50 }}>
			<div className='test' style={styles.styleDiv}></div>



			<div style={styles.accept} onClick={acceptOnClick.call(this, props)}>Accept</div>
			

			{/* 

				TODO maybe: first piece would start to create an input box above that would start the address for the user, which they will be able to edit later 
				
				<div style={styles.accept}>1st piece</div>
			*/}



			<div style={styles.edit}>Edit</div>

		</div>
	)
}

var styles = {
	accept: {
		display: 'inline-block',
		float: 'left',
		marginLeft: 21,
		cursor: 'pointer'
	},
	edit: {
		display: 'inline-block',
		float: 'left',
		marginLeft: 21,
		cursor: 'pointer'

	},
	inputCheckbox: {
		float: 'right',
		marginRight: 49
	},
	root: {
		paddingTop: 5,
		paddingBottom: 5
		// width: '80%',
		// position: 'fixed',
		// top: '50%',
		// left: '50%'
	},
	styleDiv: {
		background: 'yellow',
		position: 'absolute',
		left: '50%',
		top: 7,
		width: 33,
		height: 33,
		boxSizing: 'border-box',
		transform: 'rotate(45deg)',
		zIndex: -1
	}
}
