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

if (!isFileExists(routeFilePath)) {
  console.log(
    chalk.red('routes.yml ファイルが存在しません')
  )
  process.exit(1)
}

Handlebars.registerHelper("get", function(context, options) {
  const data = options.data.root[context] || []
  const newContext = {...options.data.root, [context]: data}
  if (data.length > 0) {
    return options.fn(newContext)
  }
});

fs.readdir(componentsDir, (error, files = []) => {
  files.forEach((file) => {
    Handlebars.registerPartial(file.split('.')[0], fs.readFileSync(`${componentsDir}/${file}`, 'utf8'))
  })

  const pages = yaml.safeLoad(fs.readFileSync(routeFilePath, 'utf8'));
  
  pages.forEach((page: any) => {
    const pageFilePath = `${pagesDir}/${page.page}.yml`
    if (!isFileExists(pageFilePath)) {
      console.log(chalk.yellow(`no such file or directory ${pageFilePath}`))
      return
    }

    const doc = yaml.safeLoad(fs.readFileSync(pageFilePath, 'utf8'));
    const layoutPath = `${layoutDir}/${doc.layout}.hbs`

    if (!isFileExists(layoutPath)) {
      console.log(chalk.yellow(`no such file or directory ${pageFilePath}`))
      return
    }

    const layout = fs.readFileSync(layoutPath, 'utf8')
    const template = Handlebars.compile(layout)

    const sectionTemplates = doc === null || doc === undefined ? [] : doc.sections || [] 
    const sections = sectionTemplates.map((section: string) => {
      const filePath = `${sectionsDir}/${section}.hbs`
      
      if (!isFileExists(filePath)) {
        console.log(
          chalk.yellow(`no such file or directory ${filePath}`)
        )
        return ''
      }

      const sectionTemplate = Handlebars.compile(fs.readFileSync(filePath, 'utf8'))
      const values = doc.values === null ? {} : doc.values || {}
      const sectionValues = values[section] || {}

      try {
        return sectionTemplate(sectionValues)  
      } catch (e) {
        console.error(`Parse error! check this section file ---> ${filePath}`)
        throw e
      }
    }).join('')

    try {
      const values = doc.values || {}
      app.get(page.path, (_, res) => res.send(template({sections, ...values})))
    } catch (e) {
      console.error(chalk.red(`Parse error! check this layout file ---> ${layoutPath}`))
      throw e
    }
  });
  
  app.use('/assets', express.static(publicDir));
  app.listen(port, () => console.log(`LeadGrid simulator listening on port ${port}!`))
})

function isFileExists(filePath: string) {
  try {
    fs.statSync(filePath)
    return true
  } catch (e) {
    return false
  }
}