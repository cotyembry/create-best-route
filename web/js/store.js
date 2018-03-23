import $ from 'jquery';

import cotysEventHelper from './cotysEventHelper.js';

var store = {
    TopLevelComponent: '',                          //TopLevelComponent will be used as the designated top level root React 
    getPreviousCroppedRects: function () { console.log('getPreviousCroppedRects has NOT been set in CreateBestRoute\'s `componentDidMount` method'); },

    register: function(action, callback) {
        switch(action.type) {
            case 'setTopLevelComponent':
                if(typeof action.data !== 'undefined' && typeof action.data.TopLevelComponent !== 'undefined') {
                    this.TopLevelComponent = action.data.TopLevelComponent;
                    cotysEventHelper.TopLevelComponent = this.TopLevelComponent;
                }
                
                break;
            case 'getPreviousCroppedRects':
                if(typeof action.data !== 'undefined' && typeof action.data.callback !== 'undefined') {
                    cotysEventHelper.getPreviousCroppedRects = action.data.callback;
                }
                
                
                break;
            default:
                console.warn('in store.js, add a case for action: ', actionType);
                break;
        }
    },
    call: function(action) {
        console.warn('do something with: ', action);
    },
    setState: function(newState) {
        if(typeof this !== 'undefined' && typeof this.TopLevelComponent !== 'undefined' && this.TopLevelComponent !== '') {
            //if here then the component that has been designated as the TopLevelComponent has mounted and set its reference to `this.TopLevelComponent`
            cotysEventHelper.setState(newState);
        }
    }
}

export default store;
