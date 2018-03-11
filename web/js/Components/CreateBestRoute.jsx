import React from 'react';
import {render, findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Button, View} from './Defaults.jsx';
import ProcessPictures from './ProcessPictures.jsx';
import TakeAnotherPicture from './TakeAnotherPicture.jsx';

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
            topMost: ''
        }
    }
    componentDidMount() {
        $(this.refs['TopLevelComponent']).on('setState', (e, newState) => this.setState(newState));     //register the top level component to allow its state to be set
        store.register({
            type: 'setTopLevelComponent',
            data: {
                TopLevelComponent: this.refs['TopLevelComponent']
            }
        })

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
    render() {
        return (
            <View _ref={eref => {this.refs['TopLevelComponent'] = findDOMNode(eref)}} style={styles.CreateBestRoute}>
                {this.state.route === 1 &&
                    <View style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Button value='Address From Picture' styleRoot={{marginBottom: '14px'}} onClick={() => this.setState({route: 2})} />
                        <Button value='Enter Address Manually' />
                    </View>
                }



                {this.state.route === 2 &&
                    <TakeAnotherPicture {...this.state} />
                }


                {this.state.route === 3 &&
                    <ProcessPictures {...this.state} />
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
