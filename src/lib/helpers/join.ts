import Handlebars from 'handlebars'

Handlebars.registerHelper("join", function(context = [], options) {
  return context.join(options['hash']['separator'] || '')
});
