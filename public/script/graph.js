class Graph {
    constructor(nodes, width, height) {   
        
        for (let i=0; i<nodes.length; i++) {
            nodes[i].x = width/10 + i*(8*width/10)/nodes.length;
            nodes[i].y = 50;

            nodes[i].clicked = false;
        }
        
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
        node.y = 50*(node.maxpath + 1);
        node.clicked = false;
        this.nodes.push(node);

        this.organize_nodes();
    }

    organize_nodes() {
        let node_ranks = new Object();
        for (let i=0; i<this.nodes.length; i++) {
            let rank = this.nodes[i].maxpath;
            
            if (!Array.isArray(node_ranks[rank])) {
                node_ranks[rank] = [];
            } 
            node_ranks[rank].push(this.nodes[i]);
        }

        for (key in node_ranks) {
            let len = node_ranks[key].length;
            for (let i=0; i<len; i++) {
                node_ranks[key][i].x = this.width/10 + i*(8*this.width/10)/len;
            }
        }
    }

    draw() {

        // Desenhando vértices
        for (let i=0; i<this.nodes.length; i++) {    
            stroke(0,0);    
            if (this.nodes[i].clicked) {
                fill(255, 255, 255, 255);
                circle(this.nodes[i].x , this.nodes[i].y, 10);
            } else {
                fill(200, 200, 200, 200);
                circle(this.nodes[i].x , this.nodes[i].y, 10);
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