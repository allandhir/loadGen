var app = require('express')();
var server = require('http').Server(app);

var bodyParser = require("body-parser");
urlEncodedParser = bodyParser.urlencoded({ extended: false });

//var http = require('http');
//http.globalAgent.keepAlive = true;
// var io = require('socket.io')(server);

// const nsp = io.of("/websocket");

// nsp.on('connection', function (socket) {
//   console.log('connected socket!');

//   socket.on('fromclient', function (data) {
//     console.log(data.message);
//     nsp.emit('fromserver', { message: 'Hello' });
//   });
//   socket.on('disconnect', function () {
//     console.log('Socket disconnected');
//   });
// });
const cors = require('cors');
app.use(cors());


//const { exec } = require('child_process');

app.get('/load', (req,res)=>{
    var x = 0.0001;
    for (var i = 0; i < 1000000; i++) {
        x += Math.sqrt(x)
        //console.log(x);
    } 
    //res.sendStatus(200);
})



const port = 5001;
server.listen(port, ()=> console.log(`listening on port ${port}...`));
