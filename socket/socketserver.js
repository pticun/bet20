var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({port: 3000})
var io = require('socket.io-client');
var socket = io.connect('https://live.redsoftnv.com', {reconnect: true});
//https://github.com/socketio/socket.io-client
var testDemo = 0
socket.emit('type', 'betting');
var wsList = []

wss.on('connection', function (ws) { 
  console.log('WS bağlandı!')
  //client list
  wsList.push(ws)
//ws.send("burası server : ")
//client id gitti
  ws.on('close', function () { 
    wsList.splice(wsList.indexOf(ws), 1)
    console.log('WS kapandı!')
  })
  
  	socket.on('live', (data) => {
	wsList.map((ws) => { 
	console.log('Mesaj Gitti!')
      ws.send(JSON.stringify(data))
    })
	})

//client bir mesaj gönderdi
/*
  ws.on('message', function (message) { 
    console.log(JSON.stringify(testDemo))
    wsList.forEach(function (ws) { 
      ws.send("test demo")
    })
  })
  */
})