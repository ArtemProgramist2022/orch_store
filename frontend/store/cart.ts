import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { SuccessfulResponse } from '../interfaces/responses'
import { CartItem } from '@/interfaces/cart'
import { Message } from 'element-ui'

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
    state.items.splice(index, 1, data)
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
      await this.$axios.get('/api/v1/cart/')
      .then((response) => {
        commit('setData', response.data)
        resolve(response.data.data)
      })
      .catch((error) => reject(error))
    })
  },
  addItemToCart ({ commit }, data: Pick<CartItem, 'stuff_id' | 'stuff_count'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.post('/api/v1/cart/', data)
      .then((response) => {
        commit('addItem', response.data.data)
        Message.success('Товар успешно добавлен в корзину')
        resolve(response.data.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  updateCountItemInCart ({ commit }, data: Pick<CartItem, 'stuff_count' | 'id'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.post(`/api/v1/cart/${data.id}`, data)
      .then((response) => {
        commit('editItem', response.data.data)
        resolve(response.data.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  deleteItemFromCart ({ commit }, data: Pick<CartItem, 'id'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.delete(`/api/v1/cart/${data.id}`)
      .then((response) => {
        commit('deleteItem', response.data.data)
        Message.success('Товар успешно удален из корзины')
        resolve(response.data.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
}

export const getters: GetterTree<SuccessfulResponse<CartItem[]>, any> = {
  items: state => state.items,
  success: state => state.success
}
