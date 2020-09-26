var socket = io();
var data;

var G;
var width;
var height;

function preload() {
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
  background(0);
  G.draw();

  for(let i=0; i<G.nodes.length; i++) {
    if(dist(mouseX, mouseY, G.nodes[i].x, G.nodes[i].y) < 5) {
      fill(125, 10, 125, 255);
      circle(G.nodes[i].x , G.nodes[i].y, 20);

      textSize(30);
      fill(255, 255, 255, 255);
      text(G.nodes[i].nome, G.width/2 - G.r/2, G.height/2);
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
