
var fileReader = '';
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
  fileReader = true;
} else {
  alert('The File APIs are not fully supported in this browser.');
}



//<input type="file" id="files" name="files[]" multiple />
//<output id="list"></output>

  function handleFileSelect(evt, callback) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          callback({ thumbnailSrc: e.target.result, thumbnailTitle: theFile.name })
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  // document.getElementById('').addEventListener('change', handleFileSelect, false);


export { handleFileSelect, fileReader }
