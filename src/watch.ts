import * as express from 'express'
import * as yaml from 'js-yaml'
import * as fs from 'fs'
import Handlebars from 'handlebars'
import * as chalk from 'chalk'
import * as dot from 'dot-object'

const rootDir = process.cwd()
const pagesDir = `${rootDir}/pages`
const layoutDir = `${rootDir}/layouts`
const sectionsDir = `${rootDir}/sections`
const componentsDir = `${rootDir}/components`
const configFilePath = `${rootDir}/leadgrid.yml`
const publicDir = `${rootDir}/assets`
const port = 5000

const app = express()

if (!isFileExists(configFilePath)) {
  console.log(
    chalk.red('leadgrid.yml ファイルが存在しません')
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

Handlebars.registerHelper("terms", function(context, options) {
  const data = options.data.root[context] || []
  const newContext = {...options.data.root, [context]: data}
  if (data.length > 0) {
    return options.fn(newContext)
  }
});

Handlebars.registerHelper("img_url", function(context, options) {
  return context;
});

Handlebars.registerHelper("date", function(context, options) {
  return context;
});

Handlebars.registerHelper("editable_text", function(context, options) {
  return dot.pick(context, options['data']['root']);
});

function renderSection(sectionTemplates: Array<any>) {
  return sectionTemplates.map((section: any) => {
    const filePath = `${sectionsDir}/${section.name}.hbs`
    
    if (!isFileExists(filePath)) {
      console.log(
        chalk.yellow(`no such file or directory ${filePath}`)
      )
      return ''
    }

    const sectionTemplate = Handlebars.compile(fs.readFileSync(filePath, 'utf8'))
    const values = section.values === null ? {} : section.values || {}

    try {
      return sectionTemplate(values)  
    } catch (e) {
      console.error(`Parse error! check this section file ---> ${filePath}`)
      throw e
    }
  }).join('')
}

function addRoute(pageRoute: {page: string, path: string}) {
  const pageFilePath = `${pagesDir}/${pageRoute.page}.yml`
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

  const template = Handlebars.compile(fs.readFileSync(layoutPath, 'utf8'))
  const sectionTemplates = doc === null || doc === undefined ? [] : doc.sections || [] 
  const sections = renderSection(sectionTemplates)

  try {
    const values = doc.values || {}
    app.get(pageRoute.path, (_, res) => res.send(template({sections, ...values})))
    console.log(`add route: ${pageRoute.path} - page: ${pageRoute.page}`)
  } catch (e) {
    console.error(chalk.red(`Parse error! check this layout file ---> ${layoutPath}`))
    throw e
  }
}

fs.readdir(componentsDir, (error, files = []) => {
  files.forEach((file) => {
    Handlebars.registerPartial(file.split('.')[0], fs.readFileSync(`${componentsDir}/${file}`, 'utf8'))
  })

  const config = yaml.safeLoad(fs.readFileSync(configFilePath, 'utf8'));
  
  config.routes.forEach((pageRoute: {page: string, path: string}) => {
    addRoute(pageRoute)
  });

  Object.entries(config.post_types).map((postType: any) => {
    const [key, value] = postType
    addRoute({page: value.list, path: `/${key}`})
    addRoute({page: value.detail, path: `/${key}/*`})
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
