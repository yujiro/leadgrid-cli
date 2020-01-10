import Handlebars from 'handlebars'

Handlebars.registerHelper('equals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(options['root']) : options.inverse(options['root']);
});