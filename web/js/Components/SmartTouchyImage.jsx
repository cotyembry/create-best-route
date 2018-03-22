import React from 'react';
import {render, findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
// import Croppie from 'react-croppie';
import {Button, Image, Input, Text, View} from './Defaults.jsx';


import $ from 'jquery';
// import $ from '../jquery.Jcrop.js';									//because in this file I import jquery and extend it then re-export jquery


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
            currentImageCrop: 1,                                                                                                                 //TODO: add logic to populate this
            numberOfImages: '',  
            displayFoggyOverlay: typeof this.props.displayFoggyOverlay !== 'undefined' ? this.props.displayFoggyOverlay : false,
            onImageLoadEvent: '',
            showOutlinedAddressBox: typeof this.props.showOutlinedAddressBox !== 'undefined' ? this.props.showOutlinedAddressBox : false,
            numberOfAddresses: '',
            numberOfImagesProcessed: 0
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
    _getCurrentImageNumber() {
        return this.state.currentImage;
    }
    _getCurrentCropNumber() {                   //this will represent the current number for the little cropped rectangle(s) out of the big complete image src
        return this.state.currentImageCrop;
    }
    _setCurrentCropNumber() {                   //this will represent the current number for the little cropped rectangle(s) out of the big complete image src
        this.setState({
            currentImageCrop: this.state.currentImageCrop + 1
        });
    }
    _getNumberOfImagesProcessed() {
        return this.state.numberOfImagesProcessed;
    }
    _setNumberOfImagesProcessed() {
        this.setState({
            numberOfImagesProcessed: this.state.numberOfImagesProcessed + 1
        })
    }
    _nextButtonSelected() {

    }
    render() {
        let _canvasRef = typeof this.refs['customCanvas'] !== 'undefined' ? this.refs['customCanvas'] : '';
        return (
            <View style={styles.SmartTouchyImage}>
                <Image onLoad={e => { this.onImageLoadEventCallback(e) }} style={{  position: 'absolute', top: '0px', left: '0px' }} _ref={eref => { this.refs['image'] = findDOMNode(eref); this.childRefsArray['currentImageRef'] = findDOMNode(eref);}} src={this.props.src} />
                <canvas style={styles.customCanvas} className='customCanvas' ref={(eref) => { this.refs['customCanvas'] = findDOMNode(eref); this.childRefsArray['customCanvas'] = this.refs['customCanvas']; }}></canvas>{/* TODO: add min and max heights based on users screen size; this will be used to help the user preview what they are cropping */}
                {this.state.displayFoggyOverlay === true &&
                    <FoggyOverlay getNumberOfImagesProcessed={this._getNumberOfImagesProcessed.bind(this)} imagesTaken={this.props.imagesTakenBase64} setCurrentCropNumber={this._setCurrentCropNumber.bind(this)} getCurrentCropNumber={this._getCurrentCropNumber.bind(this)} getCurrentImageNumber={this._getCurrentImageNumber.bind(this)} nextButtonClicked={this._nextButtonSelected.bind(this)} canvasRef={_canvasRef} imageReference={this.refs['image']} imageLoadEvent={this.state.onLoadImageEvent} setCurrentImageRef={(childRefsArray) => {this.childRefsArray = childRefsArray}} FoggyOverlayCallback={this.FoggyOverlayCallback} base64={this.props.src} numberOfAddresses={this.state.numberOfAddresses} showOutlinedAddressBox={this.state.showOutlinedAddressBox} />
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
            currentImage: this.props.currentImage,          //the currentImage number that is being processed by the user
            numberOfImages: this.props.numberOfImages,
            editButtonClicked: false,
            mousePosition: {
                x: '',
                y: ''
            },
            mousePositionArray: [],
            previousCroppedRects: [],
            showOutlinedAddressBox: typeof this.props.showOutlinedAddressBox !== 'undefined' ? this.props.showOutlinedAddressBox : false,
            opacityOverride: styles.FoggyOverlay.opacity,
            currentCrop: '',
            numberOfAddresses: ''
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
    checkIfMoreImagesToBeProcessed() {
        let moreAddressesToProcess = false;

        console.log('this.props.getNumberOfImagesProcessed() = ', this.props.getNumberOfImagesProcessed(), 'this.props.imagesTaken = ', this.props.imagesTaken.length);

        //TODO: write logic for the `nextButtonSelected` method
        if (this.props.getNumberOfImagesProcessed() < this.props.imagesTaken.length) {
            console.warn('TODO: test this logic before moving on')
            moreAddressesToProcess = true;
        }
        return moreAddressesToProcess;
    }
    onMouseUp(e) {
        this.mouseIsUp = true;
        this.mouseIsDown = false;
        if (this.state.editButtonClicked === false) {
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
                        leftMost = x - 1;
                    }
                    if(rightMost === '' || rightMost < x) {
                        rightMost = x + 2;
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
            normalizedX = e.clientX + 2;
            normalizedY = e.clientY;
        }

        scrollTopAdjustment = window.document.documentElement.scrollTop;            //to deal with if the page is scrolled down or to the left at all
        scrollWidthAdjustment = window.document.documentElement.scrollLeft;
        normalizedX += scrollWidthAdjustment;
        normalizedY += scrollTopAdjustment;

        if(this.mouseIsDown === true && this.state.editButtonClicked === false) {
            let newMousePosition = {
                    // x: normalizedX - 5,
                    x: normalizedX,
                    // y: normalizedY - 10
                    y: normalizedY
                },
                _mousePositionArray = this.mousePositionArray.map(e => e);
            _mousePositionArray.push(newMousePosition);
            this.mousePositionArray = _mousePositionArray;
            this.setState({
                mousePositionArray: _mousePositionArray.map(e => e)
            });
        }
    }
    editButtonClicked() {
        this.setState({
            editButtonClicked: true
        })
    }
    nextButtonClicked() {
        let previousCoppedRects = this.state.previousCroppedRects.map(e => e);
        previousCoppedRects.push({
            leftMost: this.leftMost,
            topMost: this.topMost,
            rightMost: this.rightMost,
            bottomMost: this.bottomMost,
            base64: this.state.croppedBase64String
        })
        
        this.leftMost = '';
        this.rightMost = '';
        this.topMost = '';
        this.bottomMost = '';
        this.props.canvasRef.getContext('2d').clearRect(0, 0, this.props.canvasRef.width, this.props.canvasRef.height); //clear the canvas for redrawing next time
        
        this.mousePositionArray = [];
        cotysEventHelper.setState({
            showOutlinedAddressBox: false
        });
        this.setState({
            croppedBase64String: '',            //to reset the state to start the next cropped section of the picture
            editButtonClicked: false,
            mousePositionArray: [],
            previousCroppedRects: previousCoppedRects
        });


        //show next address section
        if (this.props.getCurrentCropNumber() >= this.state.numberOfAddresses) {                                                 //this.state.numberOfAddresses is set when the user says how many addresses there are
            //i.e. if they have outlined the same number that they said were on the picture so its time to move on
            


            //TODO: get this particular part working after figuring out the outer if else logic
            //if there are more images to be processed
            if(this.checkIfMoreImagesToBeProcessed() === true) {
                //start next logic to begin 1st crop on the next image
                console.log('take the user to the next image');
            
            }
            else {
                //if here the user is done adding individual addresses
                //go to the next component and render all of the addresses the user entered into a <ScrollView>...</ScrollView>
                console.log('show all addresses edited and accepted now (maybe ask the user first if they want to take another picture or if they want to enter another address manually or if they want to replace an existing address from photo)');
            
            }




        }
        else {
            //the user needs to circle more portions of the current image
            console.log('circle more portions of the current image');

            this.props.setCurrentCropNumber();                                          //this adds 1 to the current crop number in the parent component
        }
    }
    onImageLoadCallback(e) {
           
    }
    resetToStart() {
        //reset the state in this.state.mousePositionArray and this.leftMost, this.rightMost, this.topMost, this.bottomMost

        this.leftMost = '';
        this.rightMost = '';
        this.topMost = '';
        this.bottomMost = '';

        this.props.canvasRef.getContext('2d').clearRect(0, 0, this.props.canvasRef.width, this.props.canvasRef.height); //clear the canvas for redrawing next time

        this.mousePositionArray = [];
        cotysEventHelper.setState({
            showOutlinedAddressBox: false
        })
        this.setState({
            mousePositionArray: [],
            editButtonClicked: false,
            croppedBase64String: ''
        });
    }
    processCropOnImage(e) {
        if (typeof this.props.imageReference !== 'undefined' && this.props.imageReference !== null && this.state.askedUserForNumber === true) {            
            //start crop logic
            let canvas = this.props.canvasRef,
                context = canvas.getContext('2d'),
                png = '',                               //will be the base64 representation of the image as a string
                w = this.rightMost - this.leftMost,
                h = this.bottomMost - this.topMost;
            if (typeof this.props.imageReference !== 'undefined') {
                context.drawImage(this.props.imageReference, this.leftMost, this.topMost, w, h, 0, 0, w, h);	//subtracting from the width on the sx makes the canvas get filled with a more zoomed out image
                png = canvas.toDataURL('image/png');
                this.setState({
                    croppedBase64String: png
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
                                <View className='svgOuterContainer' style={{width: '100%', height: '100%', display: ''}}>
                                    {this.mouseIsDown === true &&
                                        <svg style={{...styles.svg, position: 'absolute', top: '0px', left: '0px'}}>
                                            {this.state.mousePositionArray.map((mP, i) =>
                                                <circle r={4} key={i + 'c'} cx={mP.x} cy={mP.y} />
                                            )}
                                        </svg>
                                    }
                                    
                                    
                                    <svg style={styles.svg}>
                                        {/* {this.state.previousCroppedRects.map((data, i) => <rect key={'previous_' + i} x={data.leftMost} y={data.topMost} width={(data.rightMost - data.leftMost) + 'px'} height={(data.bottomMost - data.topMost) + 'px'} /> } */}
                                            
                                        

                                        <rect x={this.leftMost} y={this.topMost} width={(this.rightMost - this.leftMost) + 'px'} height={(this.bottomMost - this.topMost) + 'px'} />
                                    
                                    </svg>


                                    {this.state.croppedBase64String !== '' && this.state.editButtonClicked === true &&
                                        <View>
                                            {/* <PreviewImage leftMost={this.leftMost} rightMost={this.topMost} topMost={this.topMost} bottomMost={this.bottomMost} src={this.state.croppedBase64String} /> */}
                                            <EditRecentCrop setParentState={this._setState.bind(this)} leftMost={this.leftMost} rightMost={this.topMost} topMost={this.topMost} bottomMost={this.bottomMost} src={this.state.croppedBase64String} />
                                        </View>
                                    }
                                    




                                    <View style={{width: '100%', height: '100%', top: '0px', left: '0px', position: 'absolute'}}>
                                        <View style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '7px'}}>
                                            <Button onClick={this.resetToStart.bind(this)} styleRoot={{...styles.noSelectStyle, height: ''}} value='Redo?' />
                                            
                                            {this.state.croppedBase64String !== '' && this.state.editButtonClicked === true &&
                                                <Button onClick={this.nextButtonClicked.bind(this)} styleRoot={{...styles.noSelectStyle, height: ''}} value='Next' />
                                            }
                                            {this.state.croppedBase64String !== '' && this.state.editButtonClicked === false &&
                                                <Button onClick={this.editButtonClicked.bind(this)} styleRoot={{...styles.noSelectStyle, height: ''}} value='Edit' />
                                            }
                                            
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

class EditRecentCrop extends React.Component {
    constructor(props) {
        super(props);

        this.didMount = false;
        //here I will try to initialize this.ocrResultText with the resulting text of the this.props.src image data
        this.ocrResultText = '';
        // $.ajax({
        //     url: 'https://script.google.com/macros/s/AKfycbxi6q5NnhynvGe_-PSQ5tH5qe11tQbC6SlU443PmcqvJXYrm-k/exec?base64=' + this.props.src,
        //     type: 'GET'
        // }).done((e) => {
        //     console.log('in .then of ajax request with e = ', e);
        // })


      



        $.ajax({
            type: 'POST',
            url: 'https://script.google.com/macros/s/AKfycbxi6q5NnhynvGe_-PSQ5tH5qe11tQbC6SlU443PmcqvJXYrm-k/exec',
            data: {
                type: 'doOCR',
                base64: this.props.src
            },
            // dataType: 'json',
            success: (e) => {
                console.log('in success with e = ', e);
                this.ocrResultText = e;

                if(this.didMount === true) {
                    this.setState({
                        editableImageText: e,
                        ocrResultText: e
                    })
                }
            },
            error: (e) => {
                console.log('in error with e = ', e);
            }
        });




        this.state = {
            editableImageText: '',
            mouseIsDown: false,
            ocrResultText: '',
            textAreaScrollHeight: ''
        }
    }
    componentWillMount() {
        this.refs = [];
    }
    componentWillUnmount() {
        this.props.setParentState({ opacityOverride: styles.FoggyOverlay.opacity });          //to make the container not be shown for now
    }
    componentDidMount() {
        this.didMount = true;
        // setTimeout((e) => {
        //     $(this.refs['image']).fadeOut();
        // }, 1500);
        this.props.setParentState({ opacityOverride: 1 });          //to make the container not be shown for now


        //now I will try to set the state for the text off of the image (the result of the OCR logic)
        if(this.ocrResultText !== '') {
            this.setState({
                ocrResultText: this.ocrResultText,
                editableImageText: this.ocrResultText
            })
        }
    }
    onEditableImageTextChange(e) {
        console.log('onEditableImageTextChange e = ', e.nativeEvent, e.nativeEvent.target.value);
        this.setState({
            editableImageText: e.nativeEvent.target.value,
            textAreaScrollHeight: typeof this.refs['textArea'] !== 'undefined' ? this.refs['textArea'].scrollHeight + 'px' : ''
        })
    }
    render() {
        let _textAreaScrollHeight = '',
            _defaultHeight = 50,
            _maxHeight = parseFloat(window.innerHeight) + 'px';
        if (this.state.textAreaScrollHeight !== '') {
            _textAreaScrollHeight = this.state.textAreaScrollHeight;
        }
        if(_textAreaScrollHeight === '' || parseFloat(_textAreaScrollHeight) < _defaultHeight) {
            _textAreaScrollHeight = _defaultHeight + 'px';
        }
        
        return (
            <View style={{...styles.EditRecentCrop}}>
                <Image _ref={(eref) => {this.refs['image'] = findDOMNode(eref)}} style={{position: 'absolute', top: this.props.topMost, left: this.props.leftMost}} src={this.props.src} />
                
                
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                    <textarea ref={eref => { this.refs['textArea'] = findDOMNode(eref)}} placeholder='detecting text...' value={this.state.editableImageText} style={{ zIndex: 1, width: 'calc(100% - 14px)', boxSizing: 'border-box', margin: '0px 7px 0px 7px', textAlign: 'center', height: _textAreaScrollHeight, maxHeight: _maxHeight }} onChange={this.onEditableImageTextChange.bind(this)}  />

                </View>
           </View>
        )
    }
}

class PreviewImage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.refs = [];
    }
    componentDidMount() {

    }
    render() {
        return (
            <View style={{...styles.EditRecentCrop}}>
                <Image _ref={(eref) => {this.refs['image'] = findDOMNode(eref)}} style={{position: 'absolute', top: this.props.topMost, left: this.props.leftMost}} src={this.props.src} />

            </View>
        )
    }
}




class QuestionNumberOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.didMount = false;
        this.didRunLogic = false;
        this.state = {
            animatedBorder: {},
            numberOfAddresses: '',
            numberOfAddressesValue: '',
            presentInvalidInputMessage: false            
        }
    }
    componentDidMount() {
        this.didMount = true;
        this.props.setState({
            opacityOverride: 1
        });
        this.setState(this.state);
    }
    componentWillUnmount() {
        this.props.setState({
            opacityOverride: styles.FoggyOverlay.opacity                //set back to 'normal'
        })
    }
    componentDidUpdate() {
        if(this.state.presentInvalidInputMessage === true && this.didRunLogic === false) {
            this.didRunLogic = true;
            this.setState({
                animatedBorder: {...styles.addBorder}
            })
        }
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
        else {
            this.setState({
                presentInvalidInputMessage: true
            })
        }
    }
    textNumberClicked(e) {
        this.setState({
            numberOfAddresses: e
        })
    }
    validateAddressInputValue() {
        let returnValue = false;
        if(parseFloat(this.state.numberOfAddresses) > 0) {
            returnValue = true;
        }
        
        return returnValue;
    }
    render() {
        let _animateBorder = {};
        if(this.didMount === true) {
            // _animateBorder = {...styles.addBorder};
        }
        return (
            <View style={styles.QuestionNumberOverlay}>
                {this.state.presentInvalidInputMessage === false &&
                    <Text>How many addresses are on this image?</Text>
                }
                {this.state.presentInvalidInputMessage === true &&
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{...styles.animatedBorder, ...this.state.animatedBorder}}>Invalid Input.. </Text><Text>{' '}How many addresses are on this image (enter a number)?</Text>
                    </View>
                }



                <View style={{flexDirection: 'column'}}>
                    <Input type='number' placeholder='enter manually' value={this.state.numberOfAddresses} style={{width: 'calc(100% - 14px)', boxSizing: 'border-box', margin: '0px 7px 0px 7px', textAlign: 'center'}} onChange={this.onNumberOfAddressesChange.bind(this)} />
                    <View style={{justifyContent: 'space-evenly'}}>
                        {/* 
                            TODO: see the following to format these numbers to be like a keypad (its help for positioning)
                                https://stackoverflow.com/questions/29546550/flexbox-4-items-per-row
                        */}
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
    animatedBorder: {
        boxSizing: 'border-box',
        border: 'solid 1px black',
        transition: 'all 1s'
    },
    addBorder: {
        transition: 'all 1s',
        border: 'solid 1px white'
    },
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
        height: '100%',
        visibility: 'hidden'
    },
    EditRecentCrop: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        opacity: '1'
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
