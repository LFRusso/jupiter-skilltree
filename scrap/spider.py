import scrapy
import json

class JupiterSpider(scrapy.Spider):
    # Informações dos cursos para o scrap:
        ## url da grade curricular no Jupiterweb
        ## código do curso nas páginas de requistos das disciplinas
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
    }
    start_urls = [cursos['bcc']['url']]
    codigo_curso = cursos['bcc']['codigo']

    name="jupiter-spider"
    base_url = "https://uspdigital.usp.br/jupiterweb/"

    courses = {}

    # Parse dos campos de cada disciplina na página da grade curricular
    def parse(self, response):
        fields = response.xpath("//table//tr[@class='txt_verdana_8pt_gray']")
        for field in fields:
            course_info = field.xpath("./td//a[not(@class='link_olive')]")
            
            course_id = course_info.xpath("text()").extract()
            link = course_info.xpath('@href').extract()

            if(len(course_id) != 0):
                course_id = course_id[0].split(" ")[-1]
                link = "{}{}".format(self.base_url, link[0])
                self.courses[course_id] = {'url': link}
        
        for course_id in list(self.courses.keys()):
            url = self.courses[course_id]['url']
            yield scrapy.Request(url, callback = self.parse_info)
        return

    # Parse das páginas das disciplinas
    def parse_info(self, response):
        header = response.xpath("//table//tr//td//b/text()").extract()[0]
        header = header.replace('Disciplina: ', '')
        [course_id, course_name] = header.split(' - ')

        self.courses[course_id].update({'nome': course_name})
        self.courses[course_id].update({'id': course_id})
        self.courses[course_id].update({'requisitos': []})

        url_requisites = "{}{}".format(self.base_url, response.xpath("//tr//td//a[@class='link_gray']/@href").extract()[0])
        yield scrapy.Request(url_requisites, callback = self.parse_requisites)

    # Parse dos pré-requisitos do curso
    def parse_requisites(self, response):
        course_id = response.url[-7:]
        
        requisite_table = response.xpath("//b[contains(text(), '{}')]".format(self.codigo_curso))
        requisite_table = requisite_table.xpath("ancestor::tr[@class='txt_verdana_8pt_gray']")
        siblings = requisite_table.xpath("following-sibling::tr")
        
        # Lendo requisitos específicos do curso pelos siblings da tabela
        for sibling in siblings:
            requisite_fields = sibling.xpath('./td')
            if(len(requisite_fields) != 2):
                #   Pela organização da página, o modo que encontrei de saber quando acabam os
                #   requisitos de um curso e começam os de outro foi pelo número de td's
                break
            else:
                if(len(sibling.xpath("./td/b")) != 0):
                    break
                requisite_code = requisite_fields[0].xpath("text()").extract()[0].split(' ')[0]
                self.courses[course_id]['requisitos'].append(requisite_code)
        
    def closed( self, reason ):
        with open("../data/disciplinas.json", 'w+') as fp:
            json.dump(self.courses, fp)
        return