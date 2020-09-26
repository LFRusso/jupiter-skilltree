class Graph {
    constructor(nodes, width, height) {   
        let r = (1/5)*(width+height)/2      
        for (let i=0; i<nodes.length; i++) {
            nodes[i].x = width/2 + r*Math.cos(i*2*Math.PI/nodes.length);
            nodes[i].y = height/2 + r*Math.sin(i*2*Math.PI/nodes.length);
        }
        
        this.nodes = nodes;
        this.width = width;
        this.height = height;
    }

    add_node(node) {

    }

    add_nodes_from(nodes) {

    }

    add_edge(vertex) {

    }

    draw() {
        for (let i=0; i<this.nodes.length; i++) {
            fill(255, 255, 255, 255);
            circle(this.nodes[i].x , this.nodes[i].y, 20);
        
            textSize(12);
            fill(125, 125, 125, 255);
            text(this.nodes[i].id, this.nodes[i].x, this.nodes[i].y);
          }
    }
}