import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { GetParams } from '~/interfaces/common'
import { ListResponse } from '../interfaces/responses'
import { User } from '../interfaces/users'

export const state = (): ListResponse<User> => ({
  total: 0,
  limit: 20,
  page: 1,
  items: []
})

export const mutations: MutationTree<ListResponse<User>> = {
  setData (state, data) {
    state.items = data.data.items
    state.limit = data.data.limit
    state.page = data.data.page
    state.total = data.data.total
  },
  addItem (state, item){
    state.items.push(item)
  },
  deleteItem (state, data: User) {
    const index = state.items.findIndex((item) => item.id === data.id)
    if (index === -1) return
    state.items.splice(index, 1)
  }
}

export const actions: ActionTree<ListResponse<User>, any> = {
  getUsers ({ commit }, params?: Pick<GetParams, 'page'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.get('/api/v1/users', { params })
      .then((response) => {
        commit('setData', response.data)
        resolve(response.data.data)
      })
      .catch((error) => reject(error))
    })
  },
  getUser ({ commit }, params: Pick<User, 'id'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.get(`/api/v1/users/${params.id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
    })
  }
}

export const getters: GetterTree<ListResponse<User>, any> = {
  items: state => state.items,
  limit: state => state.limit,
  total: state => state.total,
  page: state => state.page,
}
