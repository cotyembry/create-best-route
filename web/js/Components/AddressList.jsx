import React from 'react';
import {findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Button, Image, Input, Text, ScrollView, View} from './Defaults.jsx';

import $ from 'jquery';

export default class ProcessPictures extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            previousCoppedRects: typeof this.props.previousCoppedRects !== 'undefined' ? this.props.previousCoppedRects.map(e => e) : [],
            showMapPreviewOverlay: false
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
                        <EditableMapLink key={i} textFromCrop={addressText[i].textFromCrop} _href={_href} i={i} />
                    )}
                </ScrollView>

                {this.state.showMapPreviewOverlay === true &&
                    <MapPreviewOverlay />
                }
            </View>
        )
    }
}

class MapPreviewOverlay extends React.Component {
    render() {
        return (
            <View>
                Map Preview Overlay Component
            </View>
        )
    }
}

class EditableMapLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textFromCrop: typeof this.props.textFromCrop !== 'undefined' ? this.props.textFromCrop : ''
        }
    }
    onButtonClick() {
        //if here then the preview button was clicked

    }
    onChange(e) {
        this.setState({
            textFromCrop: e
        })
    }
    render() {
        return (
            <View key={this.props.i} style={styles.previousCoppedRects}>
                <Button value='Preview' onClick={this.onButtonClick.bind(this)} />

                <div>
                    <a target='_blank' href={this.props._href + this.props.textFromCrop}><Text>Map Link (new tab){' '}</Text></a>
                </div>
                
                <Input value={this.state.textFromCrop} onChange={this.onChange.bind(this)} />


                {/* TODO:   
                            -add edit button here to correct the address
                            -maybe make this section its own component since it will most likely have a good amount of logic tied to it
                */}


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
