import React from 'react';


import parser from 'parse-address';


import AddressSection from './AddressSection.jsx';


export default class RawAddress extends React.Component {
	constructor(props) {
		super(props);
		
		this.Children = [];

		//this is where probably a lot of work needs to be done to get this location information parsed in a desirable, user friendly, simple, quick way
		var parsed = parser.parseLocation('its somewhere at 1005 N Gravenstein Highway Sebastopol CA 95472');


		//once I have the information parsed, I pass in the keys and they values to <AddressSection />
		Object.keys(parsed).map((key, index) => {
			this.Children.push( <AddressSection key={key} keyValue={key} value={parsed[key]} /> )
		})
	}


	render() {
		return (
			<div>
				{ this.Children.map((AddressElement) => AddressElement) }
			</div>
		)
	}

}
