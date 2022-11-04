<template>
  <div class="public-header">
    <nuxt-link
      to="/"
      class="public-header__logo"
    >
      <strong>Orch</strong>.store
    
    </nuxt-link>
    <div>
      <nuxt-link v-if="$auth.loggedIn" to="/cart" >
        <el-button>Корзина<span class="el-icon-s-goods"></span></el-button>
      
    </nuxt-link>
    <nuxt-link v-if="$auth.user ? $auth.user.is_admin == true: false" to="/admin/stuff">
      <el-button>Админ-панель</el-button>
    </nuxt-link>
    
      <nuxt-link v-if="$auth.loggedIn != true" to="/login">
        <el-button>Войти</el-button>
      </nuxt-link>
      <el-button v-if="$auth.loggedIn" @click="$auth.logout()">Выйти</el-button>

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Action, Getter } from 'nuxt-property-decorator'

import LoginForm from '~/components/LoginForm.vue'
import { ICartItem } from '~/interfaces/cart'


@Component({
  components: {
    LoginForm,
  }
})
export default class PublicHeader extends Vue {
  @Getter('cart/data') cartItems!: Array<ICartItem>
  @Action('cart/fetchCart') fetchCart: any


  userLoggedIn = this.$auth.loggedIn
  
  
  

  cartDialogVisible = false

  async fetch(){
    
    this.fetchCart().then(()=>{})
    
  }
  changeCartDialogVisible () {
    
    this.cartDialogVisible = !this.cartDialogVisible
  }
}
</script>
<style>
.public-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.public-header__logo {
    font-size: 18px;
    color: #aeb3b9;
    text-decoration: none;
}
.public-header__logo:hover {
    text-decoration: underline;
}
</style>
