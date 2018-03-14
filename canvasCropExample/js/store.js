import $ from 'jquery';

import cotysEventHelper from './cotysEventHelper.js';

var store = {
    TopLevelComponent: '',                          //TopLevelComponent will be used as the designated top level root React 

    register: function(action, callback) {
        switch(action.type) {
            case 'setTopLevelComponent':
                if(typeof action.data !== 'undefined' && typeof action.data.TopLevelComponent !== 'undefined') {
                    this.TopLevelComponent = action.data.TopLevelComponent;
                    cotysEventHelper.TopLevelComponent = this.TopLevelComponent;
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
