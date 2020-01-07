import * as express from 'express'
import * as logger from './logger'

interface Route {
  url: string;
  html: string;
}

interface StaticRoute {
  url: string;
  staticDirPath: string;
}

class Server {
  private routes: Array<Route>;
  private staticRoutes: Array<StaticRoute>;

  constructor() {
    this.routes = []
    this.staticRoutes = []
  }

  public route(url: string, html: string) {
    this.routes.push({url, html})
  }

  public staticRoute(url: string, staticDirPath: string) {
    this.staticRoutes.push({url, staticDirPath})
  }

  public start(port: number) {
    const app = express()

    this.routes.forEach((route: Route) => {
      app.get(route.url, (_, res) => res.send(route.html))
    })

    this.staticRoutes.forEach((route: StaticRoute) => {
      app.use(route.url, express.static(route.staticDirPath));
    })

    app.listen(port, () => logger.info(`LeadGrid simulator listening on port ${port}!`))
  }
}

export default Server