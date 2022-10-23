import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IConfirmForm, IRegisterForm, IMeForm, ILoginForm } from '~/interfaces/users'
import { SuccessfulResponse } from '~/interfaces/responses'

export const state = (): SuccessfulResponse<IMeForm> => ({
  success: true,
  data: undefined
})

export const mutations: MutationTree<SuccessfulResponse<IMeForm>> = {
  setData (state, data) {
    state.data = data.data
    state.success = data.success
  }
}

export const actions: ActionTree<SuccessfulResponse<IMeForm>, any> = {
  async register ({ commit }, data: IRegisterForm) {
    try {
      const response = await this.$axios.post(
        '/api/v1/auth/register',
        data
      )
      commit('setData', response.data)
      return response
    } catch (error) {

    }
  },
  async recover ({ commit }, data: IRegisterForm) {
    try {
      const response = await this.$axios.post(
        '/api/v1/auth/recover',
        data
      )
      commit('setData', response.data)
      return response
    } catch (error) {
    }
  },
  async confirm ({ commit }, data: IConfirmForm) {
    try {
      const response = await this.$axios.post(
        '/api/v1/auth/confirm',
        data
      )
      commit('setData', response.data)
      return response
    } catch (error) {
    }
  },
  async login ({ commit }, data: ILoginForm) {
    try {
      const response = await this.$axios.post(
        '/api/v1/auth/login',
        data
      )
      commit('setData', response.data)
      return response
    } catch (error) {}
  }
}

export const getters: GetterTree<SuccessfulResponse<IMeForm>, any> = {
  data: state => state.data
}
