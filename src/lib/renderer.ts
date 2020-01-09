import Handlebars from 'handlebars'
import * as logger from './logger'
import * as file from './file'
import './helpers'

export function render(leadGridConfig: any, pageName: string, pageConfig: any) {
  const files = file.readDir(leadGridConfig.dirs.componentsDir)

  files.forEach((f) => {
    Handlebars.registerPartial(f.split('.')[0], file.read(`${leadGridConfig.dirs.componentsDir}/${f}`))
  })

  const layoutPath = `${leadGridConfig.dirs.layoutDir}/${pageConfig.layout}.hbs`

  if (!file.isFileExists(layoutPath)) {
    logger.warning(`no such file or directory ${layoutPath}`)
    return `no such file or directory ${layoutPath}`
  }

  const template = Handlebars.compile(file.read(layoutPath))
  const sectionTemplates = pageConfig === null || pageConfig === undefined ? [] : pageConfig.sections || [] 
  const values = {...(pageConfig.values || {}), page_name: pageName}
  const sections = renderSection(sectionTemplates, leadGridConfig.dirs.sectionsDir, values)

  try {
    return template({sections, ...values})
  } catch (e) {
    const message = `Parse error! check this layout file ---> ${layoutPath}`
    logger.error(message)
    logger.debug(e)
    return message
  }
}

export function renderSection(sectionTemplates: Array<any>, sectionsDir: string, pageValues: any) {
  return sectionTemplates.map((section: any) => {
    const filePath = `${sectionsDir}/${section.name}.hbs`
    
    if (!file.isFileExists(filePath)) {
      logger.warning(`no such file or directory ${filePath}`)
      return ''
    }

    const sectionTemplate = Handlebars.compile(file.read(filePath))
    const values = section.values === null ? {} : section.values || {}

    try {
      return sectionTemplate({...pageValues, ...values})  
    } catch (e) {
      console.error(`Parse error! check this section file ---> ${filePath}`)
      throw e
    }
  }).join('')
}
