const yaml = require('js-yaml');
const fs   = require('fs');
const Handlebars = require('handlebars');

const doc = yaml.safeLoad(fs.readFileSync('./example/pages/top.yml', 'utf8'));

const layoutName = doc.layout

const layout = fs.readFileSync(`./example/layouts/${layoutName}.hbs`, 'utf8')

const template = Handlebars.compile(layout);
const html = template({sections: '<test>aaa</test>'});

console.log({ html })
fs.writeFileSync("example/dist/top.html", html)
