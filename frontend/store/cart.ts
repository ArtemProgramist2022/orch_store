import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { SuccessfulResponse } from '../interfaces/responses'
import { CartItem } from '@/interfaces/cart'

export const state = (): SuccessfulResponse<CartItem[]> => ({
  success: false,
  items: []
})

export const mutations: MutationTree<SuccessfulResponse<CartItem[]>> = {
  setData (state, data) {
    state.items = data.data
    state.success = data.success
  },
  addItem (state, item){
    state.items.push(item)
  },
  editItem (state, data: CartItem) {
    const index = state.items.findIndex((item) => item.id === data.id)
    if (index === -1) return
    state.items[index] = data
  },
  deleteItem (state, data: CartItem) {
    const index = state.items.findIndex((item) => item.id === data.id)
    if (index === -1) return
    state.items.splice(index, 1)
  }
}

export const actions: ActionTree<SuccessfulResponse<CartItem[]>, any> = {
  getCart ({ commit }) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.get('/api/v1/cart')
      .then((response) => {
        commit('setData', response.data)
        resolve(response.data)
      })
      .catch((error) => reject(error))
    })
  },
  addCart ({ commit }, data: Pick<CartItem, 'stuff_id' | 'stuff_count'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.post('/api/v1/cart', data)
      .then((response) => {
        commit('addItem', response.data.data)
        resolve(response.data.data)
      })
      .catch((error) => reject(error))
    })
  },
  updateCart ({ commit }, data: Pick<CartItem, 'stuff_count' | 'id'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.post(`/api/v1/cart/${data.id}`, data)
      .then((response) => {
        commit('editItem', response.data.data)
        resolve(response.data.data)
      })
      .catch((error) => reject(error))
    })
  },
  deleteCart ({ commit }, data: Pick<CartItem, 'id'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.delete(`/api/v1/cart/${data.id}`)
      .then((response) => {
        commit('deleteItem', response.data.data)
        resolve(response.data.data)
      })
      .catch((error) => reject(error))
    })
  },
}

export const getters: GetterTree<SuccessfulResponse<CartItem[]>, any> = {
  items: state => state.items,
  success: state => state.success
}
