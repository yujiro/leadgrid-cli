import Handlebars from 'handlebars'

Handlebars.registerHelper("pagination", function(options) {
  const template = Handlebars.compile("{{> pagination }}")
  return new Handlebars.SafeString(template({
    ...options,
    prev: 2,
    next: 4,
    pages: [
      {page: 1, active: false},
      {page: 2, active: false},
      {page: 3, active: true},
      {page: 4, active: false},
      {page: 5, active: false},
    ],
  }))
})
