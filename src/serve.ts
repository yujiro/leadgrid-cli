import * as express from 'express'
import * as yaml from 'js-yaml'
import * as fs from 'fs'
import Handlebars from 'handlebars'
import * as chalk from 'chalk'

const rootDir = process.cwd()
const pagesDir = `${rootDir}/pages`
const layoutDir = `${rootDir}/layouts`
const sectionsDir = `${rootDir}/sections`
const componentsDir = `${rootDir}/components`
const routeFilePath = `${rootDir}/routes.yml`
const publicDir = `${rootDir}/assets`
const port = 5000

const app = express()

fs.readdir(componentsDir, (error, files = []) => {
  files.forEach((file) => {
    Handlebars.registerPartial(file.split('.')[0], fs.readFileSync(`${componentsDir}/${file}`, 'utf8'))
  })

  const pages = yaml.safeLoad(fs.readFileSync(routeFilePath, 'utf8'));
  
  pages.forEach((page: any) => {
    const doc = yaml.safeLoad(fs.readFileSync(`${pagesDir}/${page.page}.yml`, 'utf8'));
    const layoutPath = `${layoutDir}/${doc.layout}.hbs`
    const layout = fs.readFileSync(layoutPath, 'utf8')
    const template = Handlebars.compile(layout)

    const sections = doc.sections.map((section: string) => {
      const filePath = `${sectionsDir}/${section}.hbs`
      const sectionTemplate = Handlebars.compile(fs.readFileSync(filePath, 'utf8'))

      try {
        return sectionTemplate({})  
      } catch (e) {
        console.error(`Parse error! check this section file ---> ${filePath}`)
        throw e
      }
    }).join('')
  
    try {
      const html = template({sections});
  
      app.get(page.path, (_, res) => res.send(html))
    } catch (e) {
      console.error(chalk.red(`Parse error! check this layout file ---> ${layoutPath}`))
      throw e
    }
  });
  
  app.use('/assets', express.static(publicDir));
  app.listen(port, () => console.log(`LeadGrid simulator listening on port ${port}!`))
})
