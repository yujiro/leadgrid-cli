import * as yaml from 'js-yaml'
import * as logger from './logger'
import * as file from './file'

export function loadPageConfig(config: any, pageName: string) {
  const pageFilePath = `${config.dirs.pagesDir}/${pageName}.yml`
  if (!file.isFileExists(pageFilePath)) {
    logger.warning(`no such file or directory ${pageFilePath}`)
    return {}
  }

  return yaml.safeLoad(file.read(pageFilePath));
}

