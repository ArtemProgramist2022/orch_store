import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { ConfirmForm, RegisterForm, MeForm, LoginForm } from '~/interfaces/users'
import { SuccessfulDataResponse } from '~/interfaces/responses'
import { Message } from 'element-ui'

export const state = (): null => null

export const mutations: MutationTree<SuccessfulDataResponse<MeForm | null>> = {}

export const actions: ActionTree<SuccessfulDataResponse<MeForm | null>, any> = {
  register (_, data: RegisterForm) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/auth/register', data)
      .then((response) => {
        Message.success('Код подтверждения был отправлен на ваш email')
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  recover (_, data: Pick<ConfirmForm, 'email'>) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/auth/recover', data)
      .then((response) => {
        Message.success('Код подтверждения был отправлен на ваш email')
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  confirm (_, data: ConfirmForm & { noMessage?: boolean }) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/auth/confirm', data)
      .then((response) => {
        !data.noMessage && Message.success('Вход в систему прошел успешно')
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  login (_, data: LoginForm) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/auth/login', data)
      .then((response) => {
        Message.success('Авторизация прошла успешно')
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
}

export const getters: GetterTree<null, any> = {}
