import registerHelper from '../registerHelper'

registerHelper("get", function(context: any, options: any) {
  try {
    const data = options.data.root[context] || []
    const newContext = {...options.data.root, [context]: data}
    const hash = options.hash || {}
    const filter = hash.filter || {}
  
    if (data.length > 0) {
      return options.fn(newContext)
    }
  } catch (e) {
    console.log(e)
    return '';
  }
})
