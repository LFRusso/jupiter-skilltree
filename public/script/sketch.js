var socket;
var data;

function preload() {
  socket = io.connect('http://localhost:8000'); 
  data = loadJSON('assets/data/disciplinas.json');
}

function setup() {
  console.log(data);
  createCanvas(850, 600);
}
  
function draw() {
    background(51)
    ellipse(mouseX, mouseY, 80, 80);
}