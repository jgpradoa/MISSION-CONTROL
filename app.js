//importing express
var express = require('express');
//importing logger
var morgan = require('morgan');

//initializing express
var app = express();

//socket
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

io.on('connection', (socket) => {
  console.log('user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('add-message', (message) => {
    console.log('sending new msg');
    io.emit('message', {type:'new-message', text: message});    
  });
});

//brother API
var broApi = require('./brother.js'); 

var userApi = require('./user.js'); 

//adding logger to express
app.use(morgan('combined'));
//adding brother's api to express
app.use('/api/brother', broApi); 

app.use('/api/user',userApi);

//starting express on port 8081
app.listen(8081);

http.listen(5000, () => {
  console.log('started on port 5000');
});


//To-Do
//add passportJS
//add 