#!/usr/bin/env node

var nodemon = require('nodemon');
var figlet = require('figlet')
var chalk = require('chalk')

console.log(
  chalk.yellow(
    figlet.textSync('LeadGrid', { horizontalLayout: 'full' })
  )
);

nodemon({
  script: __dirname + '/../dist/serve.js',
  ext: 'js json ts hbs yml js css'
});

nodemon.on('start', function () {
  console.log('LeadGrid has started');
}).on('quit', function () {
  console.log('LeadGrid has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('LeadGrid restarted due to: ', files);
});