import router from '../router'

export function parseMenuFromRouter() {
  let menu = []
  router.options.routes.forEach(({ path, name, meta }) => {
    let res = {}
    if (!meta || !meta.inMenu) {
      return
    }
    res.url = path
    res.title = name
    res.icon = meta.icon || null
    menu.push(res)
  })

  return menu
}
