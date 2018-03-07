import React from 'react';
import {render, findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Button, Image, View} from './Defaults.jsx';



export default class SmartTouchyImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           base64: typeof this.props.src !== 'undefined' ? this.props.src : ''
        }
    }
    componentDidMount() {
        
    }
    componentWillMount() {
        this.refs = [];
    }
    render() {
        return (
            <View style={styles.SmartTouchyImage}>
                <Image src={this.props.src} />
            </View>
        )
    }
}

const styles = {
    SmartTouchyImage: {
        display: 'flex',
        flexDirection: 'column'
    }
}
