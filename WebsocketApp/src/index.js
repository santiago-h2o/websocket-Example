const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express()
const server = require("http").Server(app)
const WebSocketServer = require("websocket").server;


app.set("puerto", 3000)
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "./public")))

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

let conn = null

wsServer.on("request", (request)=>{
    const connection = request.accept(null, request.origin)
    conn = connection
    connection.on("message", (message)=>{
        console.log("mensaje recibido: " + message.utf8Data)
        connection.sendUTF("recibido: " + message.utf8Data)
    })
    connection.on("close", (reasonCode, description)=>{
        console.log("el cliente se desconecto")
    })
})
let i = 1
setInterval(()=>{
    if(conn != null && conn.connected){
        conn.sendUTF("Mensaje " + i + "del servidor")
        i++
    }
}, 5000)

server.listen(app.get("puerto"), ()=>{
    console.log("servidor iniciado en el puerto: "+ app.get("puerto"))
})