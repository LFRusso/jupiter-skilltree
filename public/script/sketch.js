var socket;
var data;
var G;
var width;
var height;

function preload() {
  socket = io.connect('http://localhost:8000'); 
  data = loadJSON('assets/data/disciplinas.json');
}

function setup() {
  width = windowWidth;
  height = windowHeight;

  let initial_nodes = [];
  for (entry in data) {
    if(data[entry]['requisitos'].length == 0) {
      initial_nodes.push(data[entry])
    }
  }
  G = new Graph(initial_nodes, width, height);

  createCanvas(width, height);
}
  
function draw() {
    background(0);
    G.draw();
}