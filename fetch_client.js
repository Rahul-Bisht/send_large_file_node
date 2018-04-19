
var file_url = 'http://localhost:5200/readfile';

var myRequest = new Request( file_url );
// fetch returns a promise
fetch(myRequest)
  .then(function(response) {
    var contentLength = response.headers.get('Content-Length');
  
    var myReader = response.body.getReader();
    
    var decoder = new TextDecoder();
    
    var buffer = '';
    
    var received = 0;
    // read() returns a promise
    myReader.read().then(function processResult(result) {
      // the result object contains two properties:
      // done  - true if the stream is finished
      // value - the data
      if (result.done) {
        // console.log(received);
        // console.log(buffer);
        return;
      }
      // update the number of bytes received total
      received += result.value.length;
      // result.value is a Uint8Array so it will need to be decoded
      // buffer the decoded text before processing it
      console.log(result.value);
      buffer += decoder.decode(result.value, {stream: true});
      /* process the buffer string */

      // read the next piece of the stream and process the result
      return myReader.read().then(processResult);
    })
  })