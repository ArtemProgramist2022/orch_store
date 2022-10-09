import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { ICategory } from '../interfaces/categories'
import { SuccessfulResponse } from '../interfaces/responses'


export const state = (): SuccessfulResponse<Array<ICategory>> => ({
    success: true,
    data: []
})


export const mutations: MutationTree<SuccessfulResponse<Array<ICategory>>> = {
    setData(state, data) {
        state.data = data.data
        state.success = data.success
    }
}

export const actions: ActionTree<SuccessfulResponse<Array<ICategory>>, any> = {
    async fetchCategories({commit}){
        try {
            const response = await this.$axios.get(
                '/api/v1/categories'
            )
            commit('setData', response.data)
            return response
        } catch (error) {
            
        }
    }
}

export const getters: GetterTree<SuccessfulResponse<Array<ICategory>>, any> = {
    getCategories(state) {
        return state.data
    }
}