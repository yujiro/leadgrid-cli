import Handlebars from 'handlebars'

Handlebars.registerHelper("post", function(options) {
  return options.fn({...options.data.root, ...options.data.root.post})
});
