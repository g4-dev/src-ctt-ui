import { setToken } from './token'
import api from '@/api'
import store from '@/store'

export default async function () {
  try {
    const { data, token } = await api.checkLogin()
    if (!token && data.status !== 200) {
      throw new Error('Missing or Bad token')
    }
    store.commit('auth/login', { data, token })
    return true
  } catch (e) {
    setToken(null)
    store.commit('auth/logout')
    return false
  }
}
