import React from 'react';
import {render, findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Button, Image, Text, ScrollView, View} from './Defaults.jsx';

import $ from 'jquery';

import cotysEventHelper from '../cotysEventHelper.js';

import SmartTouchyImage from './SmartTouchyImage.jsx';

export default class ProcessPictures extends React.Component {
    constructor(props) {
        super(props);

        console.log('in ProcessPictures constructor this.props.leftMost =', this.props.leftMost);

        this.state = {
            activeImage: 1,
            imagesTakenBase64: typeof this.props.imagesTakenBase64 !== 'undefined' ? this.props.imagesTakenBase64.map(e => e) : [],
            leftMost: typeof this.props.leftMost !== 'undefined' ? this.props.leftMost : '',
            rightMost: typeof this.props.rightMost !== 'undefined' ? this.props.rightMost : '',
            bottomMost: typeof this.props.bottomMost !== 'undefined' ? this.props.bottomMost : '',
            topMost: typeof this.props.topMost !== 'undefined' ? this.props.topMost : ''
        }
    }
    componentDidMount() {
        let self = this;

    }
    componentWillMount() {
        this.refs = [];
    }
    componentWillReceiveProps(newProps) {
        console.log('in componentWillRecieveProps with: ', newProps, '<- ProcessPictures');
        if (typeof newProps.topMost !== 'undefined') {
            this.setState({
                topMost: newProps.topMost
            })
        }
        else if (typeof newProps.bottomMost !== 'undefined') {
            this.setState({
                bottomMost: newProps.bottomMost
            })
        }
        else if (typeof newProps.leftMost !== 'undefined') {
            this.setState({
                leftMost: newProps.leftMost
            })
        }
        else if (typeof newProps.rightMost !== 'undefined') {
            this.setState({
                rightMost: newProps.rightMost
            })
        }

    }
    render() {
        console.log(this.state.leftMost, '<- ProcessPictures.jsx render');

        return (
            <View style={styles.ProcessPictures}>
                <ScrollView style={{width: '100%', height: '100%'}}>
                    {this.state.imagesTakenBase64.map((base64, i) => {
                        if(i === this.state.activeImage - 1) {              //-1 to normalize the number from human readable to an array index
                            return (
                                <SmartTouchyImage {...this.state} {...this.props} key={i} src={base64} />
                            )
                        }
                    })}
                </ScrollView>
            </View>
        )
    }
}

const styles = {
    ProcessPictures: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        margin: '0px',
        padding: '0px',
    },
    capturedImages: {
        // width: '100%'

    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%'
    },
    flexFill: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        boxSizing: 'border-box',
        border: '1px solid',
        borderRadius: '4px'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    }
}
