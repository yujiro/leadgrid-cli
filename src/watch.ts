import * as renderer from './lib/renderer'
import * as system from './lib/system'
import * as page from './lib/page'
import config from './config'
import Server from './lib/server'

system.exitIfFileNotExists(config.dirs.configFilePath, 'error', 1)

const server = new Server()

server.staticRoute('/assets', config.dirs.publicDir)

config.routes.forEach((route: {page: string, path: string}) => {
  const pageConfig = {...page.loadPageConfig(config, route.page), site: config.dummy.site}
  server.route(route.path, renderer.render(config, route.page, pageConfig))
});

Object.entries(config.post_types).map((postType: any) => {
  const [key, value] = postType

  const listPageConfig = {...page.loadPageConfig(config, value.list), site: config.dummy.site}
  server.route(`/${key}`, renderer.render(config, value.list, listPageConfig))

  const detailPageConfig = {...page.loadPageConfig(config, value.detail), site: config.dummy.site}
  server.route(`/${key}/*`, renderer.render(config, value.detail, detailPageConfig))
})

server.start(config.port)
