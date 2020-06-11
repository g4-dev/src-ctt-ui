import axios from 'axios'

const singleton = Symbol('apiCtt')
const singletonEnforcer = Symbol('apiCttEnforcer')

// TODO : use for security (need back end)
// function readCookie(name) {
//   const match = document.cookie.match(
//     new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
//   )
//   return match ? decodeURIComponent(match[3]) : null
// }

class ApiService {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton')
    }

    console.log('API Service for ctt-server')

    this.session = axios.create({
      baseURL: `${process.env.VUE_APP_BASE_URL}/api`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        //'X-CSRFToken': readCookie('csrftoken')
      },
    })
  }

  static get instance() {
    // Try to get an efficient singleton
    if (!this[singleton]) {
      this[singleton] = new ApiService(singletonEnforcer)
    }

    return this[singleton]
  }

  get = (...params) => this.session.get(...params)
  post = (...params) => this.session.post(...params)
  put = (...params) => this.session.put(...params)
  patch = (...params) => this.session.patch(...params)
  remove = (...params) => this.session.delete(...params)

  auth({ name, token }) {
    return this.post(
      'login',
      {},
      {
        auth: {
          token: token,
          name: name,
        },
      }
    )
  }
}

export default ApiService.instance
