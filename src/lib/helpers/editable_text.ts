import Handlebars from 'handlebars'
import * as dot from 'dot-object'

Handlebars.registerHelper("editable_text", function(context, options) {
  return dot.pick(context, options['data']['root']);
});
