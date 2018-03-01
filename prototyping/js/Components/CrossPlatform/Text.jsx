import React from 'react';

export default class Text extends React.Component {
	render() {
		let _styles = {display: 'inline-block', textAlign: 'center'};
		if(this.props.display === 'block') {
			_styles = {..._styles, display: 'block'}
		}
		return (
			<div style={{..._styles, fontSize: this.props.fontSize === 'undefined' ? '14px' : this.props.fontSize}}>
				{this.props.value || this.props.text}
			</div>
		)
	}
}
