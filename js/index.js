import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';


import App from './Components/App.jsx';

// its not working perfectly right now, I will have to work on this later
//
// for hot reloading
// if (module.hot) {
//     module.hot.accept();
// }


// import store from './Components/store.js';

// console.log(store);

$(document).ready(function() {
	ReactDOM.render(<App />, document.getElementById('App'))
})
