import * as express from 'express'
import * as yaml from 'js-yaml'
import * as fs from 'fs'
import Handlebars from 'handlebars'

const rootDir = './example'
const partsDir = `${rootDir}/parts`
const app = express()

fs.readdir(partsDir, (error, files) => {
  files.forEach((file) => {
    Handlebars.registerPartial(file.split('.')[0], fs.readFileSync(`${partsDir}/${file}`, 'utf8'))
  })

  const pages = yaml.safeLoad(fs.readFileSync(`${rootDir}/routes.yml`, 'utf8'));
  
  pages.forEach((page: any) => {
    const doc = yaml.safeLoad(fs.readFileSync(`${rootDir}/pages/${page.page}.yml`, 'utf8'));
    const layout = fs.readFileSync(`${rootDir}/layouts/${doc.layout}.hbs`, 'utf8')
    const template = Handlebars.compile(layout)
    const sections = doc.sections.map((section: string) => {
      const sectionTemplate = Handlebars.compile(fs.readFileSync(`${rootDir}/sections/${section}.hbs`, 'utf8'))
      return sectionTemplate({name: 'test'})
    }).join('')
  
    const html = template({sections});
  
    app.get(page.path, (_, res) => res.send(html))
  });
  
  app.listen(3000, () => console.log('Example app listening on port 3000!'))
})
