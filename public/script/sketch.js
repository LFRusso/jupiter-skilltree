var socket = io();
var data;

var G;
var width;
var height;

function preload() {
  data = loadJSON('assets/data/disciplinas.json');
}

function setup() {
  width = 2*windowWidth/3;
  height = 3*windowHeight/4;

  let initial_nodes = [];
  for (entry in data) {
    if(data[entry]['requisitos'].length == 0) {
      initial_nodes.push(data[entry])
    }
  }
  G = new Graph(initial_nodes, width, height);
  createCanvas(width, height);
}


function update_graph() {
  for (entry in data) {
    let prereqs = data[entry]['requisitos'].slice();
    for (let i=0; i<G.nodes.length; i++) {
      
      if (prereqs.includes(G.nodes[i].id) && G.nodes[i].clicked) {
        let index = prereqs.indexOf(G.nodes[i].id);
        prereqs.splice(index, 1);
      }
    }
    if (prereqs.length == 0) {
      G.add_node(data[entry]);
    }
  }
}
  
function draw() {
  background(100);
  G.draw();

  for(let i=0; i<G.nodes.length; i++) {
    if(dist(mouseX, mouseY, G.nodes[i].x, G.nodes[i].y) < 5) {
      stroke(0);
      fill(125, 10, 125, 255);
      circle(G.nodes[i].x , G.nodes[i].y, 20);
      
      textSize(20);
      fill(255, 255, 255, 255);
      text(G.nodes[i].id + ' - ' + G.nodes[i].nome, 0, G.height - 10);
    }
  }

  update_graph();
}

function mouseClicked() {
  for(let i=0; i<G.nodes.length; i++) {
    if(dist(mouseX, mouseY, G.nodes[i].x, G.nodes[i].y) < 5) {
      G.nodes[i].clicked = true;
    }
  }
}
