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
        return (
            <View style={styles.SmartTouchyImage}>
                <Image onLoad={e => { this.onImageLoadEventCallback(e) }} style={{ width: '100%' }} _ref={eref => { this.refs['image'] = findDOMNode(eref); this.childRefsArray['currentImageRef'] = findDOMNode(eref);}} src={this.props.src} />
                <canvas width='100%' height='100%' style={styles.JcropCanvas} className='JcropCanvas' ref={(eref) => { this.refs['JcropCanvas'] = findDOMNode(eref); this.childRefsArray['JcropCanvas'] = this.refs['JcropCanvas']; }}></canvas>{/* TODO: add min and max heights based on users screen size; this will be used to help the user preview what they are cropping */}
                {this.state.displayFoggyOverlay === true &&
                    <FoggyOverlay imageReference={this.refs['image']} imageLoadEvent={this.state.onLoadImageEvent} setCurrentImageRef={(childRefsArray) => {this.childRefsArray = childRefsArray}} FoggyOverlayCallback={this.FoggyOverlayCallback} base64={this.props.src} numberOfAddresses={this.state.numberOfAddresses} showOutlinedAddressBox={this.state.showOutlinedAddressBox} />
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
            JcropEvent: '',
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


        if(typeof newProps.imageLoadEvent !== 'undefined' && newProps.imageLoadEvent !== null) {
            // console.log('result = ', newProps.imageLoadEvent === null, typeof newProps.imageLoadEvent, typeof newProps.imageLoadEvent === 'undefined')
        
            // console.log('-->', newProps.imageLoadEvent.target, 'test>' + newProps.imageLoadEvent + '<done');
            // console.log('final: ', Object.keys(newProps.imageLoadEvent))
            // this
            this.addJcrop();
            // this.setState({
            //     imageLoadEvent: {...newProps.imageLoadEvent}
            // })
        }        
    }
    canvas(coords) {
        //this.canvas gets called every time the user changes the cropping area
        var imageObj = this.refs['userThumbnail'];
        var canvas = this.refs['JcropCanvas'];
        if (typeof imageObj !== 'undefined') {
            canvas.width = coords.w;
            canvas.height = coords.h;
            var context = canvas.getContext('2d');
            context.drawImage(imageObj, coords.x, coords.y, coords.w, coords.h, 0, 0, canvas.width, canvas.height);

                //place the base64 string in the state for later if needed
                var png = this.refs['JcropCanvas'].toDataURL('image/png');
                // $(this.refs['pngInput']).val(png);
                this.setState({
                    croppedBase64String: png
                })
        }

    }
    addJcrop() {
        //if here then the image has loaded and the event is in `this.props.imageLoadEvent` - also the image reference currently being worked on is `this.refs['currentImage']`
        // $(this.refs['currentImage']).Jcrop({
        //     onSelect: (e) => { this.canvas(e); this.setState({ JcropEvent: e, croppedBase64String: png }) },
        //     //TODO: get mouse position and show a component overlay that's a checkbox to accept the current cropped portion
        //     onChange: (e) => { this.canvas(e); this.setState({ JcropEvent: e, croppedBase64String: png }) },
        //     onRelease: (e) => { this.canvas(e); this.setState({ JcropEvent: e, croppedBase64String: png }) }
        // })
    }
    onMouseUp(e) {
        // this.log(JSON.stringify(e) + ' ' + 'onMouseUp')
        // alert('onMouseUp');
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


        //now to send event to Jcrop to give me the cropped base64 representation to the cropped image
        this.sendToJcropAndProcessImage(e);



        this.setState(this.state);
    }
    // log(e) {

    //     let textNode = document.createTextNode(e);
    //     $('#test').empty().append(textNode);
    // }
    onMouseDown(e) {
        // alert('onMouseDown');
        // alert(JSON.stringify(e));
        // this.log(JSON.stringify(e) + ' ' + 'onMouseDown')


        this.mouseIsUp = false;
        this.mouseIsDown = true;
    }
    onMouseMove(e) {
        // console.log(e.changedTouches.length, e, ' ' + 'onMouseMove')
        // alert('onMouseMove');
        // alert(JSON.stringify(e));
        let normalizedX = '',                                   //so I can reuse these methods between touch devices and mouse events
            normalizedY = '';
        if(typeof e.changedTouches !== 'undefined') {
            //if here then this is on a touch device
            normalizedX = e.changedTouches[0].clientX;
            normalizedY = e.changedTouches[0].clientY;
        }
        else {
            normalizedX = e.clientX;
            normalizedY = e.clientY;
        }
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
        // if(typeof this.refs['reactCropped'] !== 'undefined') {
        //     this.refs['reactCroppie'].result(options).then(res => {
        //         console.log('result = ', res);
        //     });
        // }
        // else {
        //     console.warn('do not have crop reference');
        // }
    }
    onImageLoadCallback(e) {
        if (typeof this.refs['currentImageRef'] !== 'undefined') {
            $(this.refs['currentImageRef']).Jcrop({
                onSelect: (e) => { this.canvas(e); this.setState({ showAcceptCheckbox: true, JcropEvent: e }) },
                //TODO: get mouse position and show a component overlay that's a checkbox to accept the current cropped portion
                onChange: (e) => { this.canvas(e); this.setState({ showAcceptCheckbox: true, JcropEvent: e }) },
                onRelease: (e) => { this.canvas(e); this.setState({ showAcceptCheckbox: true, JcropEvent: e }) }
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
    sendToJcropAndProcessImage(e) {
        // this.canvas(e);
        // canvas(coords) {
        if (typeof this.props.imageReference !== 'undefined' && this.props.imageReference !== null) {            
            console.log('sending now')
            // cotysEventHelper.forWeb(document.body, 'CreateBestRouteProcessCrop', e);
            window.CreateBestRouteProcessCrop(e, this.props.imageReference, this.state.onLoadImageEvent, parseFloat(window.innerWidth) + 'px', parseFloat(window.innerHeight) + 'px');
            // window.CreateBestRoute
        }

        // }
        
        
        
        
        
        
        this.setState({ JcropEvent: e })
    }
    _setState(newState) {
        this.setState(newState);
    }
    render() {
        /*
        <img ref={(eref) => {this.refs['userThumbnail'] = findDOMNode(eref)}}
            className='dynamicThumbnail'
            id='userThumbnail'
            src={this.state.thumbnailSrc}
            title={this.state.thumbnailTitle}
            
            onLoad={() => { $('#userThumbnail').Jcrop({
                onSelect: (e) => {this.canvas(e); this.setState({showAcceptCheckbox: true, JcropEvent: e})},
                //TODO: get mouse position and show a component overlay that's a checkbox to accept the current cropped portion
                onChange: (e) => {this.canvas(e); this.setState({showAcceptCheckbox: true, JcropEvent: e})},
                onRelease: (e) => {this.canvas(e); this.setState({showAcceptCheckbox: true, JcropEvent: e})}
            });}}
        />
        */
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
            displayOverride: 'none',                    //jquery will animate this to fade in then immediately after I set the state to match the display mutation
            numberOfAddresses: '',
            numberOfAddressesValue: ''
        }
    }
    componentWillMount() {
        this.refs = [];
    }
    componentDidMount() {
        $(this.refs['fadeIn']).fadeIn();                //added fade in animation and logic around it to compliment the fade in


        this.props.setState({
            opacityOverride: 1
        });
        this.setState({
            displayOverride: ''                         //to match the mutation that jquery just did on the DOM element
        });
    }
    componentWillUnmount() {
        this.props.setState({
            opacityOverride: styles.FoggyOverlay.opacity
        });
    }
    onNumberOfAddressesChange(newNumber) {
        this.setState({
            numberOfAddresses: newNumber
        });
    }
    nextButtonClicked() {
        if(this.validateAddressInputValue() === true) {
            this.props.setState({
                askedUserForNumber: true,
                numberOfAddresses: this.state.numberOfAddresses
            });
        }
    }
    textNumberClicked(e) {
        this.setState({
            numberOfAddresses: e
        });
    }
    validateAddressInputValue() {
        //TODO: implement logic
        return true;
    }
    render() {
        //TODO: add option to 'sneak peek' the image being asked about

        return (
            <View style={{...styles.QuestionNumberOverlay, display: this.state.displayOverride}} _ref={eref => {this.refs['fadeIn'] = findDOMNode(eref)}}>
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
    JcropCanvas: {
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
