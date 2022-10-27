import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { SuccessfulResponse } from '../interfaces/responses'
import { ICartItem, INewCartItem, IUpdateCartItem } from '@/interfaces/cart'

export const state = (): SuccessfulResponse<Array<ICartItem>> => ({
  success: false,
  data: []
})

export const mutations: MutationTree<SuccessfulResponse<Array<ICartItem>>> = {
  setData (state, data) {
    state.data = data.data
    state.success = data.success
  },
  addItem (state, data) {
    state.data?.push(data.data)
    state.success = data.success
  },
  updateItem (state, item: ICartItem) {

  },
  dropItem (state, data: ICartItem) {
    const filteredItems = state.data?.filter((item: ICartItem) => item.id === data.id)[0]
    let index = -1
    if (filteredItems) {
      let finded_index = state.data?.indexOf(filteredItems)
      if (finded_index){
        index = finded_index
      } 
    }
    if (index !== -1) {
      state.data?.splice(index, 1)
    }

  }
}

export const actions: ActionTree<SuccessfulResponse<Array<ICartItem>>, any> = {
  async fetchCart ({ commit }) {
    try {
      const response = await this.$axios.get(
        '/api/v1/cart/'
      )
      commit('setData', response.data)
      return response
    } catch (error) {
      return error
    }
  },
  async addStuffToCart ({ commit }, data: INewCartItem) {
    try {
      const response = await this.$axios.post(
        '/api/v1/cart/',
        data
      )
      commit('addItem', response.data)
    } catch (error) {

    }
  },
  async deleteItemFromCart({commit}, cart_id: number){
    try {
      const response = await this.$axios.$delete(
        `/api/v1/cart/${cart_id}`
      )
      commit('dropItem', response.data)
    } catch (error) {
      
    }
  }
}

export const getters: GetterTree<SuccessfulResponse<Array<ICartItem>>, any> = {
  data: state => state.data,
  success: state => state.success
}
