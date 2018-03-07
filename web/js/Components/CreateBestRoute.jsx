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
            imagesTakenBase64: []
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
    }
    componentWillMount() {
        this.refs = [];
    }
    render() {
        return (
            <View _ref={eref => {this.refs['TopLevelComponent'] = findDOMNode(eref)}} style={styles.CreateBestRoute}>
                {this.state.route === 1 &&
                    <View style={{flexDirection: 'column'}}>
                        <Button value='Address From Picture' onClick={() => this.setState({route: 2})} />
                        <Button value='Enter Address Manually' />
                    </View>
                }



                {this.state.route === 2 &&
                    <TakeAnotherPicture imagesTakenBase64={this.state.imagesTakenBase64} />
                }


                {this.state.route === 3 &&
                    <ProcessPictures imagesTakenBase64={this.state.imagesTakenBase64} />
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
