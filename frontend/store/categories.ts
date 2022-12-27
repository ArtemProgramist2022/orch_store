import { Message } from 'element-ui'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { CategoryItem } from '../interfaces/categories'
import { SuccessfulResponse } from '../interfaces/responses'

export const state = (): SuccessfulResponse<CategoryItem[]> => ({
  success: false,
  items: [],
  loading: false
})

export const mutations: MutationTree<SuccessfulResponse<CategoryItem[]>> = {
  setData (state, data) {
    state.items = data.data
    state.success = data.success
  },
  addItem (state, item){
    state.items.push(item)
  },
  editItem (state, data: CategoryItem) {
    const index = state.items.findIndex((item) => item.id === data.id)
    if (index === -1) return
    state.items.splice(index, 1, data)
  },
  deleteItem (state, data: CategoryItem) {
    const index = state.items.findIndex((item) => item.id === data.id)
    if (index === -1) return
    state.items.splice(index, 1)
  },
  changeLoading (state, status: boolean) {
    state.loading = status
  },
}

export const actions: ActionTree<SuccessfulResponse<CategoryItem[]>, any> = {
  getCategories ({ commit }) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.get('/api/v1/categories')
      .then((response) => {
        commit('setData', response.data)
        resolve(response.data.data)
      })
      .catch((error) => reject(error))
    })
  },
  addCategory ({ commit }, data: Omit<CategoryItem, 'id'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.post('/api/v1/categories', data)
      .then((response) => {
        commit('addItem', response.data.data)
        Message.success('Категория успешно создана')
        resolve(response.data.data)
      })
      .catch((error) => {
        Message.error('Произошла ошибка при создании категории')
        reject(error)
      })
    })
  },
  updateCategory ({ commit }, data: CategoryItem) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.post(`/api/v1/categories/${data.id}`, data)
      .then((response) => {
        commit('editItem', response.data.data)
        Message.success('Категория успешно обновлена')
        resolve(response.data.data)
      })
      .catch((error) => {
        Message.error('Произошла ошибка при обновлении категории')
        reject(error)
      })
    })
  },
  deleteCategory ({ commit }, data: Pick<CategoryItem, 'id'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.delete(`/api/v1/categories/${data.id}`)
      .then((response) => {
        commit('deleteItem', response.data.data)
        Message.success('Категория успешно удалена')
        resolve(response.data.data)
      })
      .catch((error) => {
        Message.error('Произошла ошибка при удалении категории')
        reject(error)
      })
    })
  },
  changeLoading ({ commit }, status) {
    commit('changeLoading', status)
  }
}

export const getters: GetterTree<SuccessfulResponse<CategoryItem[]>, any> = {
  items: state => state.items,
  success: state => state.success,
  loading: state => state.loading,
}
