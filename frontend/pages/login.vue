<template>
  <el-col :span="24" class="auth-page">
    <el-col :span="12">
      <h3 class="auth-page__name">Авторизация</h3>
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
          />
        </el-form-item>
        <el-col class="flex-center">
          <el-button
            type="primary"
            native-type="submit"
            size="mini"
          >
            Войти
          </el-button>
        </el-col>
      </el-form>
      <el-col :span="24" style="padding-top: 15px;">
        <div class="text-center" style="padding-bottom: 10px;">
          <el-link
            :underline="false"
            @click="$router.push('/signup')"
          >
            Зарегистрироваться
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
import { Component, Vue, Ref } from 'nuxt-property-decorator'
import { ElForm } from 'element-ui/types/form'
import { LoginForm } from '~/interfaces/users'
import { validateEmail } from '~/utils/validate'
import { Message } from 'element-ui'

@Component({
  auth: 'guest',
  layout: 'auth',
  transition: 'slide-bottom',
})
export default class IndexLogin extends Vue {
  @Ref('form') formRef!: ElForm

  form: LoginForm = {
    email: '',
    password: ''
  }
  rulesForm = {
    email: [
      { required: true, validator: this.validateEmail, trigger: 'blur' },
    ],
    password: [
      { required: true, message: 'Укажите пароль', trigger: 'blur' }
    ]
  }
  loading = false

  login () {
    this.loading = true
    const data = {
      data: this.form
    }
    this.$auth.loginWith('customStrategy', data)
    .then(() => {
      Message.success('Авторизация прошла успешно')
      this.$router.push('/')
    })
    .catch(() => {
      Message.error('Произошла ошибка при входе в систему')
    })
    .finally(() => this.loading = false)
  }

  submitForm () {
    this.formRef.validate((valid) => valid && this.login())
  }

  validateEmail (_rule: Object, value: string, callback: Function) {
    validateEmail(value, callback)
  }
}
</script>