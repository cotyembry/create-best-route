import React from 'react';
import {render, findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
// import Croppie from 'react-croppie';
import {Button, Image, Input, Text, View} from './Defaults.jsx';


// import $ from 'jquery';
import $ from '../jquery.Jcrop.js';									//because in this file I import jquery and extend it then re-export jquery


import cotysEventHelper from '../cotysEventHelper.js';

/**
 * 
 * TODO: add an overlay of foggyish see through layer that will wipe away when the user drags over the area
 */

export default class SmartTouchyImage extends React.Component {
    constructor(props) {
        super(props);
        this.childRefsArray = [];
        this.FoggyOverlayCallback = '';
        this.state = {
            askedUserForNumber: false,
            base64: typeof this.props.src !== 'undefined' ? this.props.src : '',
            displayFoggyOverlay: typeof this.props.displayFoggyOverlay !== 'undefined' ? this.props.displayFoggyOverlay : false,
            onImageLoadEvent: '',
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
    onImageLoadEventCallback(e) {
        // console.log('here: onImageLoadEventCallback', e);
        // console.log(e.nativeEvent, e.nativeEvent.target);


        this.setState({
            onLoadImageEvent: e.nativeEvent
        })
        // if (this.FoggyOverlayCallback !== '') {
        //     console.log(this.FoggyOverlayCallback)
        //     this.FoggyOverlayCallback(e);               //if it has been set in the <FoggyOverlay's `componentDidMount` method send the event on over to it so it will know as well
        // }
    }
    setOverlayWithAbsolutePositioning(imageRef) {
        cotysEventHelper.setState({
            displayFoggyOverlay: true
        })
    }

    
    render() {
        let _canvasRef = typeof this.refs['customCanvas'] !== 'undefined' ? this.refs['customCanvas'] : '';
        return (
            <View style={styles.SmartTouchyImage}>
                <Image onLoad={e => { this.onImageLoadEventCallback(e) }} style={{  position: 'absolute', top: '0px', left: '0px' }} _ref={eref => { this.refs['image'] = findDOMNode(eref); this.childRefsArray['currentImageRef'] = findDOMNode(eref);}} src={this.props.src} />
                <canvas style={styles.customCanvas} className='customCanvas' ref={(eref) => { this.refs['customCanvas'] = findDOMNode(eref); this.childRefsArray['customCanvas'] = this.refs['customCanvas']; }}></canvas>{/* TODO: add min and max heights based on users screen size; this will be used to help the user preview what they are cropping */}
                {this.state.displayFoggyOverlay === true &&
                    <FoggyOverlay canvasRef={_canvasRef} imageReference={this.refs['image']} imageLoadEvent={this.state.onLoadImageEvent} setCurrentImageRef={(childRefsArray) => {this.childRefsArray = childRefsArray}} FoggyOverlayCallback={this.FoggyOverlayCallback} base64={this.props.src} numberOfAddresses={this.state.numberOfAddresses} showOutlinedAddressBox={this.state.showOutlinedAddressBox} />
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
            croppiePictureURL: '',
            croppedBase64String: '',
            customCropEvent: '',
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
        this.onImageLoadCallback = this.props.FoggyOverlayCallback;
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
        
        
        
        
        this.refs['FoggyOverlay'].ontouchstart = this.onMouseDown.bind(this);
        this.refs['FoggyOverlay'].ontouchend = this.onMouseUp.bind(this);
        this.refs['FoggyOverlay'].ontouchmove = this.onMouseMove.bind(this);


        this.props.setCurrentImageRef(this.refs);   //pass the local `this.refs` array so it can altered by the parent <SmartTouchyImage /> component


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
    }
    onMouseUp(e) {
        this.mouseIsUp = true;
        this.mouseIsDown = false;

        //now based on the top left most, top right most, bottom left most, and bottom right most elements, I will make a rectangle for that area and take away the circles
        let rightMost = '',
            topMost = '',
            leftMost = '',
            bottomMost = '',
            scrollWidthAdjustment = '',
            scrollTopAdjustment = '';
        this.mousePositionArray.map((mousePosition, i) => {
            let x = mousePosition.x,
                y = mousePosition.y;

            scrollTopAdjustment = window.document.documentElement.scrollTop;            //to deal with if the page is scrolled down or to the left at all
            scrollWidthAdjustment = window.document.documentElement.scrollLeft;
            x += scrollWidthAdjustment;
            y += scrollTopAdjustment;

            
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


        //now to send event to Jcrop to give me the cropped base64 representation to the cropped image
        this.processCropOnImage(e);



        this.setState(this.state);
    }
    onMouseDown(e) {
        this.mouseIsUp = false;
        this.mouseIsDown = true;
    }
    onMouseMove(e) {
        // console.log(e.changedTouches.length, e, ' ' + 'onMouseMove')
        // alert('onMouseMove');
        // alert(JSON.stringify(e));
        let normalizedX = '',                                   //so I can reuse these methods between touch devices and mouse events
            normalizedY = '',
            scrollWidthAdjustment = '',
            scrollTopAdjustment = '';
        if(typeof e.changedTouches !== 'undefined') {
            //if here then this is on a touch device
            normalizedX = e.changedTouches[0].clientX;
            normalizedY = e.changedTouches[0].clientY;
        }
        else {
            normalizedX = e.clientX;
            normalizedY = e.clientY;
        }

        scrollTopAdjustment = window.document.documentElement.scrollTop;            //to deal with if the page is scrolled down or to the left at all
        scrollWidthAdjustment = window.document.documentElement.scrollLeft;
        normalizedX += scrollWidthAdjustment;
        normalizedY += scrollTopAdjustment;

        if(this.mouseIsDown === true) {
            let newMousePosition = {
                    x: normalizedX - 5,
                    y: normalizedY - 10
                },
                _mousePositionArray = this.mousePositionArray.map(e => e);
            _mousePositionArray.push(newMousePosition);
            this.mousePositionArray = _mousePositionArray;
            this.setState({
                mousePositionArray: _mousePositionArray.map(e => e)
            });
        }
    }
    nextButtonClicked() {
      
    }
    onImageLoadCallback(e) {
           
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
    processCropOnImage(e) {
        if (typeof this.props.imageReference !== 'undefined' && this.props.imageReference !== null && this.state.askedUserForNumber === true) {            
            //start crop logic
            let canvas = this.props.canvasRef,
                context = canvas.getContext('2d'),
                png = '',
                w = this.rightMost - this.leftMost,
                h = this.bottomMost - this.topMost;

            if (typeof this.props.imageReference !== 'undefined') {

                context.drawImage(this.props.imageReference, this.leftMost, this.topMost, w, h, 0, 0, w, h);	//subtracting from the width on the sx makes the canvas get filled with a more zoomed out image

                png = canvas.toDataURL('image/png');

                this.setState({
                    croppedSrc: png
                })
                //end crop logic
                
            }

        }

    }
    _setState(newState) {
        this.setState(newState);
    }
    render() {
        // onMouseDown = { this.onMouseDown.bind(this) } onMouseUp = { this.onMouseUp.bind(this) } onMouseMove = { this.onMouseDown.bind(this) }
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
                                        <View style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '7px'}}>
                                            <Button onClick={this.redoButtonClicked.bind(this)} styleRoot={{...styles.noSelectStyle, height: ''}} value='Redo?' />
                                            <Button onClick={this.nextButtonClicked.bind(this)} styleRoot={{...styles.noSelectStyle, height: ''}} value='Next' />
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                    })()}

                    {/* {this.leftMost !== '' &&
                        <View style={{display: 'none'}}>
                            <Croppie bind={{url: this.props.base64, points: [this.leftMost, this.topMost, this.rightMost, this.bottomMost]}} ref={eref => {this.refs['reactCropped'] = findDOMNode(eref)}}  />
                        </View>
                    } */}
            </View>
        )
    }
}

class QuestionNumberOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfAddresses: '',
            numberOfAddressesValue: ''
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
    textNumberClicked(e) {
        this.setState({
            numberOfAddresses: e
        })
    }
    validateAddressInputValue() {
        //TODO: implement logic
        return true;
    }
    render() {
        return (
            <View style={styles.QuestionNumberOverlay}>
                <Text>How many addresses are on this image?</Text>
                    <View style={{flexDirection: 'column'}}>
                        <Input placeholder='enter manually' value={this.state.numberOfAddresses} style={{width: 'calc(100% - 14px)', boxSizing: 'border-box', margin: '0px 7px 0px 7px', textAlign: 'center'}} onChange={this.onNumberOfAddressesChange.bind(this)} />
                        <View style={{justifyContent: 'space-evenly'}}>
                            {[1,2,3,4,5,6,7,8,9,10].map((number, j) =>
                                <Text className='hover' key={j} onClick={this.textNumberClicked.bind(this, number)}>{number}</Text>
                            )}
                        </View>
                    </View>
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
    customCanvas: {
        width: '100%',
        height: '100%'
    },
    QuestionNumberOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        color: 'white',
        fontSize: '21px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
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
