import Handlebars from 'handlebars'

Handlebars.registerHelper("is", function(context = '', options) {
  const is = context.split(',')
    .map((pageName: string) => pageName.trim())
    .some((pageName: string) => pageName === options.data.root.page_name)

  return is
    ? options.fn(options.data.root)
    : options.inverse(options.data.root)
});
