
function clickConnect() {
  let socketIp = document.getElementById("socketIp").value
  ws = new WebSocket("ws://" + socketIp);

  ws.onopen = function(evt) {
    console.log('Connected', evt);

  };

  ws.onclose = function(evt) {
    console.log('sunucu kapandı: ' + evt.data);
  };

  ws.onmessage = function(evt) {
    //console.log('sunucudan mesaj var: ' + evt.data);
  };

  ws.onerror = function(evt) {
    console.log('hata var: ' + evt.data);
  };
}

function clickDisconnect() {
  ws.close();
}

function clickSend() {
  let val = document.getElementById("sendData").value
  ws.send(val + " // "  + Date.now());
}




//clickConnect();