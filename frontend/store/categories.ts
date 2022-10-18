import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { ICategory } from '../interfaces/categories'
import { SuccessfulResponse } from '../interfaces/responses'




export const state = (): SuccessfulResponse<Array<ICategory>> => ({
    success: false,
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
        } catch (error) {
            return error
        }
    }
}

export const getters: GetterTree<SuccessfulResponse<Array<ICategory>>, any> = {
    data: state => state.data,
    success: state => state.success
}