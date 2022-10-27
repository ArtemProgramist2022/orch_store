<template>
    <el-container
      direction="vertical"
      class="auth"
    >
      <nuxt-link to="/">
        <el-button
          type="primary"
          size="mini"
          round
          class="auth__back"
        >
          <i
            class="el-icon-arrow-left"
            style="font-size: 23px;"
          />
        </el-button>
      </nuxt-link>
      <el-row
        type="flex"
        class="auth__wrapper"
      >
        <el-col
          class="auth__col auth__col--main"
          :xl="12"
          :sm="24"
        >
          <div class="auth__form-wrapper auth__form-wrapper--register">
            <el-form
              ref="form"
              v-loading="loading"
              size="small"
              :model="form"
              :rules="rules"
              status-icon
              class="auth__form auth-form"
            >
              <h2 class="auth-form__title">
                Sign Up
              </h2>
              <div class="auth-form__description">
                Your account details
              </div>
              <hr class="auth-form__hr" />
              <el-row :gutter="20">
                <el-col
                  :xs="24"
                  :sm="12"
                >
                  <el-form-item
                    label="Email address"
                    prop="email"
                  >
                    <el-input
                      v-model="form.email"
                      :disabled="showCode"
                      placeholder="email@example.com"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :xs="24"
                  :sm="12"
                >
                  <el-form-item
                    label="Username"
                    prop="username"
                  >
                    <el-input
                      v-model="form.name"
                      :disabled="showCode"
                      placeholder="Username"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-row :gutter="20">
                <el-col
                  :xs="24"
                  :sm="12"
                >
                  <el-form-item
                    label="Password"
                    prop="password"
                  >
                    <el-input
                      v-model="form.password"
                      type="password"
                      show-password
                      :disabled="showCode"
                      placeholder="Password"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :xs="24"
                  :sm="12"
                >
                  <el-form-item
                    label="Confirm password"
                    prop="confirm_password"
                  >
                    <el-input
                      v-model="form.confirm_password"
                      :disabled="showCode"
                      type="password"
                      show-password
                      placeholder="Confirm password"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="showCode">
                <el-col :span="24">
                  <el-form-item label="Confirm code">
                    <el-input
                      v-model.trim="form.code"
                      minlength="6"
                      maxlength="6"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item style="margin-bottom: 10px;">
                <template v-if="showCode">
                  <el-button
                    class="auth-form__submit-btn"
                    type="primary"
                    @click.prevent="confirm"
                  >
                    Confirm
                  </el-button>
                </template>
                <template v-else>
                  <el-button
                    class="auth-form__submit-btn"
                    type="primary"
                    @click.prevent="onSubmit"
                  >
                    Sign Up
                  </el-button>
                </template>
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
                    <nuxt-link to="/login">
                      <el-link
                        href="#"
                        :underline="false"
                        @click.prevent
                      >
                        Sign In
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
  import { ElForm } from 'element-ui/types/form'
  import { Component, Vue, Ref } from 'nuxt-property-decorator'
  import { IRegisterForm } from '~/interfaces/users'
  
  @Component({
    transition: 'slide-bottom',
    auth: 'guest',
    layout: 'authLayout'
  })
  export default class RecoverPage extends Vue {
    @Ref('form') formRef!: ElForm
    form: IRegisterForm = {
      email: '',
      name: '',
      password: '',
      confirm_password: '',
      code: ''
    }
  
    rules = {
      email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Incorrect Email', trigger: 'blur' }
      ],
      name: [{ required: true, message: 'Username is required', trigger: 'blur' }],
      password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
      confirm_password: [
        { required: true, message: 'Confirm password is required', trigger: 'blur' },
        { validator: this.checkConfirmPassword, trigger: ['change', 'blur'] }
      ]
    }
  
    showCode = false
    loading = false
  
    checkConfirmPassword (_: any, value: string, callback: Function) {
      if (value === this.form.password) {
        callback()
      } else {
        callback(new Error("Passwords don't match"))
      }
    }
  
    resetForm () {
      this.form = {
        email: '',
        name: '',
        password: '',
        confirm_password: '',
        code: ''
      }
    }
  
    beforeDestroy () {
      this.resetForm()
    }
  
    confirm () {
      const data = {
        email: this.form.email,
        code: this.form.code
      }
      if (data.email.length && Number(data.code) && data.code.length === 6) {
        this.loading = true
        this.$axios.post('/api/v1/auth/confirm', data).then((response) => {
          this.$message.success('You have been successfully registered')
          if (response.data.data) {
            this.$auth.setUser(response.data.data.me)
            this.$auth.setUserToken(response.data.data.token)
          }
        }).finally(() => {
          this.loading = false
        })
      }
    }
  
    register () {
      this.loading = true
      this.$axios.post('/api/v1/auth/register', this.form).then(() => {
        this.$message.success('The confirmation code has been sent to your email')
        this.showCode = true
      }).finally(() => {
        this.loading = false
      })
    }
  
    onSubmit () {
      this.formRef.validate((valid) => {
        if (valid) {
          this.register()
        }
      })
    }
  }
  </script>
  