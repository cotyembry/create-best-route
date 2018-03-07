import React from 'react';
import {render, findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Button, Image, View} from './Defaults.jsx';

import $ from 'jquery';

import cotysEventHelper from '../cotysEventHelper.js';

/**
 * 
 * TODO: add an overlay of foggyish see through layer that will wipe away when the user drags over the area
 */

export default class SmartTouchyImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           base64: typeof this.props.src !== 'undefined' ? this.props.src : '',
           displayFoggyOverlay: typeof this.props.displayFoggyOverlay !== 'undefined' ? this.props.displayFoggyOverlay : false
        }
    }
    componentDidMount() {
        this.setOverlayWithAbsolutePositioning(this.refs['image']);

        $('html, body').css({
            width: parseFloat(window.innerWidth) + 'px',
            height: parseFloat(window.innerHeight) + 'px'
        })
    }
    componentWillMount() {
        this.refs = [];
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            displayFoggyOverlay: typeof newProps.displayFoggyOverlay !== 'undefined' ? newProps.displayFoggyOverlay : false
        })
    }
    setOverlayWithAbsolutePositioning(imageRef) {
        cotysEventHelper.setState({
            displayFoggyOverlay: true
        })
    }
    render() {
        return (
            <View className="test" style={styles.SmartTouchyImage}>
                <Image _ref={eref => {this.refs['image'] = findDOMNode(eref)}} src={this.props.src} />

                {this.state.displayFoggyOverlay === true &&
                    <FoggyOverlay />
                
                
                }
            </View>
        )
    }
}

class FoggyOverlay extends React.Component {
    render() {
        return (
            <View style={styles.FoggyOverlay}>

            </View>
        )
    }
}

const styles = {
    SmartTouchyImage: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    FoggyOverlay: {
        position: 'fixed',
        width: '100%',
        height: '100%'
    }
}
