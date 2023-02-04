<template>
  <div :class="{
    'profile-page': true,
    'mobile-profile-page': !$device.isDesktop,
  }">
    <h2 class="page__header">{{ $auth.user.name }}</h2>
    <div class="profile-page__info-item">
      Email: {{ $auth.user.email }}
    </div>
    <div v-if="$auth.user.is_admin" class="profile-page__info-item">
      Права администратора: Есть
    </div>
    <div class="profile-page__main">
      <h3 class="page__header-h3">
        Активные заказы
      </h3>
      <div class="profile-page__orders">
        <order-item
          v-for="order in activeOrders"
          :key="order.id"
          :order="order"
          :cutStyle="true"
        />
        <el-empty v-if="!activeOrders.length" description="Нет активных заказов"></el-empty>
      </div>
    </div>
    <el-col class="profile-page__actions">
      <el-button
        size="small"
        @click="changeRecoverFormState()"
      >
        Сменить пароль
      </el-button>
      <el-button
        type="danger"
        size="small"
        @click="$auth.logout()"
      >
        Выйти
      </el-button>
    </el-col>
    <el-dialog
      title="Смена пароля"
      :visible.sync="showRecoverForm"
    >
      <el-form
        ref="recoverForm"
        :model="recoverForm"
        :rules="recoverRules"
        size="small"
        label-position="top"
        @submit.native.prevent="!showCode ? sendCode() : submitRecoverForm()"
      >
        <el-form-item
          label="Email"
          prop="email"
        >
          <el-input
            v-model="recoverForm.email"
            placeholder="Укажите email"
            :disabled="showCode"
          />
        </el-form-item>
        <el-form-item
          v-if="showCode"
          label="Код подтверждения"
          prop="code"
        >
          <el-input
            v-model="recoverForm.code"
            placeholder="Код подтверждения"
          />
        </el-form-item>
        <el-form-item>
          <el-col class="flex-center">
            <el-button
              v-if="!showCode"
              type="primary"
              size="small"
              @click="sendCode"
            >
              {{ $device.isDesktop ? 'Выслать код подтверждения' : 'Выслать код' }}
            </el-button>
            <el-button
              v-else
              type="primary"
              native-type="submit"
              size="small"
            >
              Войти
            </el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Action, Component, Getter, Ref, Vue } from 'nuxt-property-decorator'
import { Order, OrderStatus } from '~/interfaces/orders'
import OrderItem from '~/components/OrderItem.vue'
import { validateEmail } from '~/utils/validate'
import { ElForm } from 'element-ui/types/form'
import { SuccessfulDataResponse } from '~/interfaces/responses'
import { ConfirmForm, MeForm } from '~/interfaces/users'
import { Message } from 'element-ui'

@Component({
  layout: 'main',
  transition: 'slide-bottom',
  components: {
    OrderItem
  }
})
export default class ProfilePage extends Vue {
  
  @Ref('recoverForm') recoverFormRef!: ElForm

  @Getter('orders/items') orders!: Order[]

  @Action('authUser/recover') recoverUser!: (data: Pick<ConfirmForm, 'email'>) => Promise<SuccessfulDataResponse<MeForm | null>>
  @Action('authUser/confirm') confirmUser!: (data: ConfirmForm & { noMessage: boolean }) => Promise<SuccessfulDataResponse<MeForm | null>>

  get activeOrders () {
    return this.orders
    .filter((order) => order.status !== OrderStatus.DONE)
  }

  loading = false
  showCode = false
  showRecoverForm = false
  recoverForm = this.getDefaultRecoverForm()
  recoverRules = {
    email: [
      { required: true, validator: this.validateEmail, trigger: 'blur' }
    ],
    code: [
      { required: true, message: 'Укажите код подтверждения', trigger: 'blur' },
    ]
  }

  validateEmail (_rule: Object, value: string, callback: Function) {
    validateEmail(value, callback)
  }

  changeRecoverFormState () {
    this.recoverForm = this.getDefaultRecoverForm()
    this.showRecoverForm = true
    this.showCode = false
  }

  getDefaultRecoverForm () {
    return {
      email: '',
      code: ''
    }
  }

  confirm () {
    this.loading = true
    this.confirmUser({ ...this.recoverForm, noMessage: true })
    .then((response) => {
        if (response.data) {
          this.$auth.setUser(response.data.me)
          this.$auth.setUserToken(response.data.token)
          this.changeRecoverFormState()
          this.showRecoverForm = false
          Message.success('Пароль успешно изменен')
        }
      })
      .catch(() => {
        Message.error('Произошла ошибка при смене пароля')
      })
      .finally(() => {
        this.loading = false
      })
  }

  recover () {
    this.loading = true
    const params = {
      email: this.recoverForm.email,
    }
    this.recoverUser(params)
    .then(() => {
      this.showCode = true
    }).finally(() => {
      this.loading = false
    })
  }

  submitRecoverForm () {
    this.recoverFormRef.validate((valid) => valid && this.confirm())
  }

  sendCode () {
    this.recoverFormRef.validate((valid) => {
      if (!valid) return;
      this.recover()
    })
  }
}
</script>