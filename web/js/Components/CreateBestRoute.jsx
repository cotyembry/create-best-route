import React from 'react';
import {render, findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Button, View} from './Defaults.jsx';
import ProcessPictures from './ProcessPictures.jsx';
import TakeAnotherPicture from './TakeAnotherPicture.jsx';
import AddressList from './AddressList.jsx';

import $ from 'jquery';

import store from '../store.js';


export default class CreateBestRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //CreateBestRoute
            route: 1,
            //TakeAnotherPicture
            pictureToProcess: '',
            //ProcessPictures
            imagesTakenBase64: [],
            //SmartTouchyImage
            displayFoggyOverlay: false,
            showOutlinedAddressBox: false,
            leftMost: '',
            rightMost: '',
            bottomMost: '',
            topMost: '',
            previousCoppedRects: []
        }
    }
    componentDidMount() {
        $(this.refs['TopLevelComponent']).on('setState', (e, newState) => this.setState(newState));     //register the top level component to allow its state to be set
        // $(this.refs['TopLevelComponent']).on('getState', (e, keyToUse, callback) => {
        //     console.log('in getState with: ', e, keyToUse, callback);
        //     callback(this.state[keyToUse])
        // });

        store.register({
            type: 'setTopLevelComponent',
            data: {
                TopLevelComponent: this.refs['TopLevelComponent']
            }
        })
        // store.register({
        //     type: 'getPreviousCroppedRects',
        //     data: {
        //         callback: function() { return this.state.previousCoppedRects }
        //     }
        // })
        // if(typeof store.getPreviousCroppedRects !== 'undefined') {
        //     store.getPreviousCroppedRects();
        // }

        store.getPreviousCroppedRects = this.getPreviousCroppedRects.bind(this);


        $('html, body').css({
            width: parseFloat(window.innerWidth) + 'px',
            height: parseFloat(window.innerHeight) + 'px',
            margin: '0px',
            padding: '0px'
        })
    }
    componentWillMount() {
        this.refs = [];
    }
    getPreviousCroppedRects() {
        console.log('in getPreviousCroppedRects in CreateBestRoute.jsx');
        return this.state.previousCoppedRects.map(e => e);
    }
    _setState(newState) {
        this.setState(newState);
    }
    render() {
        console.log('in top level render: ', this.state);
        return (
            <View _ref={eref => {this.refs['TopLevelComponent'] = findDOMNode(eref)}} style={styles.CreateBestRoute}>
                {this.state.route === 1 &&
                    <View style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Button value='Address From Picture' styleRoot={{marginBottom: '14px'}} onClick={() => this.setState({route: 2})} />
                        <Button value='Enter Address Manually' />
                    </View>
                }



                {this.state.route === 2 &&
                    <TakeAnotherPicture setState={this._setState.bind(this)} {...this.state} />
                }


                {this.state.route === 3 &&
                    <ProcessPictures {...this.state} />
                }

                {this.state.route === 4 &&
                    <AddressList previousCoppedRects={this.state.previousCoppedRects} />
                }



            </View>
        )
    }
}

const styles = {
    CreateBestRoute: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }
}
