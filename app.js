const fs = require("fs");
const express = require("express");
const socket = require("socket.io");

let rawdata = fs.readFileSync(__dirname + '/data/disciplinas.json');
let data = JSON.parse(rawdata);

const app = express();
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 8000;
var server = app.listen(port);
var io = socket(server);

io.on('connection', (socket)=>{
    socket.emit('sendData', data);
    console.log(socket.id);
});