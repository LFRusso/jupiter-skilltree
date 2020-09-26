class Graph {
    constructor(nodes, width, height) {   
        let r = (1/8)*(width+height)/2
        for (let i=0; i<nodes.length; i++) {
            let ang = i*2*Math.PI/nodes.length;
            nodes[i].x = width/2 + (r + Math.random() * (10 + 30) - 30)*Math.cos(ang);
            nodes[i].y = height/2 + (r + Math.random() * (10 + 30) - 30)*Math.sin(ang);
            nodes[i].ang = ang;

            nodes[i].clicked = false;
        }
        
        this.r = r
        this.nodes = nodes;
        this.width = width;
        this.height = height;
    }

    index_by_id(id) {
        for (let i=0; i<this.nodes.length; i++) {
            if (id == this.nodes[i].id) {
                return i;
            }
        }
        return -1;
    }

    add_node(node) {
        if (G.nodes.includes(node)) {
            return;
        }
        
        let ang = 0;
        for (let i=0; i<node.requisitos.length; i++) {
            let index = this.index_by_id(node.requisitos[i]);
            ang += this.nodes[index].ang;
        }
        ang = ang/node.requisitos.length + Math.random() * (0.4 + 0.4) - 0.4;

        let node_r = (50*node.maxpath + this.r + Math.random() * (10 + 10) - 10);
        node.x = this.width/2 + node_r*Math.cos(ang);
        node.y = this.height/2 + node_r*Math.sin(ang);
        node.ang = ang;
        node.clicked = false;
        console.log(node);

        this.nodes.push(node);
    }

    add_nodes_from(nodes) {

    }

    add_edge(vertex) {

    }

    draw() {

        // Desenhando vértices
        for (let i=0; i<this.nodes.length; i++) {    
            stroke(0,0);    
            if (this.nodes[i].clicked) {
                fill(255, 255, 255, 255);
                circle(this.nodes[i].x , this.nodes[i].y, 10);

                /*
                textSize(12);
                fill(255, 0, 0, 255);
                text(this.nodes[i].id, this.nodes[i].x, this.nodes[i].y);*/
            } else {
                fill(200, 200, 200, 200);
                circle(this.nodes[i].x , this.nodes[i].y, 10);


                /*textSize(12);
                fill(125, 125, 125, 255);
                text(this.nodes[i].id, this.nodes[i].x, this.nodes[i].y);*/
            }
          }

        // Desenhando arestas
        for (let i=0; i<this.nodes.length; i++) {
            for (let j=0; j<this.nodes[i].requisitos.length; j++) {
                let index = this.index_by_id(this.nodes[i].requisitos[j])
                stroke(255);
                line(this.nodes[i].x, this.nodes[i].y, this.nodes[index].x, this.nodes[index].y);
            }
        } 
    }

    handle_input(x, y) {
    }
}