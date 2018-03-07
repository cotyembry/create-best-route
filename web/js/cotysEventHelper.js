/**
 *  Date: 03-06-2018
 *     I will do my best to make this event emitter modular so that I can come back and refactor it easily to be used for other platforms
 */

import $ from 'jquery';

const platform = 'web';

var cotysEventHelper = {
    TopLevelComponent: '',  //this gets set in store.js in the `register` function (which is called by CreateBestRoute in its `componentDidMount` method)
    forWeb: function(nativeElementReference, eventType, eventData) {
        $(nativeElementReference).trigger(eventType, [eventData])
    },
    setState: function(newState) {
        if(platform === 'web') {
            console.log('newState in cotysEventHelper = ', newState);
            this.forWeb(this.TopLevelComponent, 'setState', newState);
        }
        else {
            console.warn('deal with this: ', newState, 'where platform is: ', platform);
        }
    }
}

export default cotysEventHelper;
