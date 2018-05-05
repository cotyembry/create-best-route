import React from 'react';
import {findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Button, Image, Input, Text, ScrollView, View} from './Defaults.jsx';

import $ from 'jquery';

import store from '../store.js';

var test;

export default class ProcessPictures extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            previousCroppedRects: typeof this.props.previousCroppedRects !== 'undefined' ? this.props.previousCroppedRects.map(e => e) : [],
            showMapPreviewOverlay: false
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(newProps) {
        console.log('newProps = ', newProps);
    }
    sendButtonClicked() {
        //TODO: make call to google apps script and send data to be send in the message
        let messageBody = '';

        this.state.previousCroppedRects.map((addressText, i) => {
            messageBody += addressText + '\n';
            messsageBody += 'https://maps.google.com/?q=' + addressText + '\n\n';
        });

        
        
        
        
        
        
        console.log('TODO: send the following to a google apps script to be sent as a message', messageBody);
    }
    _setState(newState) {
        this.setState(newState);
    }
    render() { 
        // let _hrefTest = 'https://maps.google.com/?q=1200%20Pennsylvania%20Ave%20SE,%20Washington,%20District%20of%20Columbia,%2020003';
        let _href = 'https://maps.google.com/?q=';

        return (
            <View style={styles.AddressList}>
                <ScrollView style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
                    {this.state.previousCroppedRects.map((addressText, i) =>
                        <EditableMapLink previousCroppedRects={this.state.previousCroppedRects} setState={this._setState.bind(this)} key={i} textFromCrop={addressText[i].textFromCrop} _href={_href} i={i} />
                    )}
                </ScrollView>

                <Button value='Send as message' onClick={this.sendButtonClicked.bind(this)} />
                
                {store.platform === 'iOS' &&
                    <Button value='Save to Notes' onClick={this.sendButtonClicked.bind(this)} />
                }

                {this.state.showMapPreviewOverlay === true &&
                    <MapPreviewOverlay setState={this._setState.bind(this)} />
                }
            </View>
        )
    }
}

class MapPreviewOverlay extends React.Component {
    render() {
        return (
            <View style={styles.MapPreviewOverlay}>
                Map Preview Overlay Component
            </View>
        )
    }
}

class EditableMapLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            previousCroppedRects: typeof this.props.previousCroppedRects !== 'undefined' ? this.props.previousCroppedRects : '',
            textFromCrop: typeof this.props.textFromCrop !== 'undefined' ? this.props.textFromCrop : ''
        }
    }
    onPreviewButtonClicked() {
        //if here then the preview button was clicked
        this.props.setState({
            showMapPreviewOverlay: true
        })
    }
    onChange(e) {

        console.log('in onchange: this.props.i = ', this.props.i);

        let _previousCroppedRects = this.state.previousCroppedRects.map((text, i) => {
            console.log('in .map i = ', i);
            
            if(i === this.props.i) {
                return e
            }
            else {
                return text;
            }
        })

        this.setState({
            textFromCrop: e
        });

        let overrideObject = {...this.state.previousCroppedRects, textFromCrop: _previousCroppedRects[0]};
        
        console.log([overrideObject], this.state.previousCroppedRects);



        this.props.setState({
            previousCroppedRects: [[overrideObject]]        //I have to format this varable like this because its the format it is expecting...at least for 1 text cropping instance
        })
    }
    render() {
        return (
            <View key={this.props.i} style={styles.previousCroppedRects}>
                <Button value='Preview' onClick={this.onPreviewButtonClicked.bind(this)} />

                <div>
                    <a target='_blank' href={this.props._href + this.props.textFromCrop}><Text>Map Link (new tab){' '}</Text></a>
                </div>
                
                <Input value={this.state.textFromCrop} onChange={this.onChange.bind(this)} />



            </View>
        )
    }
}

const styles = {
    AddressList: {
        width: '100%',
        height: '100%'
    },
    MapPreviewOverlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'fixed',
        top: '0px',
        left: '0px',
        backgroundColor: 'black',
        boxSizing: 'border-box',
        margin: '2.5px 2.5px 2.5px 2.5px',
        borderRadius: '4px'
    },
    previousCroppedRects: { 
        width: '100%', 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
}
