<template>
  <el-col :span="24" class="auth-page">
    <el-col :span="12">
      <h3 class="auth-page__name">Регистрация</h3>
      <el-form
        ref="form"
        :model="form"
        :rules="rulesForm"
        label-position="top"
        size="mini"
        @submit.native.prevent="submitForm"
      >
        <el-form-item
          label="Email"
          prop="email"
        >
          <el-input
            v-model="form.email"
            placeholder="Укажите email"
            :disabled="showCode"
          />
        </el-form-item>
        <el-form-item
          label="Логин"
          prop="name"
        >
          <el-input
            v-model="form.name"
            placeholder="Укажите логин"
            :disabled="showCode"
          />
        </el-form-item>
        <el-form-item
          label="Пароль"
          prop="password"
        >
          <el-input
            v-model="form.password"
            placeholder="Укажите пароль"
            show-password
            :disabled="showCode"
          />
        </el-form-item>
        <el-form-item
          label="Повторите пароль"
          prop="confirmPassword"
        >
          <el-input
            v-model="form.confirmPassword"
            placeholder="Подтвердите пароль"
            show-password
            :disabled="showCode"
          />
        </el-form-item>
        <el-form-item
          v-if="showCode"
          label="Код подтверждения"
          prop="code"
        >
          <el-input
            v-model="form.code"
            placeholder="Код подтверждения"
          />
        </el-form-item>
        <el-col class="flex-center">
          <el-button
            v-if="!showCode"
            type="primary"
            size="mini"
            @click="sendCode"
          >
            Выслать код подтверждения
          </el-button>
          <el-button
            v-else
            type="primary"
            native-type="submit"
            size="mini"
          >
            Зарегистрироваться
          </el-button>
        </el-col>
      </el-form>
      <el-col :span="24" style="padding-top: 15px;">
        <div class="text-center" style="padding-bottom: 10px;">
          <el-link
            :underline="false"
            @click="$router.push('/login')"
          >
            Авторизация
          </el-link>
        </div>
        <div class="text-center">
          <el-link
            :underline="false"
            @click="$router.push('/recover')"
          >
            Забыли пароль?
          </el-link>
        </div>
      </el-col>
    </el-col>
  </el-col>
</template>
  
<script lang="ts">
import { ElForm } from 'element-ui/types/form'
import { Component, Vue, Ref, Action } from 'nuxt-property-decorator'
import { SuccessfulDataResponse } from '~/interfaces/responses'
import { ConfirmForm, MeForm, RegisterForm } from '~/interfaces/users'
import { validateEmail } from '~/utils/validate'
  
@Component({
  auth: 'guest',
  layout: 'auth',
  transition: 'slide-bottom',
})
export default class SignupPage extends Vue {
  @Ref('form') formRef!: ElForm

  @Action('authUser/register') registerUser!: (data: RegisterForm) => Promise<SuccessfulDataResponse<MeForm | null>>
  @Action('authUser/confirm') confirmUser!: (data: ConfirmForm) => Promise<SuccessfulDataResponse<MeForm | null>>

  form: RegisterForm = this.getDefaultForm();
  rulesForm = {
    email: [
      { required: true, validator: this.validateEmail, trigger: 'blur' }
    ],
    name: [
      { required: true, message: 'Укажите логин', trigger: 'blur' }
    ],
    password: [
      { required: true, message: 'Укажите пароль', trigger: 'blur' }
    ],
    confirmPassword: [
      { required: true, message: 'Укажите пароль еще раз', trigger: 'blur' },
      { validator: this.checkConfirmPassword, trigger: ['change', 'blur'] }
    ],
    code: [
      { required: true, message: 'Укажите код подтверждения', trigger: 'blur' },
    ]
  }
  showCode = false
  loading = false

  checkConfirmPassword (_: Object, value: string, callback: Function) {
    if (value === this.form.password) return callback()
    return callback(new Error('Пароли не совпадают'))
  }

  getDefaultForm (): RegisterForm {
    return {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      code: ''
    }
  }

  beforeDestroy () {
    this.form = this.getDefaultForm()
  }

  validateEmail (_rule: Object, value: string, callback: Function) {
    validateEmail(value, callback)
  }

  confirm () {
    this.loading = true
    const data = {
      email: this.form.email,
      code: this.form.code
    }
    this.confirmUser(data)
    .then((response) => {
        if (response.data) {
          this.$auth.setUser(response.data.me)
          this.$auth.setUserToken(response.data.token)
        }
      }).finally(() => {
        this.loading = false
      })
  }

  register () {
    this.loading = true
    this.registerUser(this.form)
    .then(() => {
      this.showCode = true
    }).finally(() => {
      this.loading = false
    })
  }

  submitForm () {
    this.formRef.validate((valid) => valid && this.confirm())
  }

  sendCode () {
    this.formRef.validate((valid) => {
      if (!valid) return;
      this.register()
    })
  }
}
</script>
  