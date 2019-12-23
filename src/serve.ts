import * as express from 'express'
import * as yaml from 'js-yaml'
import * as fs from 'fs'
import Handlebars from 'handlebars'

const app = express()

const pages = yaml.safeLoad(fs.readFileSync('./example/routes.yml', 'utf8'));

pages.forEach(page => {
  const doc = yaml.safeLoad(fs.readFileSync(`./example/pages/${page.page}.yml`, 'utf8'));
  const layout = fs.readFileSync(`./example/layouts/${doc.layout}.hbs`, 'utf8')
  const template = Handlebars.compile(layout);
  const sections = doc.sections.map((section: string) => fs.readFileSync(`./example/sections/${section}.hbs`, 'utf8')).join('')
  const html = template({sections});

  app.get(page.path, (_, res) => res.send(html))
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

