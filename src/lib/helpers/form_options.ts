import Handlebars from 'handlebars'
import registerHelper from '../registerHelper'

registerHelper("form_options", function(name: string, values: any[], options: any) {
  const html = values.map((option) => `<option value="${option.value}">${option.label}</option>`).join('')
  return new Handlebars.SafeString(html)
})
