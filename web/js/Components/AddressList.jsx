import React from 'react';
import {findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Button, Image, Text, ScrollView, View} from './Defaults.jsx';

import $ from 'jquery';

export default class ProcessPictures extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            previousCoppedRects: typeof this.props.previousCoppedRects !== 'undefined' ? this.props.previousCoppedRects.map(e => e) : []
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(newProps) {
        console.log('newProps = ', newProps);
    }
    render() { 
        let _href = 'https://maps.google.com/?q=1200%20Pennsylvania%20Ave%20SE,%20Washington,%20District%20of%20Columbia,%2020003
        return (
            <View style={styles.ProcessPictures}>
                <ScrollView style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
                    {this.state.previousCoppedRects.map((addressText, i) =>
                        <View key={i}>
                            <a href={_href}><Text>map link</Text></a>
                            <Text>{addressText[0].textFromCrop}</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        )
    }
}

const styles = {

}
