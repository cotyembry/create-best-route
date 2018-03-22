import React from 'react';
import {render, findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Button, Image, Text, ScrollView, View} from './Defaults.jsx';

import $ from 'jquery';

import cotysEventHelper from '../cotysEventHelper.js';


export default class TakeAnotherPicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesTakenBase64: typeof this.props.imagesTakenBase64 !== 'undefined' ? this.props.imagesTakenBase64.map(e => e) : []
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            imagesTakenBase64: (typeof newProps !== 'undefined' && typeof newProps.imagesTakenBase64 !== 'undefined') ? newProps.imagesTakenBase64.map(e => e) : []
        })
    }
    componentDidMount() {
        let self = this;
        
        function setDefault() {
            $('html, body').css({
                width: parseFloat(window.innerWidth) + 'px',
                height: parseFloat(window.innerHeight) + 'px',
                margin: '0px',
                padding: '0px'
            })
        }
        setDefault();
        setDefault();
        setTimeout(setDefault, 5000);

        File.prototype.convertToBase64 = function (callback) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                callback(e.target.result, e.target.error);
            };
            reader.readAsDataURL(this);
        };


        $(this.refs['cameraInput']).on('change', (e) => {
            var selectedFile = e.target.files[0];
            selectedFile.convertToBase64((base64) => {
                let bAClone = self.state.imagesTakenBase64.map(e => e);
                bAClone.push(base64);
                cotysEventHelper.setState({
                    imagesTakenBase64: bAClone
                });

                this.props.setState({
                    imagesTakenBase64: bAClone
                });
            })
        });

        $(window).resize((e) => {
            this.setState(this.state);
        });
        this.setState(this.state);
    }
    componentWillMount() {
        this.refs = [];
    }
    imageRefCallback(eref, i) {
        this.refs['imageRef_' + i] = findDOMNode(eref);
        // this.setState(this.state);
    }
    nextButtonClicked() {
        cotysEventHelper.setState({
            route: 3
        })
    }
    render() {
        return (
            <View style={styles.TakeAnotherPicture}>
                <View style={styles.column}>
                    <ScrollView style={{...styles.row, alignItems: 'flex-end', flex: 1}}>
                        {this.state.imagesTakenBase64.map((base64, i) => {
                            let _imageWidthToPreseverAspectRatio = 'auto';
                            if(typeof this.refs['imageRef_' + i] !== 'undefined') {
                                let heightInPixels = this.refs['imageRef_' + i].clientHeight,
                                    naturalWidth = this.refs['imageRef_' + i].naturalWidth,
                                    naturalHeight = this.refs['imageRef_' + i].naturalHeight;
                                
                                // _imageWidthToPreseverAspectRatio = ((naturalWidth * heightInPixels) / naturalHeight) + 'px';
                            }

                            return (
                                <Image ref={eref => {this.imageRefCallback(eref, i)} } key={i} i={i} src={base64} style={{...styles.capturedImages, height: '100%', width: _imageWidthToPreseverAspectRatio}} />
                            )
                        })}
                    </ScrollView>

                    <View style={{...styles.row, backgroundColor: 'black'}}>
                        <View style={{...styles.flexFill, alignItems: 'self-start', flexDirection: 'column', backgroundColor: 'white'}}>
                            <Text>Add Pictures:&nbsp;&nbsp;</Text>
                            
                            <input ref={eref => {this.refs['cameraInput'] = findDOMNode(eref)}} type='file' accept='image/*' style={{backgroundImage: 'test.png'}}/>

                            
                            {/* <Image src='../../assets/pictures/cameraIcon.svg' onClick={this.openCamera.bind(this)} /> */}
                        </View>
                        <Button value='Next' style={{width: '100%'}} styleRoot={{display: 'flex', flex: 1}} onClick={this.nextButtonClicked.bind(this)} />
                    </View>
                </View>


            </View>
        )
    }
}

const styles = {
    TakeAnotherPicture: {
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
