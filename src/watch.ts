import * as renderer from './lib/renderer'
import * as system from './lib/system'
import * as page from './lib/page'
import config from './config'
import Server from './lib/server'

system.exitIfFileNotExists(config.dirs.configFilePath, 'error', 1)

const server = new Server()

server.staticRoute('/assets', config.dirs.publicDir)

config.routes.forEach((route: {page: string, path: string}) => {
  server.route(route.path, renderer.render(config, page.loadPageConfig(config, route.page)))
});

Object.entries(config.post_types).map((postType: any) => {
  const [key, value] = postType
  server.route(`/${key}`, renderer.render(config, page.loadPageConfig(config, value.list)))
  server.route(`/${key}/*`, renderer.render(config, page.loadPageConfig(config, value.detail)))
})

server.start(config.port)
