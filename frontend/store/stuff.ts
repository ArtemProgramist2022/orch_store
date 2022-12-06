import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { ListResponse } from '../interfaces/responses'
import { StuffItem } from '../interfaces/stuff'

export const state = (): ListResponse<StuffItem> => ({
  total: 0,
  limit: 20,
  page: 1,
  items: []
})

export const mutations: MutationTree<ListResponse<StuffItem>> = {
  setData (state, data) {
    state = data
  },
  addItem (state, item){
    state.items.push(item)
  },
  deleteItem (state, data: StuffItem) {
    const index = state.items.findIndex((item) => item.id === data.id)
    if (index === -1) return
    state.items.splice(index, 1)
  }
}

export const actions: ActionTree<ListResponse<StuffItem>, any> = {
  getStuff ({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.get('/api/v1/stuff', { params })
      .then((response) => {
        commit('setData', response.data)
        resolve(response.data)
      })
      .catch((error) => reject(error))
    })
  },
  addStuff ({ commit }, data: Omit<StuffItem, 'id'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.post('/api/v1/stuff', data)
      .then((response) => {
        commit('addItem', response.data.data)
        resolve(response.data.data)
      })
      .catch((error) => reject(error))
    })
  },
  deleteStuff ({ commit }, data: Pick<StuffItem, 'id'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.delete(`/api/v1/stuff/${data.id}`)
      .then((response) => {
        commit('deleteItem', response.data.data)
        resolve(response.data.data)
      })
      .catch((error) => reject(error))
    })
  },
}

export const getters: GetterTree<ListResponse<StuffItem>, any> = {
  items: state => state.items,
  limit: state => state.limit,
  total: state => state.total,
  page: state => state.page,
}
