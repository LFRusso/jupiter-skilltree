# Construção do grafo com networkx para obtenção de informações e alterações necessárias
import networkx as nx
import json
from networkx.algorithms.simple_paths import all_simple_paths

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

# Obtem o maior caminho de disciplinas necessária para cada uma.
# Usado para determinar a posição do vértice durante a construção da visualização no app.
for key in list(disciplinas.keys()):
    max_path = [len(p) for p in all_simple_paths(G, 'START', key)]
    if (max_path):
        disciplinas[key]['maxpath'] = max(max_path)-2
    else:
        disciplinas[key]['maxpath'] = 0

with open("./public/assets/data/disciplinas.json", 'w+') as f:
    json.dump(disciplinas, f)