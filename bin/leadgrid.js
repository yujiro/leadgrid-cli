#!/usr/bin/env node

var nodemon = require('nodemon');
var figlet = require('figlet')
var chalk = require('chalk')

console.log(
  chalk.yellow(
    figlet.textSync('LeadGrid', { horizontalLayout: 'full' })
  )
);

require('yargs')
  .command('watch', 'start the server and watch update files', (yargs) => {
    watch()
  })
  .command('deploy', 'deploy files', (yargs) => {
    require('../dist/deploy')
  })
  .argv

function watch() {
  nodemon({
    script: __dirname + '/../dist/watch.js',
    ext: 'js json ts hbs yml js css'
  });
  
  nodemon.on('start', function () {
    
  }).on('quit', function () {
    console.log('LeadGrid has quit');
    process.exit();
  }).on('restart', function (files) {
    console.log('LeadGrid restarted due to: ', files);
  });
}