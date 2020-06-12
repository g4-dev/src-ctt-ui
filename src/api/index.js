import axios from 'axios'
import { getToken, setToken } from '../utils/token'

const singleton = Symbol('apiCtt')
const singletonEnforcer = Symbol('apiCttEnforcer')
console.log(getToken())

class ApiService {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton')
    }

    this.session = axios.create({
      baseURL: `${process.env.VUE_APP_API}`,
      //withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken('token')}`,
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

  async checkLogin() {
    return { data: await this.get('/'), token: getToken() }
  }

  async auth({ name, token }) {
    const payload = await this.post('login', {
      token: token,
      name: name,
    })

    setToken(payload.data.token)
    this.session.defaults.headers.Authorization = `Bearer ${payload.data.token}`

    return payload
  }
}

export default ApiService.instance
