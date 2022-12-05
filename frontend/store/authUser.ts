import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { ConfirmForm, RegisterForm, MeForm, LoginForm } from '~/interfaces/users'
import { SuccessfulDataResponse } from '~/interfaces/responses'

export const state = (): SuccessfulDataResponse<MeForm | null> => ({
  success: true,
  data: null
})

export const mutations: MutationTree<SuccessfulDataResponse<MeForm | null>> = {
  setData (state, data) {
    state.data = data.data
    state.success = data.success
  }
}

export const actions: ActionTree<SuccessfulDataResponse<MeForm | null>, any> = {
  register ({ commit }, data: RegisterForm) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/auth/register', data)
      .then((response) => {
        commit('setData', response.data)
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  recover ({ commit }, data: RegisterForm) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/auth/recover', data)
      .then((response) => {
        commit('setData', response.data)
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  confirm ({ commit }, data: ConfirmForm) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/auth/confirm', data)
      .then((response) => {
        commit('setData', response.data)
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  login ({ commit }, data: LoginForm) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/auth/login', data)
      .then((response) => {
        commit('setData', response.data)
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
}

export const getters: GetterTree<SuccessfulDataResponse<MeForm | null>, any> = {
  data: state => state.data,
  success: state => state.success
}
