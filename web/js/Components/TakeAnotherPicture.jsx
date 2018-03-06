import React from 'react';
import {render, findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Button, Image, Text, ScrollView, View} from './Defaults.jsx';

import $ from 'jquery';


export default class TakeAnotherPicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesTakenBase64: []
        }
    }
    componentDidMount() {
        let self = this;
        $('html, body').css(styles.TakeAnotherPicture);

        File.prototype.convertToBase64 = function (callback) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                callback(e.target.result, e.target.error);
            };
            reader.readAsDataURL(this);
        };


        $(this.refs['cameraInput']).on('change', function (e) {
            var selectedFile = e.target.files[0];
            selectedFile.convertToBase64(function (base64) {
                let bAClone = self.state.imagesTakenBase64.map(e => e);
                bAClone.push(base64);
                self.setState({
                    imagesTakenBase64: bAClone
                })
            })
        });
    }
    componentWillMount() {
        this.refs = [];
    }
    componentWillUnmount() {
        $('html, body').css({   //take all of the styles added when the component mounted away
            display: '',
            flexDirection: '',
            width: '',
            height: '',
            margin: '0px',
            padding: '0px'
        });
    }
    nextButtonClicked() {
        alert('Write logic to route to the next page');
        //TODO: for each photo, ask the user how many addresses are on the photo then continue with working on that picture until done, then when starting the next picture ask the user how many addresses are on the picture and then repeat the same flow etc.
        //          -show one picture at a time
    
    }
    openCameraUsingWebAPI() {
        // this.setState({
        //     showWebInput: true
        // })
    }
    openCamera() {
        //call native methods to open the camera
        this.openCameraUsingWebAPI();
    }
    render() {
        return (
            <View style={styles.TakeAnotherPicture}>
                <View style={styles.column}>
                    <ScrollView style={{...styles.row, alignItems: 'flex-end'}}>
                        {this.state.imagesTakenBase64.map((base64, i) => {
                            return (
                                <Image key={i} i={i} src={base64} style={styles.capturedImages} />
                            )
                        })}
                    </ScrollView>

                    <View style={{...styles.row, backgroundColor: 'black'}}>
                        <View style={{...styles.flexFill, backgroundColor: 'white'}}>
                            <Text>Add Pictures&nbsp;&nbsp;</Text>
                            
                            <input ref={eref => {this.refs['cameraInput'] = findDOMNode(eref)}} type='file' accept='image/*' style={{backgroundImage: 'test.png'}}/>

                            
                            {/* <Image src='../../assets/pictures/cameraIcon.svg' onClick={this.openCamera.bind(this)} /> */}
                        </View>
                        <Button value='Next' styleRoot={{display: 'flex', flex: 1}} onClick={this.nextButtonClicked.bind(this)} />
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
