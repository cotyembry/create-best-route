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
    constructor(props) {
        super(props);
        this.state = {
            mousePosition: {
                x: '',
                y: ''
            },
            mousePositionArray: [],
            showOutlinedAddressBox: typeof this.props.showOutlinedAddressBox !== 'undefined' ? this.props.showOutlinedAddressBox : false,
            leftMost: '',
            rightMost: '',
            bottomMost: '',
            topMost: ''
        };
        this.mousePositionArray = [];
        this.mouseIsUp = true;
        this.mouseIsDown = false;
    }
    componentDidMount() {
        // $(this.refs['FoggyOverlay']).on('mouseup', this.onMouseUp.bind(this));
        // $(this.refs['FoggyOverlay']).on('mousedown', this.onMouseDown.bind(this));
        // $(this.refs['FoggyOverlay']).mousemove(this.onMouseMove.bind(this));
        this.refs['FoggyOverlay'].onmouseup = this.onMouseUp.bind(this);
        this.refs['FoggyOverlay'].onmousedown = this.onMouseDown.bind(this);
        this.refs['FoggyOverlay'].onmousemove = this.onMouseMove.bind(this);
    }
    componentWillUnmount() {
        
    }
    componentWillMount() {
        this.refs = [];
    }
    componentWillReceiveProps(newProps) {
        if(typeof newProps.showOutlinedAddressBox !== 'undefined') {
            this.setState({
                showOutlinedAddressBox: newProps.showOutlinedAddressBox
            })
        }
        else if(typeof newProps.topMost !== 'undefined') {
            this.setState({
                topMost: newProps.topMost
            })
        }
        else if(typeof newProps.bottomMost !== 'undefined') {
            this.setState({
                bottomMost: newProps.bottomMost
            })
        }
        else if(typeof newProps.leftMost !== 'undefined') {
            this.setState({
                leftMost: newProps.leftMost
            })
        }
        else if(typeof newProps.rightMost !== 'undefined') {
            this.setState({
                rightMost: newProps.rightMost
            })
        }
    }
    onMouseUp(e) {
        this.mouseIsUp = true;
        this.mouseIsDown = false;
        

        //now based on the top left most, top right most, bottom left most, and bottom right most elements, I will make a rectangle for that area and take away the circles
        let rightMost = '',
            topMost = '',
            leftMost = '',
            bottomMost = '';
        this.mousePositionArray.map((mousePosition, i) => {
            let x = mousePosition.x,
                y = mousePosition.y;
            if(leftMost === '' || leftMost > x) {
                leftMost = x;
            }
            if(rightMost === '' || rightMost < x) {
                rightMost = x;
            }
            if(bottomMost === '' || bottomMost < y) {
                bottomMost = y;
            }
            if(topMost === '' || topMost > y) {
                topMost = y;
            }
        })

        cotysEventHelper.setState({
            showOutlinedAddressBox: true,
            leftMost: leftMost,
            rightMost: rightMost,
            bottomMost: bottomMost,
            topMost: topMost
        })

    }
    onMouseDown(e) {
        console.log('in onMouseDown');
        this.mouseIsUp = false;
        this.mouseIsDown = true;
    }
    onMouseMove(e) {
        if(this.mouseIsDown === true) {
            let newMousePosition = {
                    x: e.clientX - 5,
                    y: e.clientY - 10
                },
                _mousePositionArray = this.mousePositionArray.map(e => e);
            _mousePositionArray.push(newMousePosition);
            this.mousePositionArray = _mousePositionArray;
            this.setState({
                mousePositionArray: _mousePositionArray.map(e => e)
            });
        }
    }
    render() {
        return (
            <View className='SmartTouchyImage' _ref={eref => {this.refs['FoggyOverlay'] = findDOMNode(eref)}} style={styles.FoggyOverlay}>
                    {(() => {
                        
                        if(this.state.showOutlinedAddressBox === false)
                            return (
                                <svg style={styles.svg}>
                                    {this.state.mousePositionArray.map((mP, i) =>
                                        <circle r={4} key={i + 'c'} cx={mP.x} cy={mP.y} />
                                    )}
                                </svg>
                            )
                        else if(this.state.showOutlinedAddressBox === true) {
                            //TODO: get this working
                            console.log('TODO: get this working')
                            return (
                                <svg style={styles.svg}>
                                    <rect x={this.state.leftMost} y={this.state.topMost} width={(this.state.rightMost - this.state.leftMost) + 'px'} height={(this.state.bottomMost - this.state.topMost) + 'px'} />
                                </svg>
                            )
                        }
                    })()}
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
        height: '100%',
        backgroundColor: 'gray',
        opacity: 0.8
    },
    svg: {
        width: '100%',
        height: '100%'
    }
}
