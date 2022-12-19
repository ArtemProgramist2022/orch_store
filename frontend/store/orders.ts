import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Order } from '../interfaces/orders'
import { SuccessfulResponse } from '../interfaces/responses'

export const state = (): SuccessfulResponse<Order[]> => ({
  success: false,
  items: []
})

export const mutations: MutationTree<SuccessfulResponse<Order[]>> = {
  setData (state, data) {
    state.items = data.data
    state.success = data.success
  },
  addItem (state, item){
    state.items.push(item)
  },
  editItem (state, data: Order) {
    const index = state.items.findIndex((item) => item.id === data.id)
    if (index === -1) return
    state.items[index] = data
  }
}

export const actions: ActionTree<SuccessfulResponse<Order[]>, any> = {
  getOrders ({ commit }) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.get('/api/v1/orders/')
      .then((response) => {
        commit('setData', response.data)
        resolve(response.data.data)
      })
      .catch((error) => reject(error))
    })
  },
  addOrder ({ commit }, data: Omit<Order, 'id'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.post('/api/v1/orders/', data)
      .then((response) => {
        commit('addItem', response.data.data)
        resolve(response.data.data)
      })
      .catch((error) => reject(error))
    })
  },
  updateOrder ({ commit }, data: Order) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.post(`/api/v1/orders/${data.id}`, data)
      .then((response) => {
        commit('editItem', response.data.data)
        resolve(response.data.data)
      })
      .catch((error) => reject(error))
    })
  },
}

export const getters: GetterTree<SuccessfulResponse<Order[]>, any> = {
  items: state => state.items,
  success: state => state.success
}
