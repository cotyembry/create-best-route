/**
 *  Date: 03-06-2018
 *     I will do my best to make this event emitter modular so that I can come back and refactor it easily to be used for other platforms
 */

import $ from 'jquery';

const platform = 'web';

var cotysEventHelper = {
    getPreviousCroppedRects: function() {return 'default'},    //gets set in store.js once CreateBestRoute mounts
    TopLevelComponent: '',          //this gets set in store.js in the `register` function (which is called by CreateBestRoute in its `componentDidMount` method)
    
    forWeb: function(nativeElementReference, eventType, eventData, eventData2) {
        $(nativeElementReference).trigger(eventType, [eventData], eventData2);
    },
    setState: function(newState) {
        if(platform === 'web') {
            this.forWeb(this.TopLevelComponent, 'setState', newState);
        }
        else {
            console.warn('deal with this: ', newState, 'where platform is: ', platform);
        }
    },
    getState: function(keyToUse, callback) {
        let returnValue = 'defaultValue';
        
        if(platform === 'web') {
            console.log('in getState...', this.getPreviousCroppedRects());
            
            //this.forWeb(this.TopLevelComponent, 'getState', keyToUse, callback);
        }
        else {
            console.warn('deal with this: ', newState, 'where platform is: ', platform);
        }
        
        

        return returnValue;
    }
}

export default cotysEventHelper;
