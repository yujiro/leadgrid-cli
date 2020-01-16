import Handlebars from 'handlebars'

Handlebars.registerHelper("first", function(list) {
  return  list === null || list === undefined ? undefined : list[0]
})
