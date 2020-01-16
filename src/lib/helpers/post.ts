import Handlebars from 'handlebars'

Handlebars.registerHelper("post", function(options) {
  const values = {
    ...options,
    ...options.data.root.post
  }

  return options.fn(values)
});
