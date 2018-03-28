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
        // let _hrefTest = 'https://maps.google.com/?q=1200%20Pennsylvania%20Ave%20SE,%20Washington,%20District%20of%20Columbia,%2020003';
        let _href = 'https://maps.google.com/?q=';

        return (
            <View style={styles.AddressList}>
                <ScrollView style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
                    {this.state.previousCoppedRects.map((addressText, i) =>
                        <View key={i} style={styles.previousCoppedRects}>
                            <a target='_blank' href={_href + addressText[0].textFromCrop}><Text>map link</Text></a>
                            <Text>{addressText[0].textFromCrop}</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        )
    }
}

const styles = {
    AddressList: {
        width: '100%',
        height: '100%'
    },
    previousCoppedRects: { 
        width: '100%', 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
}
