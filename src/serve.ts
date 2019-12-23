import * as express from 'express'
import * as yaml from 'js-yaml'
import * as fs from 'fs'
import Handlebars from 'handlebars'
import * as figlet from 'figlet'
import * as chalk from 'chalk'

const rootDir = process.cwd()
const pagesDir = `${rootDir}/pages`
const layoutDir = `${rootDir}/layouts`
const sectionsDir = `${rootDir}/sections`
const componentsDir = `${rootDir}/components`
const routeFilePath = `${rootDir}/routes.yml`
const publicDir = `${rootDir}/assets`

console.log(
  chalk.yellow(
    figlet.textSync('LeadGrid', { horizontalLayout: 'full' })
  )
);

const app = express()

fs.readdir(componentsDir, (error, files = []) => {
  files.forEach((file) => {
    Handlebars.registerPartial(file.split('.')[0], fs.readFileSync(`${componentsDir}/${file}`, 'utf8'))
  })

  const pages = yaml.safeLoad(fs.readFileSync(routeFilePath, 'utf8'));
  
  pages.forEach((page: any) => {
    const doc = yaml.safeLoad(fs.readFileSync(`${pagesDir}/${page.page}.yml`, 'utf8'));
    const layout = fs.readFileSync(`${layoutDir}/${doc.layout}.hbs`, 'utf8')
    const template = Handlebars.compile(layout)
    const sections = doc.sections.map((section: string) => {
      const sectionTemplate = Handlebars.compile(fs.readFileSync(`${sectionsDir}/${section}.hbs`, 'utf8'))
      return sectionTemplate({})
    }).join('')
  
    const html = template({sections});
  
    app.get(page.path, (_, res) => res.send(html))
  });
  

  app.use('/assets', express.static(publicDir));
  app.listen(3000, () => console.log('LeadGrid simulator listening on port 3000!'))
})
