// If you’re already using jQuery and you need an EventEmitter you may as well use jQuery’s event system instead of building your own. Here’s something I used in a recent project:
// EDIT: made it simpler. (Now mixin: jQuery.eventEmitter instead of jQuery.EventEmitter.prototype.)

import $ from 'jquery';

(function(jQuery) {
 
  jQuery.eventEmitter = {
    _JQInit: function() {
      this._JQ = jQuery(this);
    },
    emit: function(evt, data) {
      !this._JQ && this._JQInit();
      this._JQ.trigger(evt, data);
    },
    once: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.one(evt, handler);
    },
    on: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.bind(evt, handler);
    },
    off: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.unbind(evt, handler);
    }
  };
 
}($));
// It’s a mixin, and you can use it like so:
function App() {
  // do stuff
}
 
$.extend(App.prototype, $.eventEmitter);
 
var eventEmitter = new App();
 
// myApp supports events!
 
// myApp.on('someEvent', function() {
//   alert('someEvent!');
// });
// myApp.emit('someEvent'); // 'someEvent' alerted

export default eventEmitter;
