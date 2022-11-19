<template>
  
    <el-container
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
                label="Email address"
                prop="email"
              >
                <el-input
                  v-model="form.email"
                  placeholder="email@example.com"
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
        <el-col
          class="auth__col auth__col--image hidden-sm-and-down"
          :xl="12"
        />
      </el-row>
    </el-container>
  
</template>
<script lang="ts">

import { Vue, Action, Getter, Component, Ref } from 'nuxt-property-decorator'
import { ElForm } from 'element-ui/types/form'
import { ILoginForm } from '~/interfaces/users'

@Component({
  
})
export default class LoginForm extends Vue {
    @Ref('form') formRef!: ElForm
    form: ILoginForm = {
      email: '',
      password: ''
    }

    rules = {
      email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Incorrect Email', trigger: 'blur' }
      ],
      password: [{ required: true, message: 'Password is required', trigger: 'blur' }]
    }

    loading = false
    async login () {
      this.loading = true
      try {
        await this.$auth.loginWith('customStrategy', { data: this.form })
      } catch (error) {

      }
      this.loading = false
    }

    onSubmit () {
      this.formRef.validate((valid) => {
        if (valid) {
          this.login()
        }
      })
    }
}

</script>
<style>
</style>
