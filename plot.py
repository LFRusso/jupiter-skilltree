import networkx as nx
import json
import matplotlib.pyplot as plt
from networkx.algorithms.simple_paths import all_simple_paths
import numpy as np

def get_prereqs(G, disc):
    paths = []
    for p in all_simple_paths(G, 'START', disc):
        paths += p
    prereqs = np.unique(np.array(paths))
    prereqs = prereqs[prereqs != 'START']
    prereqs = prereqs[prereqs != disc]
    return prereqs

with open("data/disciplinas.json", 'r') as f:
    line = f.readline()
disciplinas = json.loads(line)

G = nx.DiGraph()
G.add_nodes_from(list(disciplinas.keys()))

for key in list(disciplinas.keys()):
    for req in disciplinas[key]['requisitos']:
        G.add_edge(req, key)
    if(len(disciplinas[key]['requisitos']) == 0):
        G.add_edge('START', key)

options = {
    'node_color': 'green',
    'edge_color': 'gray',
    'node_size': 90,
    'width': 0.9,
    'with_labels': True
}
#nx.draw_spring(G, **options)
#plt.show()