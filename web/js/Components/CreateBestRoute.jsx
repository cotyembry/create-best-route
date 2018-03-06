import React from 'react';
import {render, findDOMNode} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Button, View} from './Defaults.jsx';
import TakeAnotherPicture from './TakeAnotherPicture.jsx';




// import AddressesFromPic from './AddressesFromPic.jsx';



export default class CreateBestRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            takeAnother: false
        }
    }
    render() {
        return (
            <View style={styles.CreateBestRoute}>
                {this.state.takeAnother === false &&
                    <View style={{flexDirection: 'column'}}>
                        <Button value='Address From Picture' onClick={() => this.setState({takeAnother: !this.state.takeAnother})} />
                        <Button value='Enter Address Manually' />
                    </View>
                }



                {this.state.takeAnother === true &&
                    <TakeAnotherPicture />
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
