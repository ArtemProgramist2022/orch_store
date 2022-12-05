<template>
  <el-col :span="24" class="flex-center">
    <el-col :span="12">
      <h3 class="text-center">Авторизация</h3>
      <el-form
        ref="form"
        :model="form"
        :rules="rulesForm"
        label-position="top"
        size="mini"
        @submit.native.prevent="submitForm"
      >
        <el-form-item
          label="Номер телефона"
          prop="phone"
        >
          <el-input
            v-model="form.phone"
            v-mask="'+7 (###) ### ## ##'"
            placeholder="+7 (123) 456 78 90"
          />
        </el-form-item>
        <el-form-item
          label="Пароль"
          prop="password"
        >
          <el-input
            v-model="form.password"
            placeholder="Пароль"
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
        <div class="text-center" style="padding-bottom: 5px;">
          <el-link
            :underline="false"
            @click="$router.push('/signup')"
          >
            Создать аккаунт
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

@Component({
  auth: 'guest',
  layout: 'auth',
  transition: 'slide-bottom'
})
export default class IndexLogin extends Vue {
  @Ref('form') formRef!: ElForm

  form: LoginForm = {
    phone: '',
    password: ''
  }
  rulesForm = {
    phone: [
      { required: true, message: 'Укажите номер телефона', trigger: 'blur' },
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
    .finally(() => this.loading = false)
  }

  submitForm () {
    this.formRef.validate((valid) => valid && this.login())
  }
}
</script>