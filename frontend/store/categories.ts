import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { ICategory } from '../interfaces/categories'
import { SuccessfulResponse } from '../interfaces/responses'

export const state = (): SuccessfulResponse<Array<ICategory>> => ({
  success: false,
  data: []
})

export const mutations: MutationTree<SuccessfulResponse<Array<ICategory>>> = {
  setData (state, data) {
    state.data = data.data
    state.success = data.success
  },
  addItem (state, data){
    state.data?.push(data.data)
  },
  dropCategory (state, data){
    const filteredItems = state.data?.filter((item: ICategory) => item.id === data.id)[0]
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

export const actions: ActionTree<SuccessfulResponse<Array<ICategory>>, any> = {
  async fetchCategories ({ commit }) {
    try {
      const response = await this.$axios.get(
        '/api/v1/categories'
      )
      commit('setData', response.data)
    } catch (error) {
      return error
    }
  },
  async addNewCategory ({ commit}, name:string){
    try {
      const response = await this.$axios.post(
        '/api/v1/categories',
        {
          name
        }
      )
      commit('addItem', response.data)
    }
    catch (error){
      return error
    }
  },
  async dropCategory({commit}, category_id: number){
    try {
      const response = await this.$axios.delete(
        `/api/v1/categories/${category_id}`
      )
      commit('dropCategory', response.data.data)
    } catch (error) {
      
    }
  }
}

export const getters: GetterTree<SuccessfulResponse<Array<ICategory>>, any> = {
  data: state => state.data,
  success: state => state.success
}
