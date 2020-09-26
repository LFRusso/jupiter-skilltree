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

with open("./data/disciplinas.json", 'r') as f:
    line = f.readline()
disciplinas = json.loads(line)

G = nx.DiGraph()
G.add_nodes_from(list(disciplinas.keys()))

for key in list(disciplinas.keys()):
    for req in disciplinas[key]['requisitos']:
        G.add_edge(req, key)
    if(len(disciplinas[key]['requisitos']) == 0):
        G.add_edge('START', key)

for key in list(disciplinas.keys()):
    max_path = [len(p) for p in all_simple_paths(G, 'START', key)]
    if (max_path):
        disciplinas[key]['maxpath'] = max(max_path)-2
    else:
        disciplinas[key]['maxpath'] = 0

with open("./public/assets/data/disciplinas.json", 'w+') as f:
    json.dump(disciplinas, f)

options = {
    'node_color': 'green',
    'edge_color': 'gray',
    'node_size': 90,
    'width': 0.9,
    'with_labels': True
}
#nx.draw_spring(G, **options)
#plt.show()