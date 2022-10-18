import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { SuccessfulResponse, IListResponse } from '../interfaces/responses'
import {IStuff, IStuffGetParams} from '../interfaces/stuff'



export const state = (): IListResponse<IStuff> => ({
    total: 0,
    limit: 20,
    page: 1,
    items: [],
    loading: false
})


export const mutations: MutationTree<IListResponse<IStuff>> = {
    setData(state, data) {
        state.total = data.total
        state.limit = data.limit
        state.page = data.page
        state.items = data.items
    }
}

export const actions: ActionTree<IListResponse<IStuff>, any> = {
    async fetchStuff({commit, state }, params: IStuffGetParams){
        try {
            const defaultParams = { limit: state.limit, page:state.page}
            const totalParams = Object.assign({}, {...defaultParams, ...params})
            const response = await this.$axios.get(
                `/api/v1/stuff/`,
                {params: totalParams}
            )
            commit('setData', response.data.data)
        } catch (error) {
            return error
        }
    }
}

export const getters: GetterTree<IListResponse<IStuff>, any> = {
    items: state => state.items,
    limit: state => state.limit,
    total: state => state.total,
    page: state => state.page
}