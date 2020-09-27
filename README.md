# jupiter-skilltree

Disponível em https://jupiter-skilltree.herokuapp.com/

## 1. Modo de usar

## 1.1 Raspagem dos dados
No diretório `scrap`  digite:
```shell
$ scrapy runspider spider
```
o arquivo `data/disciplinas.json` será gerado.

Para obter a grade de outro curso adicione as informações dele seguindo os exemplos

```python
cursos = {
    'bcc':      {'url': "https://uspdigital.usp.br/jupiterweb/listarGradeCurricular?codcg=55&codcur=55041&codhab=0&tipo=N",
                'codigo': 55041
    },
    'fiscomp':  {'url': "https://uspdigital.usp.br/jupiterweb/listarGradeCurricular?codcg=76&codcur=76041&codhab=0&tipo=N",
                'codigo': 76041
    },
    'estat':    {'url': "https://uspdigital.usp.br/jupiterweb/listarGradeCurricular?codcg=55&codcur=55071&codhab=4&tipo=V",
                'codigo': 55071
    },
    'meucurso': {'url': ...,
                'codigo': ...
        },
    }
start_urls = [cursos['meucurso']['url']]
codigo_curso = cursos['meucurso']['codigo']
```

### 1.2 Preparação dos dados

Após a raspagem, os dados devem ser preparados para serem usados no app. Na pasta raíz, execute:

```shell
$ python3 prepare4app.py 
```

Isso criará o arquivo `public/assets/data/disciplinas.json`.

### 1.3 Executando o app

Na pasta raíz, execute:

```shell
$ npm i
```
para instalar as dependências. Em seguinda, já pode executar:

```shell
$ node app.js
```

A aplicação deverá estar rodando em `http://localhost:8000/`.