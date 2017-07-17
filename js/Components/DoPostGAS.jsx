import React from 'react';
import { findDOMNode } from 'react-dom';

import $ from 'jquery';

//DoPostGAS - GAS means Google App Script
//  Use <EmailForm /> for this Component

function base64ToBlob(base64, mime) {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}

export default class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', sendTo: '', subject: '', message: ''};

    //understanding and figuring out that I needed to bind this was so hard
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  componentDidMount() {
    //now I will format the labels and input elements
    var widthAvailable = $('#inputContainer').outerWidth();
    $('#inputContainer').css({ width: widthAvailable });
  }

  handleSubjectChange(event) {
    // console.log('in test')

    this.setState({subject: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {


    var messageBody = document.getElementById('messageBody').value;
    //sweet, now I have the messageBody next that was typed in the textarea element
    //now I need to use it and send it to the server so that an email can be sent
    // console.log('Email was submitted: ' +  messageBody);

    var finalObject = {
      subject: this.state.subject,
      messageBody: messageBody
    }
  


    //todo - finish this
    //What I probably need to do now is create a hidden form for
    //this page and use it to do a post when needing to send the
    //email on the node.js side of things rather than sending
    //this in the client


    //self.post('/send', finalObject);
    // let messageToSend = 'subject=' + this.state.subject + '&messageBody=' + messageBody;
    // this.sendEmail(messageToSend);

    let messageObject = {
      subject: this.state.subject,
      messageBody: messageBody
    }
    this.sendEmail(messageObject);

    event.preventDefault();
  }
  post(path, params, method) {
        method = method || "post"; // Set method to post by default if not specified.

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
             }
        }

        document.body.appendChild(form);
        form.submit();
  }
  sendEmail(messageObject) {
    //Google Apps Script execution api
    //script id:
    //Mc0jDObeKwDpQ2xgyvZUYrmDtFGJL1AU8

    let iframe = $('#emailiFrameContainer')[0],
      gForm = $(iframe.contentWindow.document).find('#gform')[0],
      scriptUrl = gForm.getAttribute('action');


    var stringBlobLength = this.props.imgSrc.length; //this just helps me format the returned base64 string to send to the next funciton

    // console.log(this.props.imgSrc[0] + this.props.imgSrc[1] + this.props.imgSrc[2] + this.props.imgSrc[3] + 'pretty format =:',this.props.imgSrc.slice(4, stringBlobLength));
    
    // console.log(base64ToBlob(this.props.imgSrc.slice(22, stringBlobLength), 'image/png'));

    alert('...')
    //this works
    // gForm.setAttribute('action', scriptUrl + '?' + 'test=7&imgBlob=' + base64ToBlob(this.props.imgSrc.slice(22, stringBlobLength), 'image/png'))
    gForm.setAttribute('action', scriptUrl + '?' + 'test=7&imgSrc=' + encodeURIComponent(this.props.imgSrc.slice(22, stringBlobLength)));
    

    // $(gForm).submit();  //do a POST submission using the <form> element that is being rendered in the hidden <iframe></iframe> on the page
    var data = new FormData();
    

    var blob = base64ToBlob(this.props.imgSrc.slice(22, stringBlobLength), 'image/png');

    console.log('blob = ', blob, 'base64 = ', this.props.imgSrc.slice(22, stringBlobLength));

    // data.append('file', blob);
    
    //console.log(blob)
      // var url = (window.URL || window.webkitURL).createObjectURL(blob);
      // console.log(url);

      // var data = new FormData();
      // data.append('file', url); 

      // $.ajax({
      //   url :  scriptUrl,
      //   type: 'POST',
      //   data: data,
      //   contentType: false,
      //   processData: false,
      //   success: function(data) {
      //     alert("boa!");
      //   },    
      //   error: function() {
      //     alert("not so boa!");
      //   }
      // });














    // alert('here?' + this.props.imgSrc);

    // $.get(
    //   'https://script.google.com/macros/s/AKfycbzITk9OTp4yOL3-TzRUnCEvXFccKreakinuR7LiVXArT4NE7IU/exec',
    //   {
    //     test: 7,
    //     // base64: this.props.imgSrc
    //     dataType: 'jsonp'
    //   }
    // )
    // .done(function( data ) {
    //   alert( 'Data Loaded: ' + data );
    // })




    // location.reload();  //I do this because after having submitted the form once, chrome gives me an error saying something about a cross origin issue (but it works on the first submit...)

  }
  render() {
    return (
      <div id="divFormId">
        <label id="inputContainer" style={styles.labelStyle}>

          <div>
            Subject:
          </div>
          <div>
            <input style={styles.subject} type="text" value={this.state.subject} onChange={this.handleSubjectChange} />
          </div>

          <br />

          <div>
            Message Body:
          </div>
          <div>
            <textarea style={styles.messageBody} id="messageBody"></textarea>
          </div>
          
        </label>
        
        <br />

        <button id="submitButton" style={styles.submit} onClick={this.handleSubmit.bind(this)}>Send</button>

        <br />

        <CIFrame />   {/* coty added 05-25-2017 - this helps me send the email from the client side */}
      </div>
    );
  }
}



var styles = {
  labelStyle: {
    fontSize: 20,
    color: 'white'
  },
  sendTo: {
    marginBottom: 5
  },
  subject: {
    width: 280,
    height: 50,
    fontSize: 33,
    marginBottom: 5,
    // float: 'right'
  },
  messageBody: {
    width: 200,
    height: 200,
    fontSize: 30,
    marginBottom: 5
  },
  submit: {
    cursor: 'pointer',
    fontSize: 18
  }
}


export class CIFrame extends React.Component {
  componentWillMount() {
    this.refs = [];
  }
  componentDidMount() {
    //
    //once this iframe mounts (even though its hidden to the user) this method is invoked
    //I use the reference to the root div DOM element walk the DOM down to find the child
    //iframe - I had to do it this way because refs weren't working on the iframe element
    //once I get the iframe I get a reerence to the document element to then append the
    //this div#formContainer element to the body element within the iframe (it looks so
    //different because jquery can take in a string and it will create those elements on
    //the fly for you)
    $(this.refs['iframeParent'].querySelectorAll('iframe')[0].contentWindow.document.body).append(`
      <div id="formContainer" style="display: none;"><!-- coty 05-25-2017 - since React Components are so weird when it comes to forms, I like using standard html for these types of elements...anyways, App.jsx uses this form to do a POST to my google script by creating an event and sending it to the below <button id="sendEmail">Send</button> element -->
        <form id="gform" method="POST"
        action="https://script.google.com/macros/s/AKfycbzITk9OTp4yOL3-TzRUnCEvXFccKreakinuR7LiVXArT4NE7IU/exec">
          <fieldset>
            <textarea id="message" name="message" placeholder="Message Body"></textarea>
          </fieldset>
          <button id="sendEmail">Send</button>
        </form>
      </div>
    `)
  }
  render() {
    return (
      <div ref={(elementRef) => { this.refs['iframeParent'] = findDOMNode(elementRef) }} id='divId'><iframe id='emailiFrameContainer' onLoad={this.props.onload} style={{display: 'none'}}></iframe></div>
    )
  }
}
