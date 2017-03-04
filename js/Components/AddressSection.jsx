import React from 'react';


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
	render() {
		return (
			<div style={styles.root}>
				{ this.props.value }
				<input style={styles.inputCheckbox} type='checkbox' checked={this.state.value} onChange={this._onChange.bind(this)} />
			</div>
		)
	}
}

var styles = {
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
	}
}
