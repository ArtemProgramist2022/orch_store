import { Message } from 'element-ui'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { GetParams } from '~/interfaces/common'
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
    state.items = data.data.items
    state.limit = data.data.limit
    state.total = data.data.total
    state.page = data.data.page
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
  getStuff ({ commit }, params?: Partial<GetParams> & { category_id?: string }) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.get('/api/v1/stuff/', { params })
      .then((response) => {
        commit('setData', response.data)
        resolve(response.data.data)
      })
      .catch((error) => reject(error))
    })
  },
  addStuff ({ commit }, data: Omit<StuffItem, 'id'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.post('/api/v1/stuff/', data)
      .then((response) => {
        commit('addItem', response.data.data)
        Message.success('Товар успешно создан')
        resolve(response.data.data)
      })
      .catch((error) => {
        Message.error('Произошла ошибка при создании товара')
        reject(error)
      })
    })
  },
  deleteStuff ({ commit }, data: Pick<StuffItem, 'id'>) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.delete(`/api/v1/stuff/${data.id}`)
      .then((response) => {
        commit('deleteItem', response.data.data)
        Message.success('Товар успешно удален')
        resolve(response.data.data)
      })
      .catch((error) => {
        Message.error('Произошла ошибка при удалении товара')
        reject(error)
      })
    })
  },
}

export const getters: GetterTree<ListResponse<StuffItem>, any> = {
  items: state => state.items,
  limit: state => state.limit,
  total: state => state.total,
  page: state => state.page,
}
