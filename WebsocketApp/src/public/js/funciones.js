function enviarTexto(event){
    event.preventDefault();
    event.stopPropagation();
    var campo = event.target.texto;

    doSend(campo.value)
    campo.value = ""
}

function init(){
    wsConnect();
}
function wsConnect(){
    websocket = new WebSocket("ws://localhost:3000")

    //asignacion de callbacks
    websocket.onopen = function(evt){
        onOpen(evt);
    }

    websocket.onClose = function(evt){
        onClose(evt);
    }

    websocket.onmessage = function(evt){
        onMessage(evt);
    }

    websocket.onerror = function(evt){
        onerror(evt);
    }
}

function onOpen(evt){
    document.getElementById("enviar").disabled = false;
    doSend("saludos del cliente websocket");
}

function onClose(evt){
    document.getElementById("enviar").disabled = true;
    document.getElementById("mensajes").innerHTML = "";

    //si se cierra la conexion intentamos volver a conectarnos cada 2 segundos
    setTimeout(function(){
        wsConnect();
    }, 2000)
}

function onMessage(evt){
    var area = document.getElementById("mensajes");
    area.innerHTML += evt.data + "\n";
}

function onError(evt){
    console.log("Error" + evt)
}

function doSend(mensaje){
    websocket.send(mensaje);
}

window.addEventListener("load", init, false)