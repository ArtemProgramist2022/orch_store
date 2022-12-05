<template>
    <!-- <el-container
      direction="vertical"
      class="auth"
    >
      <el-row
        type="flex"
        class="auth__wrapper"
      >
        <el-col
          class="auth__col auth__col--main"
          :xl="12"
          :sm="24"
        >
          <div class="auth__form-wrapper">
            <el-form
              ref="form"
              v-loading="loading"
              :model="form"
              :rules="rules"
              status-icon
              class="auth__form auth-form"
            >
              <h2 class="auth-form__title">
                Login
              </h2>
              <div class="auth-form__description">
                Your account details
              </div>
              <hr class="auth-form__hr">
              <el-form-item
                label="Номер телефона"
                prop="phone"
              >
                <el-input
                  v-model="form.phone"
                  placeholder="+79998882233"
                />
              </el-form-item>
              <el-form-item
                label="Password"
                prop="password"
              >
                <el-input
                  v-model="form.password"
                  type="password"
                  show-password
                  placeholder="Password"
                />
              </el-form-item>
              <el-form-item style="margin-bottom: 10px;">
                <el-button
                  class="auth-form__submit-btn"
                  type="primary"
                  :loading="loading"
                  @click.prevent="onSubmit()"
                >
                  Submit
                </el-button>
              </el-form-item>
              <el-form-item style="margin-bottom: 0;">
                <el-row
                  type="flex"
                  justify="space-between"
                >
                  <el-col
                    class="auth-form__link"
                    :span="12"
                  >
                    <nuxt-link to="/signup">
                      <el-link
                        href="#"
                        :underline="false"
                        @click.prevent
                      >
                        Don't have an account?
                      </el-link>
                    </nuxt-link>
                  </el-col>
                  <el-col
                    class="auth-form__link auth-form__link--right"
                    :span="12"
                  >
                    <nuxt-link to="/recover">
                      <el-link
                        href="#"
                        :underline="false"
                        @click.prevent
                      >
                        Forget Password?
                      </el-link>
                    </nuxt-link>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-container> -->
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
          <el-link :underline="false">Забыли пароль?</el-link>
        </div>
      </el-col>
    </el-col>
  </el-col>
</template>
<script lang="ts">

import { Vue, Component, Ref } from 'nuxt-property-decorator'
import { ElForm } from 'element-ui/types/form'
import { LoginForm } from '~/interfaces/users'

@Component({})
export default class IndexLoginForm extends Vue {
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
