import * as yaml from 'js-yaml'
import * as fs from 'fs'

const rootDir = process.cwd()
const configFilePath = `${rootDir}/leadgrid.yml`
const config = yaml.safeLoad(fs.readFileSync(configFilePath, 'utf8'));

export default {
  api_path: {
    theme_update: '/api/page_themes/update'
  },
  dirs: {
    rootDir,
    pagesDir: `${rootDir}/pages`,
    layoutDir: `${rootDir}/layouts`,
    sectionsDir: `${rootDir}/sections`,
    componentsDir: `${rootDir}/components`,
    configFilePath: `${rootDir}/leadgrid.yml`,
    publicDir: `${rootDir}/assets`,
  },
  port: 5000,
  ...config
}
