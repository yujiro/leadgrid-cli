import Handlebars from 'handlebars'

Handlebars.registerHelper("terms", function(context, options) {
  const data = options.data.root[context] || []
  const newContext = {...options.data.root, [context]: data}
  if (data.length > 0) {
    return options.fn(newContext)
  }
});
