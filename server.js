
const http=require('http'),
app=require('express')(),
fs=require('fs');

const file='./test.html';

app.set('port',5200);
app.get('/',(req,res)=>{
    res.sendfile('./index.html');
});

app.get('/readfile',(req,res)=>{
    var CHUNK_SIZE = 1024,
    buffer = new Buffer(CHUNK_SIZE);
    fs.open(file, 'r', function(err, fd) {
        if (err) throw err;
        function readNextChunk() {
          fs.read(fd, buffer, 0, CHUNK_SIZE, null, function(err, nread) {
            if (err) throw err;
      
            if (nread === 0) {
              // done reading file, do any necessary finalization steps
      
              fs.close(fd, function(err) {
                if (err) throw err;
                console.log('closing response');
                res.end();
              });             
              return;
            }
      
            var data;
            if (nread < CHUNK_SIZE)
              data = buffer.slice(0, nread);
            else
              data = buffer;
            console.log(data.length);
            res.write(data);
            // do something with `data`, then call `readNextChunk();`'
            readNextChunk();
          });
        }
        readNextChunk();
      });
});



let server = http.createServer(app);
    server.listen(app.get('port'), function () {
        console.log('Express http server listening on port ' + app.get('port'));
    });

