import React from 'react';
import {render, findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Button, Image, Input, Text, View} from './Defaults.jsx';

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
            askedUserForNumber: false,
            base64: typeof this.props.src !== 'undefined' ? this.props.src : '',
            displayFoggyOverlay: typeof this.props.displayFoggyOverlay !== 'undefined' ? this.props.displayFoggyOverlay : false,
            showOutlinedAddressBox: typeof this.props.showOutlinedAddressBox !== 'undefined' ? this.props.showOutlinedAddressBox : false,
            numberOfAddresses: ''
        }
    }
    componentDidMount() {
        this.setOverlayWithAbsolutePositioning(this.refs['image']);

        $('html, body').css({
            width: parseFloat(window.innerWidth) + 'px',
            height: parseFloat(window.innerHeight) + 'px'
        });

        
        $(window).resize(() => {
            $('html, body').css({
                width: parseFloat(window.innerWidth) + 'px',
                height: parseFloat(window.innerHeight) + 'px'
            });
        });

        /*
        document.addEventListener('touchmove', function (event) {
            if (event.scale !== 1) { event.preventDefault(); }
            console.log('event.scale = ', event.scale);
        }, false);

        document.documentElement.addEventListener('touchmove', function (event) {
            event.preventDefault();
        }, false);
        */
    }
    componentWillMount() {
        this.refs = [];
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            displayFoggyOverlay: typeof newProps.displayFoggyOverlay !== 'undefined' ? newProps.displayFoggyOverlay : false,
            showOutlinedAddressBox: typeof newProps.showOutlinedAddressBox !== 'undefined' ? newProps.showOutlinedAddressBox : false
        })
    }
    setOverlayWithAbsolutePositioning(imageRef) {
        cotysEventHelper.setState({
            displayFoggyOverlay: true
        })
    }
    render() {
        return (
            <View style={styles.SmartTouchyImage}>
                <Image style={{width: '100%'}} _ref={eref => {this.refs['image'] = findDOMNode(eref)}} src={this.props.src} />

                {this.state.displayFoggyOverlay === true &&
                    <FoggyOverlay numberOfAddresses={this.state.numberOfAddresses} showOutlinedAddressBox={this.state.showOutlinedAddressBox} />
                }
            </View>
        )
    }
}


class FoggyOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            askedUserForNumber: false,
            mousePosition: {
                x: '',
                y: ''
            },
            mousePositionArray: [],
            showOutlinedAddressBox: typeof this.props.showOutlinedAddressBox !== 'undefined' ? this.props.showOutlinedAddressBox : false,
            opacityOverride: styles.FoggyOverlay.opacity,
            // leftMost: typeof this.props.leftMost !== 'undefined' ? this.props.leftMost : '',
            // rightMost: typeof this.props.rightMost !== 'undefined' ? this.props.rightMost : '',
            // bottomMost: typeof this.props.bottomMost !== 'undefined' ? this.props.bottomMost : '',
            // topMost: typeof this.props.topMost !== 'undefined' ? this.props.topMost : ''
        };
        this.mousePositionArray = [];
        this.mouseIsUp = true;
        this.mouseIsDown = false;

        this.leftMost = '';
        this.rightMost = '';
        this.topMost = '';
        this.bottomMost = '';
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
        // else if(typeof newProps.topMost !== 'undefined') {
        //     this.setState({
        //         topMost: newProps.topMost
        //     })
        // }
        // else if(typeof newProps.bottomMost !== 'undefined') {
        //     this.setState({
        //         bottomMost: newProps.bottomMost
        //     })
        // }
        // else if(typeof newProps.leftMost !== 'undefined') {
        //     this.setState({
        //         leftMost: newProps.leftMost
        //     })
        // }
        // else if(typeof newProps.rightMost !== 'undefined') {
        //     this.setState({
        //         rightMost: newProps.rightMost
        //     })
        // }
        
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
        });

        let _showOutlinedAddressBox = false;
        if (this.state.askedUserForNumber === true) {
            _showOutlinedAddressBox = true;
        }


        cotysEventHelper.setState({         //get this working maybe to use leftMost in the state rather than breaking out and using this.leftMost (I couldnt get the leftMost state to set when using `cotysEventHelper` and spent too much time trying to get it to work so for now this is how it will be)
            showOutlinedAddressBox: _showOutlinedAddressBox,

            leftMost: leftMost,
            rightMost: rightMost,
            bottomMost: bottomMost,
            topMost: topMost
        });


        this.leftMost = leftMost;
        this.rightMost = rightMost;
        this.topMost = topMost;
        this.bottomMost = bottomMost;

        this.setState(this.state);
    }
    onMouseDown(e) {
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
    redoButtonClicked() {
        //reset the state in this.state.mousePositionArray and this.leftMost, this.rightMost, this.topMost, this.bottomMost
        cotysEventHelper.setState({
            leftMost: '',
            rightMost: '',
            topMost: '',
            bottomMost: ''
        });

        this.leftMost = '';
        this.rightMost = '';
        this.topMost = '';
        this.bottomMost = '';


        this.mousePositionArray = [];
        cotysEventHelper.setState({
            showOutlinedAddressBox: false
        })
        this.setState({
            mousePositionArray: []
        });
        
    }
    _setState(newState) {
        this.setState(newState);
    }
    render() {
        return (
            <View className='SmartTouchyImage' _ref={eref => {this.refs['FoggyOverlay'] = findDOMNode(eref)}} style={{...styles.FoggyOverlay, opacity: this.state.opacityOverride}}>
                    {(() => {
                        if(this.state.askedUserForNumber === false) {
                            return (
                                <QuestionNumberOverlay setState={this._setState.bind(this)} />
                            )
                        }
                        else if(this.state.showOutlinedAddressBox === false && this.state.askedUserForNumber === true) {
                            return (
                                <svg style={styles.svg}>
                                    {this.state.mousePositionArray.map((mP, i) =>
                                        <circle r={4} key={i + 'c'} cx={mP.x} cy={mP.y} />
                                    )}
                                </svg>
                            )
                        }
                        else if(this.state.showOutlinedAddressBox === true && this.state.askedUserForNumber === true) {
                            if(this.leftMost === '') return null;
                            return (
                                <View className='svgOuterContainer'z style={{width: '100%', height: '100%', display: ''}}>
                                    {this.mouseIsDown === true &&
                                        <svg style={{...styles.svg, position: 'absolute', top: '0px', left: '0px'}}>
                                            {this.state.mousePositionArray.map((mP, i) =>
                                                <circle r={4} key={i + 'c'} cx={mP.x} cy={mP.y} />
                                            )}
                                        </svg>
                                    }
                                    
                                    
                                    <svg style={styles.svg}>
                                        <rect x={this.leftMost} y={this.topMost} width={(this.rightMost - this.leftMost) + 'px'} height={(this.bottomMost - this.topMost) + 'px'} />
                                    
                                    </svg>

                                    <View style={{width: '100%', height: '100%', top: '0px', left: '0px', position: 'absolute'}}>
                                        <View style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center'}}>
                                            <Button onClick={this.redoButtonClicked.bind(this)} styleRoot={{...styles.noSelectStyle, height: ''}} value='Redo?' />
                                            <Button styleRoot={{...styles.noSelectStyle, height: ''}} value='Next' />
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                    })()}
            </View>
        )
    }
}

class QuestionNumberOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfAddresses: ''
        }
    }
    componentDidMount() {
        this.props.setState({
            opacityOverride: 1
        })
    }
    componentWillUnmount() {
        this.props.setState({
            opacityOverride: styles.FoggyOverlay.opacity
        })
    }
    onNumberOfAddressesChange(newNumber) {
        this.setState({
            numberOfAddresses: newNumber
        })
    }
    nextButtonClicked() {
        if(this.validateAddressInputValue() === true) {
            this.props.setState({
                askedUserForNumber: true,
                numberOfAddresses: this.state.numberOfAddresses
            })
        }
    }
    validateAddressInputValue() {
        //TODO: implement logic
        return true;
    }
    render() {
        return (
            <View style={styles.QuestionNumberOverlay}>
                <Text>How many addresses are on this image?</Text>
                <Input onChange={this.onNumberOfAddressesChange.bind(this)} />
                <Button value='Next' onClick={this.nextButtonClicked.bind(this)} />
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
    QuestionNumberOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        color: 'white',
        fontSize: '21px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: '',
        justifyContent: 'center',
        textAlign: 'center'

    },
    svg: {
        width: '100%',
        height: '100%'
    },
    noSelectStyle: {
        WebkitTouchCallout: 'none', // iOS Safari
        WebkitUserSelect: 'none',  // Safari
        KhtmlUserSelect: 'none',  // Konqueror HTML
        MozUserSelect: 'none',   // Firefox
        MsUserSelect: 'none',   // Internet Explorer/Edge
        userSelect: 'none'     // Non-prefixed version, currently supported by Chrome and Opera	  
    }
}
