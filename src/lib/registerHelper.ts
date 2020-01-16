import Handlebars from 'handlebars'

export default (name: string, callback: any) => {
  return Handlebars.registerHelper(name, (...args) => {
    try {
      const res = callback(...args)
      return res
    } catch (e) {
      return ''
    }
  })
}
